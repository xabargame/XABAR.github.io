/*
 * Рендер PDF one-pager XABAR из window.CONTENT (data/content.js — общий с сайтом).
 * Язык — параметром ?lang=ru|en.
 * Незаполненные поля (null) выводятся как [TODO] и собираются в window.__TODOS для scripts/build-pdf.mjs.
 */
(function () {
  'use strict';

  var C = window.CONTENT, S = C.shared;
  var q = new URLSearchParams(location.search).get('lang');
  var lang = q === 'en' ? 'en' : 'ru';
  var T = C[lang];
  window.__TODOS = [];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function val(v, what) {
    if (v == null || v === '') {
      window.__TODOS.push(what);
      return '<span class="todo">[TODO]</span>';
    }
    return esc(v);
  }
  function list(items) {
    return '<ul>' + items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
  }
  function h(title) { return '<h2>' + esc(title) + '</h2>'; }
  function stripUrl(u) { return u.replace(/^https?:\/\//, '').replace(/\/$/, ''); }

  function contactsLine() {
    var c = S.contacts, parts = [];
    parts.push('<a href="' + esc(c.telegram) + '">Telegram ' + esc(c.telegramHandle) + '</a>');
    if (c.email) parts.push('<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a>');
    if (S.site) parts.push('<a href="' + esc(S.site) + '">' + esc(stripUrl(S.site)) + '</a>');
    (S.links || []).forEach(function (l) {
      if (l.url) parts.push('<a href="' + esc(l.url) + '">' + esc(stripUrl(l.url)) + '</a>');
    });
    parts.push(esc(T.onepager.location));
    return parts.map(function (x) { return '<span class="nw">' + x + '</span>'; }).join('<span class="sep">·</span>');
  }

  function renderOnepager() {
    var O = T.onepager, H = O.headings, track = T.founder.track;
    var facts = '<table class="facts">' + O.facts.map(function (f) {
      return '<tr><th>' + esc(f.label) + '</th><td>' + val(f.value, 'onepager.facts: ' + f.label) + '</td></tr>';
    }).join('') + '</table>';
    var ask = list(O.ask) + (O.askAmount !== undefined
      ? '<p class="ask-amount"><b>' + esc(H.amount) + ':</b> ' + val(O.askAmount, 'onepager.askAmount') + '</p>' : '');
    var roles = T.team.roles.map(function (r) { return esc(r.name); }).join(', ');

    return '' +
      '<header class="op-head">' +
        '<p class="eyebrow">' + esc(O.subtitle) + '</p>' +
        '<h1>XABAR</h1>' +
        '<p class="lead">' + esc(O.concept) + '</p>' +
      '</header>' +
      '<div class="op-grid">' +
        '<div class="op-main">' +
          '<section>' + h(H.usp) + list(O.usp) + '</section>' +
          '<section>' + h(H.status) + '<p>' + val(O.status, 'onepager.status') + '</p></section>' +
          '<section>' + h(H.founder) + '<p>' + esc(O.founder) + '</p>' +
            '<p class="muted small">' + esc(T.ui.lookingFor) + ': ' + roles + '.</p></section>' +
          '<section class="ask">' + h(H.ask) + ask + '</section>' +
          '<section>' + h(H.contacts) + '<p>' + contactsLine() + '</p></section>' +
        '</div>' +
        '<aside class="op-side">' +
          '<section>' + h(H.facts) + facts + '</section>' +
          '<section class="track">' + '<p class="eyebrow">' + esc(H.track) + '</p>' +
            '<p class="small">' + esc(O.trackNote) + '</p>' +
            track.metrics.map(function (m) { return '<p><b>' + esc(m.value) + '</b> <span class="muted">' + esc(m.label) + '</span></p>'; }).join('') +
            '<p class="muted small">' + esc(track.note) + '</p>' +
          '</section>' +
        '</aside>' +
      '</div>';
  }

  document.documentElement.lang = lang;
  document.title = T.onepager.title;
  document.getElementById('doc').innerHTML = renderOnepager();

  // ---------- Подгонка под страницы A4 ----------
  // Вызывается из scripts/build-pdf.mjs в print-режиме при ширине области печати; pageH — высота области печати, px.
  // Перелив на вторую страницу до FIT_MAX_OVERFLOW — документ сжимается (zoom не ниже FIT_MIN_ZOOM) в одну страницу.
  // Иначе — две страницы: разрыв перед блоком (раздел), при котором страницы заполнены равномернее всего.
  var FIT_MAX_OVERFLOW = 0.3, FIT_MIN_ZOOM = 0.92;
  window.__fit = function (pageH) {
    var d = document.getElementById('doc');
    function height() { return d.getBoundingClientRect().height; }
    function setZoom(z) { d.style.zoom = z; d.style.width = (100 / z) + '%'; }

    var H = height();
    if (H <= pageH) return { pages: 1, zoom: 1 };
    if ((H - pageH) / pageH <= FIT_MAX_OVERFLOW) {
      for (var i = 1; i <= Math.round((1 - FIT_MIN_ZOOM) * 100); i++) {
        setZoom(1 - i / 100);
        if (height() <= pageH) return { pages: 1, zoom: 1 - i / 100 };
      }
      setZoom(1);
    }

    document.body.classList.add('two-pages');
    H = height();
    if (H > pageH * 2) return { pages: Math.ceil(H / pageH), zoom: 1 };
    var top = d.getBoundingClientRect().top, best = null, bestCost = Infinity;
    d.querySelectorAll('section').forEach(function (el) {
      var prev = el.previousElementSibling;
      if (!prev || prev.tagName === 'H2') return; // не отрываем блок от заголовка раздела
      var y = el.getBoundingClientRect().top - top;
      var cost = Math.max(y, H - y);              // заполненность более полной из двух страниц
      if (cost < bestCost) { bestCost = cost; best = el; }
    });
    if (best) { best.style.breakBefore = 'page'; best.style.marginTop = '0'; }
    return { pages: 2, zoom: 1 };
  };
  window.__READY = true;
})();
