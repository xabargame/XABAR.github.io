/*
 * Единый источник данных для сайта XABAR (index.html) и PDF one-pager (print/onepager.html).
 * Правьте текст только здесь — затем `npm run pdf`, чтобы пересобрать PDF.
 *
 * Правила:
 *  - shared  — то, что не зависит от языка (ссылки, файлы, контакты, медиа).
 *  - ru / en — тексты. Ключи в обоих языках должны совпадать.
 *  - null в полях one-pager = данные ещё не заданы: на сайте поле скрыто,
 *    в PDF выводится заметная метка [TODO], а `npm run pdf` выводит список пропусков.
 *  - url: '' у ссылки = ссылка ещё не задана: на сайте скрыта, появится после заполнения.
 *  - Только подтверждённые факты: сюжет, механики и даты добавлять, когда они объявлены.
 */
window.CONTENT = {
  shared: {
    site: 'https://xabargame.github.io/', // адрес сайта (попадёт в PDF): организация xabargame на GitHub; при покупке домена заменить
    icon: 'assets/img/icons/xabar.webp',
    period: { from: '2026-01' },
    // Сообщество проекта. type — telegram | vk | steam | rustore | googleplay | vkplay | youtube
    links: [
      { type: 'telegram', url: 'https://t.me/habargameofficial' },
      { type: 'vk', url: 'https://vk.ru/habargameofficial' },
      { type: 'steam', url: '' },     // TODO: страница в Steam, когда появится
      { type: 'youtube', url: '' },   // TODO: канал / трейлер
    ],
    contacts: {
      telegram: 'https://t.me/NEON_ner', // руководитель проекта; телефон не публикуется
      telegramHandle: '@NEON_ner',
      email: '',                         // TODO: e-mail проекта (сайт и PDF покажут его автоматически)
    },
    founder: {
      // Сайт независим от личного сайта разработчика: ссылок на него и на резюме не добавлять,
      // основатель везде указан никнеймом Neonner (без ФИО).
      avatar: 'assets/img/icons/avatar.webp',
    },
    files: {
      onepager: { ru: 'pdf/XABAR_OnePager_RU.pdf', en: 'pdf/XABAR_OnePager_EN.pdf' },
    },
    // Скриншоты 16:9, WebP/JPG до ~300 КБ. Первый — фон первого экрана. Новые добавлять сюда — галерея обновится сама.
    shots: [
      'assets/img/shots/01.webp',
      'assets/img/shots/02.webp',
    ],
    video: '', // ссылка на YouTube/VK Видео — блок видео появится автоматически
    // Плашки первого экрана — индексы строк onepager.facts
    heroFacts: [0, 1, 2, 4],
  },

  ru: {
    meta: {
      title: 'XABAR — иммерсивный шутер о постапокалипсисе',
      description: 'XABAR — кроссплатформенный иммерсивный шутер от первого лица в постапокалипсисе: одиночная игра и мультиплеер. ПК (Windows) и Android, Unity 6.',
    },
    ui: {
      nav: { about: 'Об игре', media: 'Медиа', status: 'Разработка', team: 'Команда', partners: 'Партнёрам', community: 'Сообщество' },
      onepager: 'One-pager (PDF)',
      writeTelegram: 'Написать в Telegram',
      themeToggle: 'Сменить тему',
      langToggle: 'Switch to English',
      inDev: 'В разработке',
      present: 'н.в.',
      screenshots: 'Скриншоты',
      video: 'Видео',
      lookingFor: 'Ищу в команду',
      close: 'Закрыть',
      prev: 'Назад',
      next: 'Вперёд',
      linkTypes: { telegram: 'Telegram', vk: 'VK', steam: 'Steam', rustore: 'RuStore', googleplay: 'Google Play', vkplay: 'VK Play', youtube: 'YouTube' },
      footer: 'Сайт обновляется вместе с проектом.',
      months: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    },
    hero: {
      tagline: 'Кроссплатформенный иммерсивный шутер от первого лица в постапокалипсисе — одиночная игра и мультиплеер.',
    },
    about: {
      factsTitle: 'Ключевые данные',
    },
    status: {
      // Хронология: current — текущий этап (закрашенная точка)
      timeline: [
        { period: 'Январь 2026', title: 'Старт разработки', text: 'Сформирована концепция проекта.' },
        { period: 'Сейчас', title: 'Демо-версия', text: 'Активная разработка демо и закрытое тестирование.', current: true },
        { period: 'Релиз', title: 'Дата не объявлена', text: 'Следите за новостями в сообществе.' },
      ],
      numbers: [
        { value: '1', label: 'разработчик' },
        { value: '25', label: 'волонтёров в проекте' },
        { value: '5', label: 'модераторов сообщества' },
        { value: '20', label: 'тестировщиков' },
      ],
    },
    founder: {
      title: 'Основатель',
      name: 'Neonner',
      role: 'Основатель и руководитель проекта: геймдизайн, разработка, SMM, QA',
      bio: 'Unity-разработчик и гейм-дизайнер, 7+ лет в геймдеве. Прежде — разработчик, тимлид отдела QA и администрации SOC_D, мобильного фан-порта S.T.A.L.K.E.R. Победитель геймджемов МТУСИ и «Ctrl + Shift + Create» (2026), предпринимательского тренинга МТУСИ (2025).',
      track: {
        title: 'SOC_D (2022–2025)',
        metrics: [
          { value: '100 000+', label: 'скачиваний' },
          { value: '3 млн+', label: 'просмотров за 9 месяцев' },
          { value: 'ТОП-2', label: 'в категории «Шутеры» RuStore, 2025' },
        ],
        note: 'Независимый некоммерческий фан-проект. Не связан с правообладателем S.T.A.L.K.E.R. и не получал от него поддержки. Работа завершена в октябре 2025 года.',
      },
    },
    team: {
      title: 'Ищу в команду',
      text: 'Ищу людей в команду XABAR. Если хотите делать атмосферный шутер и видеть свой вклад в игре — напишите в Telegram и приложите портфолио.',
      roles: [
        { name: '3D-артист', text: 'Окружение, пропсы, оружие' },
        { name: 'Аудио', text: 'Звуковой дизайн и музыка' },
        { name: 'Озвучка', text: 'Голоса персонажей' },
        { name: 'VFX', text: 'Эффекты, частицы, шейдеры' },
        { name: 'SMM-дизайнер', text: 'Видео и фото для соцсетей' },
        { name: 'PR и маркетинг', text: 'Продвижение, работа с медиа' },
      ],
    },
    partners: {
      title: 'Инвесторам и издателям',
      text: 'Ищу партнёров для продвижения и выпуска XABAR. Подробности — в one-pager.',
    },
    community: {
      title: 'Следите за XABAR',
      text: 'Новости разработки — в Telegram-канале и сообществе VK. По вопросам сотрудничества пишите руководителю проекта в Telegram.',
    },
    // ---------- One-pager (PDF) — блоки также выводятся на сайте ----------
    onepager: {
      title: 'XABAR — one-pager',
      subtitle: 'Для инвесторов и издателей',
      location: 'Москва',
      headings: {
        concept: 'Концепция', usp: 'Чем выделяется', status: 'Статус и планы', founder: 'Основатель', ask: 'Запрос', contacts: 'Контакты', facts: 'Ключевые данные', amount: 'Бюджет / формат сделки', track: 'Прошлый проект основателя',
      },
      concept: 'Иммерсивный шутер от первого лица в постапокалиптическом мире: одиночная кампания и сетевая игра, кроссплатформенный релиз.',
      usp: [
        'Одиночный режим и мультиплеер в одной игре.',
        'Кроссплатформенность: ПК (Windows) и Android на Unity 6.',
        'Опыт основателя в жанре: участие в мобильном фан-порте S.T.A.L.K.E.R. (SOC_D) — 100 000+ скачиваний, ТОП-2 шутеров RuStore (2025).',
      ],
      facts: [
        { label: 'Жанр', value: 'FPS, иммерсивный шутер, постапокалипсис' },
        { label: 'Режимы', value: 'Одиночная игра, мультиплеер' },
        { label: 'Платформы', value: 'ПК (Windows), мобильные (Android)' },
        { label: 'Движок', value: 'Unity 6' },
        { label: 'Стадия', value: 'Разработка демо-версии, закрытые тесты' },
        { label: 'Старт разработки', value: 'Январь 2026' },
        { label: 'Релиз', value: 'Дата не объявлена' },
        { label: 'Команда', value: '1 разработчик + 25 волонтёров (5 модераторов, 20 тестировщиков)' }, // все без оплаты; юрлица нет
      ],
      status: 'Концепция сформирована. Идёт активная разработка демо-версии игры и закрытое тестирование.', // можно дополнить ближайшими вехами с датами
      founder: 'Neonner — основатель XABAR, Unity-разработчик и гейм-дизайнер, 7+ лет в геймдеве. Разработчик и тимлид QA/администрации SOC_D — мобильного фан-порта S.T.A.L.K.E.R. Победитель геймджемов МТУСИ и «Ctrl + Shift + Create» (2026), предпринимательского тренинга МТУСИ (2025).',
      ask: [
        'Маркетинг и рекламная поддержка',
        'Паблишинг: Steam, Google Play, VK Play, RuStore',
      ],
      trackNote: 'SOC_D — некоммерческий мобильный фан-порт S.T.A.L.K.E.R. (2022–2025). Роль: разработчик, тимлид QA и администрации.',
      askAmount: 'Обсуждается индивидуально. Смета на производство и маркетинг — после выхода демо-версии и формирования команды.',
    },
  },

  en: {
    meta: {
      title: 'XABAR — an immersive post-apocalyptic shooter',
      description: 'XABAR is a cross-platform immersive first-person shooter set in a post-apocalyptic world: single-player and multiplayer. PC (Windows) and Android, Unity 6.',
    },
    ui: {
      nav: { about: 'About', media: 'Media', status: 'Development', team: 'Team', partners: 'Partners', community: 'Community' },
      onepager: 'One-pager (PDF)',
      writeTelegram: 'Message on Telegram',
      themeToggle: 'Toggle theme',
      langToggle: 'Переключить на русский',
      inDev: 'In development',
      present: 'present',
      screenshots: 'Screenshots',
      video: 'Video',
      lookingFor: 'Looking for',
      close: 'Close',
      prev: 'Previous',
      next: 'Next',
      linkTypes: { telegram: 'Telegram', vk: 'VK', steam: 'Steam', rustore: 'RuStore', googleplay: 'Google Play', vkplay: 'VK Play', youtube: 'YouTube' },
      footer: 'This site evolves together with the project.',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    hero: {
      tagline: 'A cross-platform immersive first-person shooter set in a post-apocalyptic world — single-player and multiplayer.',
    },
    about: {
      factsTitle: 'Key facts',
    },
    status: {
      timeline: [
        { period: 'January 2026', title: 'Development start', text: 'The project concept is finalized.' },
        { period: 'Now', title: 'Demo', text: 'Active demo development and closed testing.', current: true },
        { period: 'Release', title: 'TBA', text: 'Follow the news in our community.' },
      ],
      numbers: [
        { value: '1', label: 'developer' },
        { value: '25', label: 'volunteers on the project' },
        { value: '5', label: 'community moderators' },
        { value: '20', label: 'testers' },
      ],
    },
    founder: {
      title: 'Founder',
      name: 'Neonner',
      role: 'Founder and project lead: game design, development, SMM, QA',
      bio: 'Unity developer and game designer with 7+ years in game development. Previously a developer and QA/administration lead of SOC_D, a mobile fan port of S.T.A.L.K.E.R. Winner of the MTUCI and “Ctrl + Shift + Create” game jams (2026) and the MTUCI entrepreneurship training (2025).',
      track: {
        title: 'SOC_D (2022–2025)',
        metrics: [
          { value: '100K+', label: 'downloads' },
          { value: '3M+', label: 'views in 9 months' },
          { value: '#2', label: 'in Shooters on RuStore, 2025' },
        ],
        note: 'Independent non-commercial fan project, not affiliated with or endorsed by GSC Game World. Development ended in October 2025.',
      },
    },
    team: {
      title: 'Join the team',
      text: 'I’m looking for people to join XABAR. If you want to build an atmospheric shooter and see your work in the game — message me on Telegram with your portfolio.',
      roles: [
        { name: '3D artist', text: 'Environment, props, weapons' },
        { name: 'Audio', text: 'Sound design and music' },
        { name: 'Voice acting', text: 'Character voices' },
        { name: 'VFX', text: 'Effects, particles, shaders' },
        { name: 'SMM designer', text: 'Video and photo for social media' },
        { name: 'PR & marketing', text: 'Promotion, media relations' },
      ],
    },
    partners: {
      title: 'Investors & publishers',
      text: 'Looking for partners to promote and release XABAR. Details are in the one-pager.',
    },
    community: {
      title: 'Follow XABAR',
      text: 'Development news is posted on our Telegram channel and VK community. For collaboration, message the project lead on Telegram.',
    },
    onepager: {
      title: 'XABAR — one-pager',
      subtitle: 'For investors & publishers',
      location: 'Moscow, Russia',
      headings: {
        concept: 'Concept', usp: 'What sets it apart', status: 'Status & plans', founder: 'Founder', ask: 'The ask', contacts: 'Contacts', facts: 'Key facts', amount: 'Budget / deal format', track: 'Founder’s previous project',
      },
      concept: 'An immersive first-person shooter in a post-apocalyptic world: single-player campaign and online multiplayer, cross-platform release.',
      usp: [
        'Single-player and multiplayer in one game.',
        'Cross-platform: PC (Windows) and Android, built on Unity 6.',
        'Founder’s genre experience: co-developed SOC_D, a mobile fan port of S.T.A.L.K.E.R. — 100K+ downloads, #2 in Shooters on RuStore (2025).',
      ],
      facts: [
        { label: 'Genre', value: 'FPS, immersive shooter, post-apocalypse' },
        { label: 'Modes', value: 'Single-player, multiplayer' },
        { label: 'Platforms', value: 'PC (Windows), mobile (Android)' },
        { label: 'Engine', value: 'Unity 6' },
        { label: 'Stage', value: 'Demo in development, closed testing' },
        { label: 'Development start', value: 'January 2026' },
        { label: 'Release', value: 'TBA' },
        { label: 'Team', value: '1 developer + 25 volunteers (5 moderators, 20 testers)' },
      ],
      status: 'The concept is finalized. The demo is in active development, with closed testing underway.',
      founder: 'Neonner — founder of XABAR, Unity developer and game designer, 7+ years in game development. Developer and QA/administration lead of SOC_D, a mobile fan port of S.T.A.L.K.E.R. Winner of the MTUCI and “Ctrl + Shift + Create” game jams (2026) and the MTUCI entrepreneurship training (2025).',
      ask: [
        'Marketing and advertising support',
        'Publishing: Steam, Google Play, VK Play, RuStore',
      ],
      trackNote: 'SOC_D — a non-commercial mobile fan port of S.T.A.L.K.E.R. (2022–2025). Role: developer, QA and administration lead.',
      askAmount: 'Discussed individually. A production and marketing budget will follow the demo and team formation.',
    },
  },
};
