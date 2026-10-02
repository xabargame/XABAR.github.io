/* Рендер сайта XABAR из window.CONTENT (data/content.js), переключение темы и языка, галерея. */
(function () {
  'use strict';

  var C = window.CONTENT;
  var S = C.shared;
  var root = document.documentElement;
  var LANGS = ['ru', 'en'];

  // ---------- Утилиты ----------
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function get(obj, path) {
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, obj);
  }
  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, val);
    } catch (e) { return null; }
  }
  var ICONS = {
    download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
    send: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 3 3 10.5l7 2.5 2.5 7L21 3zM10 13l4-4"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    ext: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  };

  function sectionHead(title) {
    return '<div class="section__head reveal">' +
      '<h2 class="section__title">' + esc(title) + '</h2></div>';
  }
  function youtubeEmbed(url) {
    var m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? 'https://www.youtube-nocookie.com/embed/' + m[1] : null;
  }
  function extLink(href, label, cls, icon) {
    return '<a class="' + cls + '" href="' + esc(href) + '" target="_blank" rel="noopener">' + (icon || '') + esc(label) + '</a>';
  }
  // Ссылки сообщества без адреса не показываем — появятся, как только url будет заполнен.
  function readyLinks() {
    return (S.links || []).filter(function (l) { return l.url; });
  }

  // ---------- Язык ----------
  function detectLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (LANGS.indexOf(q) >= 0) return q;
    var saved = store('lang');
    if (LANGS.indexOf(saved) >= 0) return saved;
    return (navigator.language || 'ru').toLowerCase().indexOf('ru') === 0 ? 'ru' : 'en';
  }
  var lang = detectLang();

  // ---------- Секции ----------
  function renderHero(T) {
    var O = T.onepager;
    var links = readyLinks().map(function (l, i) {
      return extLink(l.url, T.ui.linkTypes[l.type] || l.type, i === 0 ? 'btn btn--primary' : 'btn', i === 0 ? ICONS.send : '');
    }).join('');
    var facts = (S.heroFacts || []).map(function (i) { return O.facts[i]; }).filter(function (f) { return f && f.value; });
    var bg = S.shots && S.shots[0] ? '<div class="hero__bg" style="background-image:url(\'' + esc(S.shots[0]) + '\')" aria-hidden="true"></div>' : '';
    return bg +
      '<div class="wrap hero__inner">' +
        '<div class="hero__content">' +
          '<a class="chip chip--accent chip--live hero__status reveal" href="#status"><span class="chip__dot"></span>' + esc(T.ui.inDev) + '</a>' +
          '<h1 class="hero__name reveal">' + (S.icon ? '<img class="hero__icon" src="' + esc(S.icon) + '" alt="" width="96" height="96">' : '') + 'XABAR</h1>' +
          '<p class="hero__tagline reveal">' + esc(T.hero.tagline) + '</p>' +
          '<div class="hero__actions reveal">' + links +
            extLink(S.files.onepager[lang], T.ui.onepager, 'btn', ICONS.download) +
          '</div>' +
        '</div>' +
        '<dl class="stats reveal">' + facts.map(function (f) {
          return '<div class="stat"><dt class="stat__label">' + esc(f.label) + '</dt><dd class="stat__value">' + esc(f.value) + '</dd></div>';
        }).join('') + '</dl>' +
      '</div>';
  }

  function renderAbout(T) {
    var O = T.onepager;
    var usp = O.usp.map(function (u, i) {
      return '<li class="feature"><span class="feature__num mono">' + (i < 9 ? '0' : '') + (i + 1) + '</span><p>' + esc(u) + '</p></li>';
    }).join('');
    var facts = O.facts.filter(function (f) { return f.value; }).map(function (f) {
      return '<div class="fact"><dt>' + esc(f.label) + '</dt><dd>' + esc(f.value) + '</dd></div>';
    }).join('');
    return sectionHead(T.ui.nav.about) +
      '<div class="about">' +
        '<div class="card reveal">' +
          '<p class="about__lead">' + esc(O.concept) + '</p>' +
          '<h3 class="kicker">' + esc(O.headings.usp) + '</h3>' +
          '<ul class="features">' + usp + '</ul>' +
        '</div>' +
        '<div class="card side reveal"><h3>' + esc(T.about.factsTitle) + '</h3><dl class="facts">' + facts + '</dl></div>' +
      '</div>';
  }

  function renderMedia(T) {
    var html = '';
    if (S.video) {
      var embed = youtubeEmbed(S.video);
      html += embed
        ? '<div class="video reveal"><iframe src="' + esc(embed) + '" title="XABAR — ' + esc(T.ui.video) + '" loading="lazy" allowfullscreen></iframe></div>'
        : '<p class="reveal">' + extLink(S.video, T.ui.video, 'btn', ICONS.ext) + '</p>';
    }
    if (S.shots && S.shots.length) {
      var btn = function (src, i, cls) {
        return '<button class="' + cls + '" type="button" data-gallery="shots" data-index="' + i + '" ' +
          'aria-label="' + esc('XABAR — ' + T.ui.screenshots + ' ' + (i + 1)) + '">' +
          '<img src="' + esc(src) + '" alt="" loading="lazy" decoding="async"></button>';
      };
      html += '<div class="gallery reveal">' + btn(S.shots[0], 0, 'gallery__main') +
        (S.shots.length > 1
          ? '<div class="gallery__thumbs">' + S.shots.slice(1, 5).map(function (s, i) { return btn(s, i + 1, 'gallery__thumb'); }).join('') + '</div>'
          : '') +
        '</div>';
    }
    return html ? sectionHead(T.ui.nav.media) + '<div class="media">' + html + '</div>' : '';
  }

  function renderStatus(T) {
    var St = T.status;
    var tl = St.timeline.map(function (e) {
      return '<div class="tl' + (e.current ? ' tl--current' : '') + '"><div class="tl__period mono">' + esc(e.period) + '</div>' +
        '<div class="tl__title">' + esc(e.title) + '</div><p class="tl__text">' + esc(e.text) + '</p></div>';
    }).join('');
    var nums = St.numbers.map(function (n) {
      return '<div class="stat"><div class="stat__num">' + esc(n.value) + '</div><div class="stat__label">' + esc(n.label) + '</div></div>';
    }).join('');
    return sectionHead(T.ui.nav.status) +
      '<div class="path">' +
        '<div class="card timeline reveal">' + tl + '</div>' +
        '<p class="status__text reveal">' + esc(T.onepager.status) + '</p>' +
        '<div class="stats stats--numbers reveal">' + nums + '</div>' +
      '</div>';
  }

  function renderTeam(T) {
    var F = T.founder, SF = S.founder, team = T.team;
    var metrics = F.track.metrics.map(function (m) {
      return '<div class="metric"><div class="metric__value">' + esc(m.value) + '</div><div class="metric__label">' + esc(m.label) + '</div></div>';
    }).join('');
    return sectionHead(T.ui.nav.team) +
      '<div class="collab">' +
        '<div class="card founder reveal">' +
          '<p class="kicker">' + esc(F.title) + '</p>' +
          '<div class="founder__head">' +
            (SF.avatar ? '<img class="founder__avatar" src="' + esc(SF.avatar) + '" alt="" width="72" height="72">' : '') +
            '<div><h3>' + esc(F.name) + '</h3><p class="founder__role">' + esc(F.role) + '</p></div>' +
          '</div>' +
          '<p class="collab__text">' + esc(F.bio) + '</p>' +
          '<p class="founder__track mono muted">' + esc(F.track.title) + '</p>' +
          '<div class="metrics">' + metrics + '</div>' +
          '<p class="project__note">' + esc(F.track.note) + '</p>' +
        '</div>' +
        '<div class="card reveal"><h3>' + esc(team.title) + '</h3><p class="collab__text">' + esc(team.text) + '</p>' +
          '<div class="roles" aria-label="' + esc(T.ui.lookingFor) + '">' + team.roles.map(function (r) {
            return '<div class="role"><b>' + esc(r.name) + '</b><span>' + esc(r.text) + '</span></div>';
          }).join('') + '</div>' +
          extLink(S.contacts.telegram, T.ui.writeTelegram, 'btn btn--primary', ICONS.send) +
        '</div>' +
      '</div>';
  }

  function renderPartners(T) {
    var P = T.partners, O = T.onepager;
    return sectionHead(T.ui.nav.partners) +
      '<div class="card partners reveal">' +
        '<div><h3>' + esc(P.title) + '</h3><p class="collab__text">' + esc(P.text) + '</p>' +
          '<ul class="asks">' + O.ask.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul></div>' +
        '<div class="partners__side">' +
          (O.askAmount ? '<p class="kicker">' + esc(O.headings.amount) + '</p><p class="collab__text">' + esc(O.askAmount) + '</p>' : '') +
          '<div class="partners__actions">' +
            extLink(S.files.onepager[lang], T.ui.onepager, 'btn btn--primary', ICONS.download) +
            extLink(S.contacts.telegram, S.contacts.telegramHandle, 'btn', ICONS.send) +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderCommunity(T) {
    var Cm = T.community;
    var links = readyLinks().map(function (l, i) {
      return extLink(l.url, T.ui.linkTypes[l.type] || l.type, i === 0 ? 'btn btn--primary' : 'btn', i === 0 ? ICONS.send : ICONS.ext);
    }).join('');
    var email = S.contacts.email
      ? '<a class="btn" href="mailto:' + esc(S.contacts.email) + '">' + ICONS.mail + esc(S.contacts.email) + '</a>'
      : '';
    return '<div class="card contact reveal">' +
      '<h2 class="contact__title">' + esc(Cm.title) + '</h2>' +
      '<p class="contact__text">' + esc(Cm.text) + '</p>' +
      '<div class="contact__actions">' + links +
        extLink(S.contacts.telegram, S.contacts.telegramHandle, 'btn', ICONS.send) + email +
      '</div></div>';
  }

  function renderFooter(T) {
    return '<span>© ' + new Date().getFullYear() + ' XABAR · ' + esc(T.founder.name) + '</span>' +
      '<span>' + esc(T.ui.footer) + '</span>';
  }

  // ---------- Сборка ----------
  function render() {
    var T = C[lang];
    root.lang = lang;
    document.title = T.meta.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', T.meta.description);

    document.querySelectorAll('[data-bind]').forEach(function (el) {
      el.textContent = get(T, el.getAttribute('data-bind'));
    });
    document.getElementById('top').innerHTML = renderHero(T);
    document.getElementById('about').innerHTML = renderAbout(T);
    document.getElementById('media').innerHTML = renderMedia(T);
    document.getElementById('status').innerHTML = renderStatus(T);
    document.getElementById('team').innerHTML = renderTeam(T);
    document.getElementById('partners').innerHTML = renderPartners(T);
    document.getElementById('community').innerHTML = renderCommunity(T);
    document.getElementById('footer').innerHTML = renderFooter(T);

    var langBtn = document.getElementById('langBtn');
    langBtn.textContent = lang === 'ru' ? 'EN' : 'RU';
    langBtn.setAttribute('aria-label', T.ui.langToggle);
    langBtn.title = T.ui.langToggle;
    var themeBtn = document.getElementById('themeBtn');
    themeBtn.setAttribute('aria-label', T.ui.themeToggle);
    themeBtn.title = T.ui.themeToggle;
    document.querySelectorAll('.lightbox__close, .lightbox__prev, .lightbox__next').forEach(function (b) {
      b.setAttribute('aria-label', T.ui[b.getAttribute('data-lb')]);
    });

    observeReveal();
  }

  // ---------- Тема (по умолчанию тёмная) ----------
  function currentTheme() {
    return root.getAttribute('data-theme') || 'dark';
  }
  document.getElementById('themeBtn').addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store('theme', next);
  });

  document.getElementById('langBtn').addEventListener('click', function () {
    lang = lang === 'ru' ? 'en' : 'ru';
    store('lang', lang);
    var url = new URL(location.href);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url);
    render();
  });

  // ---------- Появление при скролле ----------
  var revealObs = 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); revealObs.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px' })
    : null;
  function observeReveal() {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
      if (revealObs) revealObs.observe(el); else el.classList.add('is-visible');
    });
  }

  // ---------- Подсветка пункта меню ----------
  var navLinks = document.querySelectorAll('.nav a');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main > section[id]').forEach(function (s) { spy.observe(s); });
  }
  var topbar = document.querySelector('.topbar');
  window.addEventListener('scroll', function () {
    topbar.classList.toggle('is-scrolled', window.scrollY > 8);
  }, { passive: true });

  // ---------- Lightbox ----------
  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('.lightbox__img');
  var lbCount = lb.querySelector('.lightbox__count');
  var lbShots = [], lbIndex = 0;
  function lbShow(i) {
    lbIndex = (i + lbShots.length) % lbShots.length;
    lbImg.src = lbShots[lbIndex];
    lbCount.textContent = (lbIndex + 1) + ' / ' + lbShots.length;
    var multi = lbShots.length > 1;
    lb.querySelector('.lightbox__prev').hidden = !multi;
    lb.querySelector('.lightbox__next').hidden = !multi;
  }
  document.addEventListener('click', function (e) {
    var g = e.target.closest('[data-gallery]');
    if (g) {
      lbShots = S.shots;
      lbShow(parseInt(g.getAttribute('data-index'), 10));
      if (lb.showModal) lb.showModal(); else lb.setAttribute('open', '');
      return;
    }
    var act = e.target.closest('[data-lb]');
    if (act) {
      var a = act.getAttribute('data-lb');
      if (a === 'close') lb.close();
      if (a === 'prev') lbShow(lbIndex - 1);
      if (a === 'next') lbShow(lbIndex + 1);
      return;
    }
    if (e.target === lb) lb.close();
  });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') lbShow(lbIndex - 1);
    if (e.key === 'ArrowRight') lbShow(lbIndex + 1);
  });

  render();
})();
