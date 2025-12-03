document.addEventListener('DOMContentLoaded', ()=>{
  // Inject CSS (since style.css in workspace is empty, we inject high-fidelity styles at runtime)
  const css = `@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@300;500&display=swap');
:root{ --bg: #1A1A2E; --neon: #FF1493; --soft: #F0E9F6; --muted: rgba(255,255,255,0.06);} *{box-sizing:border-box;margin:0;padding:0} html,body,#root{height:100%} body{ background: radial-gradient(1200px 600px at 10% 10%, rgba(255,20,147,0.04), transparent), linear-gradient(180deg, rgba(10,10,20,0.6), rgba(8,6,14,0.9)); background-color:var(--bg); color:#e9e9f0; font-family: 'Rajdhani', 'Orbitron', system-ui, -apple-system, "Segoe UI", Roboto, 'Helvetica Neue', Arial; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; padding:18px; }
.container{ display:grid; grid-template-columns: 72px 1fr; gap:24px; align-items:start; min-height: calc(100vh - 36px); }
#sidebar{ position:sticky; top:18px; height:calc(100vh - 36px); padding:18px 12px; border-radius:14px; background: rgba(255,255,255,0.03); backdrop-filter: blur(10px) saturate(120%); border: 1px solid rgba(255,20,147,0.12); box-shadow: 0 6px 30px rgba(8,6,20,0.6), 0 0 30px rgba(255,20,147,0.04) inset; display:flex; flex-direction:column; align-items:center; gap:18px; }
#sidebar .logo-small{ font-weight:700; color:var(--neon); font-size:18px; letter-spacing:1px }
.nav-links{ list-style:none; width:100%; display:flex; flex-direction:column; gap:8px; align-items:center }
.nav-links a{ display:block; padding:8px 10px; border-radius:8px; color:var(--neon); text-decoration:none; font-weight:500; transition:all .18s ease; text-align:center }
.nav-links a:hover{ box-shadow:0 6px 18px rgba(255,20,147,0.12); transform:translateY(-3px) }
.top-header{ display:flex; gap:18px; align-items:center; justify-content:space-between; margin-bottom:18px; }
.logo{ font-weight:700; font-size:20px; letter-spacing:2px }
.logo .accent{ color:var(--neon); text-shadow:0 4px 18px rgba(255,20,147,0.18) }
.search-bar{ flex:1; margin:0 18px }
.search-bar input{ width:100%; padding:12px 14px; border-radius:12px; background:#0f0f1a; border:1px solid rgba(255,255,255,0.03); color:#eaeaf6; outline:none; transition:box-shadow .18s ease; border-left:4px solid transparent }
.search-bar input:focus{ box-shadow:0 6px 28px rgba(240,240,255,0.04), 0 0 18px rgba(240,240,255,0.02); border-left-color:var(--soft) }
.cta-button{ background:var(--neon); color:#100014; padding:10px 16px; border-radius:999px; border:none; font-weight:700; cursor:pointer; box-shadow:0 8px 30px rgba(255,20,147,0.18); transition:transform .18s ease,box-shadow .18s ease }
.cta-button:hover{ transform:scale(1.03); box-shadow:0 16px 46px rgba(255,20,147,0.28) }
.video-grid{ column-gap:18px; column-fill: balance; width:100%; }
.video-item{ display:inline-block; width:100%; margin:0 0 18px; border-radius:12px; overflow:hidden; background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.12)); box-shadow:0 10px 30px rgba(2,2,6,0.6); transition:transform .18s ease,box-shadow .18s ease }
.video-item img{ width:100%; height:auto; display:block; filter:blur(1px); object-fit:cover }
.video-item .meta{ padding:12px }
.video-item h3{ font-size:15px; color:#fff; margin:0 }
.video-item.glowing-hover{ box-shadow:0 18px 50px rgba(255,20,147,0.26), 0 4px 20px rgba(0,0,0,0.5); transform:translateY(-6px) }
.video-item.glowing-hover img{ outline:4px solid rgba(255,20,147,0.06) }
.video-item .thumb-wrap{ position:relative }
.video-item .overlay{ position:absolute; inset:0; background:linear-gradient(180deg, rgba(8,6,20,0.0) 30%, rgba(8,6,20,0.65) 100%); opacity:0.9 }
.video-grid{ column-count:1 }
@media(min-width:700px){ .container{ grid-template-columns:160px 1fr } .video-grid{ column-count:2 } }
@media(min-width:1100px){ .container{ grid-template-columns:220px 1fr } .video-grid{ column-count:3 } }
.container.collapsed{ grid-template-columns:72px 1fr }
.container.collapsed #sidebar .nav-links a{ font-size:12px; padding:6px }
#sidebar-toggle{ background:transparent; border:none; color:var(--soft); font-size:18px; cursor:pointer; padding:6px; border-radius:8px }
#sidebar-toggle:hover{ background:rgba(255,255,255,0.02) }`;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // Titles (Russian) for placeholders
  const titles = [
    'Секреты Неонового Макияжа',
    'Подиум Кибер-Шик',
    'Студийный Портрет: Мягкий Свет',
    'Вечерняя Палитра: Розовый Глянец',
    'Городской Гламур: Ночной Образ',
    'Экспериментальная Мода 2025',
    'Бьюти-Ритуалы: Люкс-Уход',
    'Хайлайт: Сияние Кожи',
    'Авангардный Лук: Текстуры',
    'Неоновые Аксессуары: Тренд'
  ];

  const grid = document.getElementById('video-grid');

  // Utility to create a simple SVG placeholder data URI (blurred fashion-ish gradient)
  function makePlaceholder(width=800,height=450,seed=1){
    const gradient1 = ['#2b1b3a','#4b274a','#8b1d6b'][seed%3];
    const gradient2 = ['#1a1a2e','#2c0f2f','#3a0a3a'][(seed+1)%3];
    const svg = `<?xml version='1.0' encoding='UTF-8'?><svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>
      <defs>
        <linearGradient id='g${seed}' x1='0' x2='1' y1='0' y2='1'>
          <stop offset='0%' stop-color='${gradient1}'/>
          <stop offset='100%' stop-color='${gradient2}'/>
        </linearGradient>
        <filter id='f${seed}' x='-20%' y='-20%' width='140%' height='140%'>
          <feGaussianBlur stdDeviation='10'/>
        </filter>
      </defs>
      <rect width='100%' height='100%' fill='url(#g${seed})' filter='url(#f${seed})'/>
      <g opacity='0.08'>
        <circle cx='${Math.round(width*0.2)}' cy='${Math.round(height*0.3)}' r='${Math.round(width*0.25)}' fill='#ffffff'/>
      </g>
    </svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  // Create initial set of items (use first 8 titles)
  for(let i=0;i<8;i++){
    const item = document.createElement('article');
    item.className = 'video-item';

    const thumbWrap = document.createElement('div');
    thumbWrap.className = 'thumb-wrap';
    const img = document.createElement('img');
    img.alt = 'Видео';
    img.src = makePlaceholder(800, Math.floor(450 + Math.random()*120), i+3);

    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    thumbWrap.appendChild(img);
    thumbWrap.appendChild(overlay);

    const meta = document.createElement('div');
    meta.className = 'meta';
    const h3 = document.createElement('h3');
    h3.textContent = titles[i % titles.length];
    meta.appendChild(h3);

    item.appendChild(thumbWrap);
    item.appendChild(meta);

    // hover glow handling
    item.addEventListener('mouseover', ()=> item.classList.add('glowing-hover'));
    item.addEventListener('mouseout', ()=> item.classList.remove('glowing-hover'));

    grid.appendChild(item);
  }

  // Sidebar toggle
  const toggle = document.getElementById('sidebar-toggle');
  const container = document.querySelector('.container');
  toggle.addEventListener('click', ()=>{
    container.classList.toggle('collapsed');
  });

  // Search small demo: filter titles
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', (e)=>{
    const q = e.target.value.trim().toLowerCase();
    const items = Array.from(document.querySelectorAll('.video-item'));
    items.forEach(it=>{
      const title = it.querySelector('h3').textContent.toLowerCase();
      it.style.display = title.includes(q) ? 'inline-block' : 'none';
    });
  });

});