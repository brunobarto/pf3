(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;

  /* ================= STATE ================= */
  let lang = localStorage.getItem('lang') || (navigator.language.startsWith('fr') ? 'fr' : 'en');
  let theme = localStorage.getItem('theme') ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  let accent = localStorage.getItem('accent') || '#00a8e8';
  let loaded = false;

  const t = o => (o && typeof o === 'object' && 'en' in o) ? o[lang] : o;
  const S = k => STR[lang][k] ?? k;

  /* ================= TEXT ================= */
  const STR = {
    en: {
      loading: 'Loading data', typed: 'Hello, I am Bruno',
      'nav.exp': 'Experience', 'nav.value': 'Value', 'nav.skills': 'Skills', 'nav.projects': 'Projects', 'nav.contact': 'Contact',
      'hero.eyebrow': 'Data & AI Analyst · Sales Operations',
      'hero.lead': 'I turn raw data into decisions that grow revenue, from machine learning models to the sales floor.',
      'hero.cta1': 'View projects', 'hero.cta2': 'Get in touch',
      'exp.kicker': '01 — Career', 'exp.title': 'Experience', 'exp.hint': 'Click a role to see responsibilities.',
      'value.kicker': '02 — Impact', 'value.title': 'What I bring',
      'edu.kicker': '03 — Education', 'edu.title': 'Education', 'edu.tag': "Master's degree",
      'edu.degree': 'Commerce, Finance & Business Analytics', 'edu.school': 'ISTEC Business School — Paris',
      'skills.kicker': '04 — Toolkit', 'skills.title': 'Technical skills', 'skills.hint': 'Click an element to learn more.',
      'soft.kicker': '05 — People', 'soft.title': 'Soft skills', 'soft.hint': 'Click a point or a label.',
      'proj.kicker': '06 — Work', 'proj.title': 'Selected projects', 'proj.live': 'Live site ↗', 'proj.code': 'Code',
      'contact.title': "Let's work together", 'contact.text': 'Open to Data, BI and Sales Operations roles in France and Europe.',
      details: 'View responsibilities →', level: 'Level',
      'cat.lang': 'Languages', 'cat.viz': 'BI & Visualization', 'cat.ml': 'ML / AI', 'cat.data': 'Data engineering'
    },
    fr: {
      loading: 'Chargement des données', typed: 'Bonjour, je suis Bruno',
      'nav.exp': 'Expérience', 'nav.value': 'Valeur', 'nav.skills': 'Compétences', 'nav.projects': 'Projets', 'nav.contact': 'Contact',
      'hero.eyebrow': 'Data & IA Analyst · Opérations Commerciales',
      'hero.lead': "Je transforme la donnée brute en décisions qui font croître le chiffre d'affaires, du modèle de machine learning jusqu'au terrain.",
      'hero.cta1': 'Voir les projets', 'hero.cta2': 'Me contacter',
      'exp.kicker': '01 — Parcours', 'exp.title': 'Expérience', 'exp.hint': 'Cliquez sur un poste pour voir les responsabilités.',
      'value.kicker': '02 — Impact', 'value.title': "Ce que j'apporte",
      'edu.kicker': '03 — Formation', 'edu.title': 'Formation', 'edu.tag': 'Master',
      'edu.degree': 'Commerce, Finance & Business Analytics', 'edu.school': 'ISTEC Business School — Paris',
      'skills.kicker': '04 — Outils', 'skills.title': 'Compétences techniques', 'skills.hint': 'Cliquez sur un élément pour en savoir plus.',
      'soft.kicker': '05 — Humain', 'soft.title': 'Soft skills', 'soft.hint': 'Cliquez sur un point ou un libellé.',
      'proj.kicker': '06 — Réalisations', 'proj.title': 'Projets sélectionnés', 'proj.live': 'Site en ligne ↗', 'proj.code': 'Code',
      'contact.title': 'Travaillons ensemble', 'contact.text': 'Ouvert aux postes Data, BI et Sales Ops en France et en Europe.',
      details: 'Voir les responsabilités →', level: 'Niveau',
      'cat.lang': 'Langages', 'cat.viz': 'BI & Visualisation', 'cat.ml': 'ML / IA', 'cat.data': 'Data engineering'
    }
  };

  /* ================= DATA ================= */
  const EXP = [
    {
      date: '2025 — 2026', company: 'Gallia Records Store', place: 'Marseille, FR',
      role: { en: 'Sales Operations Manager', fr: 'Responsable des Opérations Commerciales' },
      tasks: {
        en: ['Own sales reporting and KPI dashboards: revenue, margin, sell-through.',
             'Drive inventory and purchasing decisions with demand data.',
             'Analyze pricing and promotions to protect and grow margin.',
             'Align suppliers, team and management around monthly targets.'],
        fr: ['Pilotage du reporting commercial et des KPI : CA, marge, taux d\'écoulement.',
             'Décisions de stock et d\'achats fondées sur la demande.',
             'Analyse des prix et promotions pour protéger et augmenter la marge.',
             'Alignement fournisseurs, équipe et direction sur les objectifs mensuels.']
      }
    },
    {
      date: '2022 — 2025', company: 'Accenture', place: 'Kraków, PL',
      role: { en: 'ML / AI Data Analyst', fr: 'Data Analyst ML / IA' },
      tasks: {
        en: ['Built and validated ML models (classification, forecasting) for client use cases.',
             'Designed data pipelines and feature engineering in Python and SQL.',
             'Delivered Power BI dashboards translating model output into business actions.',
             'Presented insights to client stakeholders and product teams.'],
        fr: ['Conception et validation de modèles ML (classification, prévision) pour des clients.',
             'Création de pipelines de données et feature engineering en Python et SQL.',
             'Dashboards Power BI traduisant les résultats des modèles en actions métier.',
             'Restitution des insights aux parties prenantes client et aux équipes produit.']
      }
    },
    {
      date: '2021', company: 'Cognizant', place: 'Kraków, PL',
      role: { en: 'Payment System Integration Analyst — Transaction Processing', fr: 'Analyste Intégration Systèmes de Paiement — Traitement des transactions' },
      tasks: {
        en: ['Integrated and tested payment flows between banking systems and merchants.',
             'Monitored transaction processing and investigated failed or rejected payments.',
             'Wrote SQL checks for reconciliation and data quality.',
             'Documented incidents and coordinated fixes with technical teams.'],
        fr: ['Intégration et tests des flux de paiement entre systèmes bancaires et marchands.',
             'Suivi du traitement des transactions et analyse des paiements rejetés.',
             'Requêtes SQL de rapprochement et de contrôle qualité des données.',
             'Documentation des incidents et coordination des correctifs avec les équipes techniques.']
      }
    },
    {
      date: '2019 — 2020', company: 'Teleperformance', place: 'Lisboa, PT',
      role: { en: 'Business Account & Technical Support', fr: 'Support Technique & Comptes Business' },
      tasks: {
        en: ['Supported business accounts on technical and billing issues.',
             'Diagnosed and resolved incidents within SLA targets.',
             'Escalated complex cases with clear, structured reporting.',
             'Kept customer satisfaction high in a multilingual environment.'],
        fr: ['Accompagnement des comptes professionnels sur les sujets techniques et de facturation.',
             'Diagnostic et résolution des incidents dans le respect des SLA.',
             'Escalade des cas complexes avec un reporting clair et structuré.',
             'Satisfaction client élevée dans un environnement multilingue.']
      }
    }
  ];

  const VALUES = [
    { ico: '📈', t: { en: 'Financial performance', fr: 'Performance financière' },
      d: { en: 'Margin, revenue and cost analysis that turns into measurable results.', fr: 'Analyse de marge, CA et coûts traduite en résultats mesurables.' } },
    { ico: '🧠', t: { en: 'Data-driven decisions', fr: 'Décisions pilotées par la donnée' },
      d: { en: 'From raw data to forecasts and ML models that guide strategy.', fr: 'De la donnée brute aux prévisions et modèles ML qui orientent la stratégie.' } },
    { ico: '🤝', t: { en: 'Stakeholder communication', fr: 'Communication avec les parties prenantes' },
      d: { en: 'Clear stories for executives, sales teams and tech, in FR, EN and more.', fr: 'Des messages clairs pour la direction, les ventes et la tech, en FR, EN et plus.' } },
    { ico: '⚙️', t: { en: 'Automation & AI', fr: 'Automatisation & IA' },
      d: { en: 'Automated reporting and pipelines that save hours every week.', fr: 'Reporting et pipelines automatisés qui font gagner des heures chaque semaine.' } }
  ];

  const CATS = { lang: '#00a8e8', viz: '#2ecc71', ml: '#8e5cff', data: '#ff7a45' };
  const SKILLS = [
    { s: 'Py', n: 'Python', c: 'lang', d: { en: 'Main language for analysis, automation and ML: pandas, NumPy, scripting.', fr: 'Langage principal pour l\'analyse, l\'automatisation et le ML : pandas, NumPy, scripts.' } },
    { s: 'Sq', n: 'SQL', c: 'lang', d: { en: 'Complex queries, window functions, CTEs, reconciliation and data quality checks.', fr: 'Requêtes complexes, fonctions de fenêtrage, CTE, rapprochements et contrôles qualité.' } },
    { s: 'R', n: 'R', c: 'lang', d: { en: 'Statistical analysis and quick exploratory work.', fr: 'Analyse statistique et exploration rapide.' } },
    { s: 'Pb', n: 'Power BI', c: 'viz', d: { en: 'Interactive dashboards, DAX measures and data models for business users.', fr: 'Dashboards interactifs, mesures DAX et modèles de données pour les métiers.' } },
    { s: 'Tb', n: 'Tableau', c: 'viz', d: { en: 'Visual storytelling and executive reporting.', fr: 'Data storytelling et reporting pour la direction.' } },
    { s: 'Xl', n: 'Excel', c: 'viz', d: { en: 'Advanced modeling: Power Query, pivot tables, financial analysis.', fr: 'Modélisation avancée : Power Query, tableaux croisés, analyse financière.' } },
    { s: 'Sk', n: 'scikit-learn', c: 'ml', d: { en: 'Classification, regression, clustering, model evaluation and tuning.', fr: 'Classification, régression, clustering, évaluation et optimisation de modèles.' } },
    { s: 'Ts', n: 'Time Series', c: 'ml', d: { en: 'Sales and demand forecasting to plan stock and targets.', fr: 'Prévision des ventes et de la demande pour planifier stocks et objectifs.' } },
    { s: 'St', n: 'Statistics', c: 'ml', d: { en: 'Hypothesis testing, A/B tests, regression to back decisions with evidence.', fr: 'Tests d\'hypothèses, A/B tests et régression pour étayer les décisions.' } },
    { s: 'Et', n: 'ETL', c: 'data', d: { en: 'Extract, clean and load data from many sources into reliable tables.', fr: 'Extraction, nettoyage et chargement de sources multiples dans des tables fiables.' } },
    { s: 'Cl', n: 'Cloud (Azure)', c: 'data', d: { en: 'Cloud data storage and processing for analytics workloads.', fr: 'Stockage et traitement cloud des données analytiques.' } },
    { s: 'Gt', n: 'Git', c: 'data', d: { en: 'Version control and collaboration on analytics code.', fr: 'Gestion de versions et collaboration sur le code analytique.' } }
  ];

  const SOFT = [
    { n: { en: 'Communication', fr: 'Communication' }, v: 92, d: { en: 'Explains complex data simply to any audience.', fr: 'Explique simplement des données complexes à tout public.' } },
    { n: { en: 'Stakeholder mgmt', fr: 'Gestion des parties prenantes' }, v: 88, d: { en: 'Aligns management, clients and tech teams on shared goals.', fr: 'Aligne direction, clients et équipes techniques sur des objectifs communs.' } },
    { n: { en: 'Problem solving', fr: 'Résolution de problèmes' }, v: 90, d: { en: 'Breaks problems down and finds the root cause quickly.', fr: 'Décompose les problèmes et identifie rapidement la cause racine.' } },
    { n: { en: 'Adaptability', fr: 'Adaptabilité' }, v: 94, d: { en: 'Worked across 3 countries, industries and team cultures.', fr: 'Expérience dans 3 pays, plusieurs secteurs et cultures d\'équipe.' } },
    { n: { en: 'Leadership', fr: 'Leadership' }, v: 80, d: { en: 'Leads operations and motivates teams toward targets.', fr: 'Pilote les opérations et motive les équipes vers les objectifs.' } },
    { n: { en: 'Business acumen', fr: 'Sens business' }, v: 86, d: { en: 'Connects every analysis to revenue, cost or risk.', fr: 'Relie chaque analyse au CA, aux coûts ou au risque.' } }
  ];

  const ILL = {
    dash: `<svg viewBox="0 0 200 120"><rect x="4" y="4" width="192" height="112" rx="10" fill="rgba(255,255,255,.55)" stroke="var(--accent)" stroke-width="2"/>
      ${[30, 55, 40, 75, 60, 90].map((h, i) => `<rect x="${18 + i * 18}" y="${100 - h}" width="12" height="${h}" rx="3" fill="var(--accent)" opacity="${.5 + i * .08}"/>`).join('')}
      <circle cx="160" cy="60" r="24" fill="none" stroke="var(--accent)" stroke-opacity=".25" stroke-width="10"/>
      <circle cx="160" cy="60" r="24" fill="none" stroke="var(--accent)" stroke-width="10" stroke-dasharray="105 151" transform="rotate(-90 160 60)"/></svg>`,
    churn: `<svg viewBox="0 0 200 120"><rect x="4" y="4" width="192" height="112" rx="10" fill="rgba(255,255,255,.55)" stroke="var(--accent)" stroke-width="2"/>
      ${Array.from({ length: 22 }, (_, i) => { const x = 20 + (i * 37) % 160, y = 18 + (i * 53) % 86; const a = y < 110 - x * .5; return `<circle cx="${x}" cy="${y}" r="4" fill="${a ? 'var(--accent)' : '#ff7a45'}"/>`; }).join('')}
      <path d="M10 108 Q100 70 190 10" fill="none" stroke="var(--text)" stroke-width="2" stroke-dasharray="5 4"/></svg>`,
    pay: `<svg viewBox="0 0 200 120"><rect x="14" y="26" width="80" height="52" rx="8" fill="var(--accent)"/>
      <rect x="24" y="40" width="16" height="12" rx="2" fill="#ffd23f"/><rect x="24" y="62" width="50" height="5" rx="2" fill="#fff" opacity=".8"/>
      <path d="M100 52 H130" stroke="var(--accent)" stroke-width="3" stroke-dasharray="6 4"/>
      <circle cx="150" cy="30" r="12" fill="#2ecc71"/><path d="M144 30 l4 4 l8 -8" stroke="#fff" stroke-width="3" fill="none"/>
      <circle cx="150" cy="80" r="12" fill="#ff5f57"/><path d="M145 75 l10 10 M155 75 l-10 10" stroke="#fff" stroke-width="3"/>
      <path d="M130 52 L140 36 M130 52 L140 72" stroke="var(--accent)" stroke-width="3"/></svg>`
  };

  // Replace YOUR-USERNAME with your GitHub username
  const PROJECTS = [
    { ill: 'dash', live: '[your-username.github.io](https://YOUR-USERNAME.github.io/sales-dashboard)', code: '[github.com](https://github.com/YOUR-USERNAME/sales-dashboard)',
      t: { en: 'Retail Sales Dashboard', fr: 'Dashboard des ventes retail' },
      d: { en: 'Interactive KPI dashboard: revenue, margin and best-sellers by category.', fr: 'Dashboard KPI interactif : CA, marge et meilleures ventes par catégorie.' },
      tags: ['Power BI', 'SQL', 'DAX'] },
    { ill: 'churn', live: '[your-username.github.io](https://YOUR-USERNAME.github.io/churn-prediction)', code: '[github.com](https://github.com/YOUR-USERNAME/churn-prediction)',
      t: { en: 'Customer Churn Prediction', fr: 'Prédiction du churn client' },
      d: { en: 'ML model that flags at-risk customers, with an explainable scoring app.', fr: 'Modèle ML qui détecte les clients à risque, avec une app de scoring explicable.' },
      tags: ['Python', 'scikit-learn', 'Streamlit'] },
    { ill: 'pay', live: '[your-username.github.io](https://YOUR-USERNAME.github.io/payment-monitor)', code: '[github.com](https://github.com/YOUR-USERNAME/payment-monitor)',
      t: { en: 'Payment Transactions Monitor', fr: 'Monitoring des transactions' },
      d: { en: 'Tracks approval and failure rates and detects anomalies in payment flows.', fr: 'Suivi des taux d\'acceptation et d\'échec, détection d\'anomalies dans les flux de paiement.' },
      tags: ['SQL', 'Python', 'Anomaly detection'] }
  ];

  /* ================= RENDER ================= */
  function renderStatic() {
    $$('[data-i18n]').forEach(el => el.textContent = S(el.dataset.i18n));
    root.lang = lang;
    $('#langBtn').textContent = lang === 'en' ? 'FR' : 'EN';
  }

  function renderExp() {
    $('#timeline').innerHTML = '<div class="tl-line"><span></span></div>' + EXP.map((e, i) => `
      <article class="tl-item reveal ${i % 2 ? 'right' : 'left'}">
        <span class="tl-dot"></span>
        <button class="tl-card glass" data-type="exp" data-i="${i}">
          <span class="tl-date">${e.date}</span>
          <h3>${t(e.role)}</h3>
          <p>${e.company} · ${e.place}</p>
          <span class="tl-more">${S('details')}</span>
        </button>
      </article>`).join('');
  }

  function renderValues() {
    $('#values').innerHTML = VALUES.map((v, i) => `
      <div class="value glass reveal" style="transition-delay:${i * 100}ms">
        <div class="v-ico">${v.ico}</div><h3>${t(v.t)}</h3><p>${t(v.d)}</p>
      </div>`).join('');
  }

  function renderSkills() {
    $('#periodic').innerHTML = SKILLS.map((s, i) => `
      <button class="el glass" style="--i:${i};--cat:${CATS[s.c]}" data-type="skill" data-i="${i}">
        <small>${String(i + 1).padStart(2, '0')}</small><b>${s.s}</b><span>${s.n}</span>
      </button>`).join('');
    $('#legend').innerHTML = Object.entries(CATS)
      .map(([k, c]) => `<span><i style="background:${c}"></i>${S('cat.' + k)}</span>`).join('');
  }

  function renderSoft() {
    const N = SOFT.length, cx = 200, cy = 200, R = 140;
    const pt = (i, r) => { const a = -Math.PI / 2 + i * 2 * Math.PI / N; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
    let g = '';
    for (let l = 1; l <= 4; l++) g += `<polygon class="grid" points="${SOFT.map((_, i) => pt(i, R * l / 4).join(',')).join(' ')}"/>`;
    SOFT.forEach((_, i) => { const [x, y] = pt(i, R); g += `<line class="axis" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`; });
    const poly = SOFT.map((s, i) => pt(i, R * s.v / 100).join(',')).join(' ');
    const dots = SOFT.map((s, i) => { const [x, y] = pt(i, R * s.v / 100); return `<circle class="sdot" data-type="soft" data-i="${i}" cx="${x}" cy="${y}" r="7"/>`; }).join('');
    const labels = SOFT.map((s, i) => {
      const [x, y] = pt(i, R + 26);
      const anchor = Math.abs(x - cx) < 5 ? 'middle' : (x > cx ? 'start' : 'end');
      return `<text class="slabel" data-type="soft" data-i="${i}" x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="middle">${t(s.n)}</text>`;
    }).join('');
    $('#radar').innerHTML = `<svg viewBox="-130 -10 660 420">${g}<g class="shape"><polygon class="area" points="${poly}"/>${dots}</g>${labels}</svg>`;
  }

  function renderProjects() {
    $('#projectGrid').innerHTML = PROJECTS.map((p, i) => `
      <article class="project glass reveal" style="transition-delay:${i * 120}ms">
        <div class="ill">${ILL[p.ill]}</div>
        <div class="p-body">
          <h3>${t(p.t)}</h3><p>${t(p.d)}</p>
          <div class="tags">${p.tags.map(x => `<span>${x}</span>`).join('')}</div>
          <div class="p-links">
            <a class="btn primary" href="${p.live}" target="_blank" rel="noopener">${S('proj.live')}</a>
            <a class="btn glass" href="${p.code}" target="_blank" rel="noopener">${S('proj.code')}</a>
          </div>
        </div>
      </article>`).join('');
  }

  function renderAll() {
    renderStatic(); renderExp(); renderValues(); renderSkills(); renderSoft(); renderProjects();
    observeReveal();
    if (loaded) typeText(S('typed'));
  }

  /* ================= MODAL ================= */
  const modal = $('#modal');
  function openModal(title, html) {
    $('#modalTitle').textContent = title;
    $('#modalBody').innerHTML = html;
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
  }
  function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }
  $('#modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-type]');
    if (!el) return;
    const i = +el.dataset.i;
    if (el.dataset.type === 'exp') {
      const x = EXP[i];
      openModal(x.company, `<h4>${t(x.role)}</h4><p class="meta">${x.date} · ${x.place}</p>
        <ul>${t(x.tasks).map(li => `<li>${li}</li>`).join('')}</ul>`);
    } else if (el.dataset.type === 'skill') {
      const s = SKILLS[i];
      openModal(s.n, `<div class="modal-sym" style="color:${CATS[s.c]}">${s.s}</div>
        <h4>${s.n}</h4><p class="meta">${S('cat.' + s.c)}</p><p>${t(s.d)}</p>`);
    } else if (el.dataset.type === 'soft') {
      const s = SOFT[i];
      openModal(t(s.n), `<h4>${t(s.n)}</h4><p class="meta">${S('level')} ${s.v}%</p>
        <div class="meter"><span style="width:${s.v}%"></span></div><p>${t(s.d)}</p>`);
    }
  });

  /* ================= TYPEWRITER ================= */
  let typeToken = 0;
  function typeText(txt) {
    const my = ++typeToken, el = $('#typed');
    el.textContent = '';
    let i = 0;
    (function step() {
      if (my !== typeToken) return;
      el.textContent = txt.slice(0, ++i);
      if (i < txt.length) setTimeout(step, 70 + Math.random() * 70);
    })();
  }

  /* ================= REVEAL ================= */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: .15 });
  function observeReveal() { $$('.reveal:not(.in), .periodic:not(.in)').forEach(el => io.observe(el)); }

  /* ================= SCROLL ================= */
  function onScroll() {
    const h = root.scrollHeight - innerHeight;
    $('#progress').style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    const tl = $('#timeline'), r = tl.getBoundingClientRect();
    tl.style.setProperty('--fill', Math.min(1, Math.max(0, (innerHeight * .6 - r.top) / r.height)));
  }
  addEventListener('scroll', onScroll, { passive: true });

  /* ================= THEME / LANG / ACCENT ================= */
  function setTheme(v) { theme = v; root.dataset.theme = v; localStorage.setItem('theme', v); }
  function setAccent(c) {
    accent = c; root.style.setProperty('--accent', c);
    localStorage.setItem('accent', c); $('#accentPicker').value = c;
  }
  $('#themeBtn').addEventListener('click', () => setTheme(theme === 'dark' ? 'light' : 'dark'));
  $('#langBtn').addEventListener('click', () => { lang = lang === 'en' ? 'fr' : 'en'; localStorage.setItem('lang', lang); renderAll(); });
  $$('.sw[data-c]').forEach(b => b.addEventListener('click', () => setAccent(b.dataset.c)));
  $('#accentPicker').addEventListener('input', e => setAccent(e.target.value));

  /* ================= STARS ================= */
  const cv = $('#stars'), ctx = cv.getContext('2d');
  const dpr = Math.min(devicePixelRatio || 1, 2);
  let W, H, stars = [];
  const mouse = { x: -9999, y: -9999, px: 0, py: 0 };
  function initStars() {
    W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
    const count = Math.min(220, Math.floor(innerWidth * innerHeight / 7000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: (Math.random() * 1.6 + .4) * dpr,
      vx: 0, vy: 0, by: -(Math.random() * .25 + .05) * dpr, z: Math.random() * .8 + .2, tw: Math.random() * 6.28
    }));
  }
  addEventListener('resize', initStars);
  addEventListener('mousemove', e => {
    mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr;
    mouse.px = (e.clientX / innerWidth - .5); mouse.py = (e.clientY / innerHeight - .5);
  });
  addEventListener('mouseleave', () => { mouse.x = mouse.y = -9999; });

  function hexToRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function drawStars() {
    ctx.clearRect(0, 0, W, H);
    const [ar, ag, ab] = hexToRgb(accent), dark = theme === 'dark';
    const R = 130 * dpr;
    for (const s of stars) {
      const dx = s.x - mouse.x, dy = s.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < R) { const f = (1 - d / R) * 1.2; s.vx += dx / d * f; s.vy += dy / d * f; }
      s.vx *= .92; s.vy *= .92;
      s.x += s.vx; s.y += s.vy + s.by;
      if (s.y < -10) { s.y = H + 10; s.x = Math.random() * W; }
      if (s.x < -10) s.x = W + 10; if (s.x > W + 10) s.x = -10;
      s.tw += .03;
      const a = (.5 + Math.sin(s.tw) * .4) * s.z;
      const x = s.x - mouse.px * 30 * s.z * dpr, y = s.y - mouse.py * 30 * s.z * dpr;
      ctx.beginPath(); ctx.arc(x, y, s.r, 0, 6.283);
      ctx.fillStyle = dark ? `rgba(255,255,255,${a})` : `rgba(${ar},${ag},${ab},${a * .8})`;
      ctx.shadowBlur = 8 * dpr; ctx.shadowColor = `rgba(${ar},${ag},${ab},${a})`;
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }

  /* ================= LOGO (rotating icosahedron) ================= */
  const lc = $('#logo'), lx = lc.getContext('2d');
  const p = (1 + Math.sqrt(5)) / 2;
  const V = [[-1, p, 0], [1, p, 0], [-1, -p, 0], [1, -p, 0], [0, -1, p], [0, 1, p], [0, -1, -p], [0, 1, -p], [p, 0, -1], [p, 0, 1], [-p, 0, -1], [-p, 0, 1]];
  const E = [];
  for (let i = 0; i < V.length; i++) for (let j = i + 1; j < V.length; j++) {
    const d = Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]);
    if (Math.abs(d - 2) < .01) E.push([i, j]);
  }
  let ang = 0;
  function drawLogo() {
    ang += .012;
    const s = lc.width, c = s / 2, k = s * .22;
    lx.clearRect(0, 0, s, s);
    const ca = Math.cos(ang), sa = Math.sin(ang), cb = Math.cos(ang * .7), sb = Math.sin(ang * .7);
    const P = V.map(([x, y, z]) => {
      let x1 = x * ca - z * sa, z1 = x * sa + z * ca;
      let y1 = y * cb - z1 * sb, z2 = y * sb + z1 * cb;
      const f = 3.2 / (3.2 + z2 * .5);
      return [c + x1 * k * f, c + y1 * k * f, z2];
    });
    lx.lineWidth = 2; lx.strokeStyle = accent;
    E.forEach(([a, b]) => {
      lx.globalAlpha = .35 + ((P[a][2] + P[b][2]) / 2 + p) / (2 * p) * .65;
      lx.beginPath(); lx.moveTo(P[a][0], P[a][1]); lx.lineTo(P[b][0], P[b][1]); lx.stroke();
    });
    lx.globalAlpha = 1; lx.fillStyle = accent;
    P.forEach(([x, y]) => { lx.beginPath(); lx.arc(x, y, 2.6, 0, 6.283); lx.fill(); });
  }

  function loop() { drawStars(); drawLogo(); requestAnimationFrame(loop); }

  /* ================= LOADER ================= */
  function runLoader() {
    let v = 0;
    const fill = $('#loaderFill'), pct = $('#loaderPct');
    const tick = setInterval(() => {
      v = Math.min(100, v + Math.random() * 9 + 2);
      fill.style.width = v + '%'; pct.textContent = Math.floor(v) + '%';
      if (v >= 100) {
        clearInterval(tick);
        setTimeout(() => {
          $('#loader').classList.add('done');
          document.body.classList.remove('loading');
          loaded = true;
          typeText(S('typed'));
        }, 350);
      }
    }, 90);
  }

  /* ================= INIT ================= */
  $('#year').textContent = new Date().getFullYear();
  setTheme(theme); setAccent(accent);
  renderAll(); initStars(); loop(); onScroll(); runLoader();
})();
