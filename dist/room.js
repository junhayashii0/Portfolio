// The room as navigation: laptop → terminal, books → About, phone → Contact, dog → hints.
// Relies on globals from app.js: projects, openProject, scene, hero, desk, bodies, reducedMotion, smallScreen, screenQuad.
(() => {
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const wait = ms => new Promise(r => setTimeout(r, ms));
const calm = () => reducedMotion.matches;

/* ---------- Sheets (book, phone): animated open/close on <dialog> ---------- */
function openSheet(dialog) {
  if (dialog.open) return;
  dialog.classList.remove('is-closing');
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}
function closeSheet(dialog) {
  if (!dialog.open || dialog.classList.contains('is-closing')) return;
  if (calm()) { dialog.close(); return; }
  dialog.classList.add('is-closing');
  setTimeout(() => { dialog.classList.remove('is-closing'); dialog.close(); }, 180);
}
for (const dialog of [$('bookDialog'), $('phoneDialog'), $('worksDialog')]) {
  dialog.addEventListener('cancel', e => { e.preventDefault(); closeSheet(dialog); });
  dialog.addEventListener('click', e => { if (e.target === dialog) closeSheet(dialog); });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
  dialog.querySelectorAll('.sheet-close,.phone-back').forEach(b => b.addEventListener('click', () => closeSheet(dialog)));
}
// Contact form (Google Forms). Paste the form's share URL here; the button stays hidden while it's empty.
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfUlXfXXWiduFm6orXGqjB97V4cGp25wadxGQZw5Jj6Z-97yA/viewform';
const formButton = $('formButton'), phoneForm = $('phoneForm');
if (FORM_URL) { formButton.hidden = false; $('xButton').classList.add('is-secondary'); }
formButton.addEventListener('click', () => {
  const frame = phoneForm.querySelector('iframe');
  if (!frame.src) frame.src = FORM_URL + (FORM_URL.includes('?') ? '&' : '?') + 'embedded=true&hl=ja';
  phoneForm.hidden = false;
});
$('formBack').addEventListener('click', () => { phoneForm.hidden = true; });
$('phoneDialog').addEventListener('close', () => { phoneForm.hidden = true; });
const openAbout = () => openSheet($('bookDialog'));
const openWorks = () => openSheet($('worksDialog'));
// Header links, the hero button and the skip link open the room's sheets instead of scrolling.
document.querySelectorAll('[data-open]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  const inBook = a.closest('#bookDialog'); if (inBook) inBook.close();
  ({ works: openWorks, about: () => openAbout(), contact: () => openContact() })[a.dataset.open]();
}));
function openContact() {
  const now = new Date();
  $('phoneTime').textContent = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
  openSheet($('phoneDialog'));
}

/* ---------- Dog: sleepy guide ---------- */
const dogLines = [
  '……zzz（まだ眠いみたい）',
  'わん！ PCの画面、さわれるよ',
  '本を開くと、Junのことがわかるよ',
  'スマホからメッセージを送れるよ',
  'タイルはドラッグで動かせるよ',
  'タイルは左のケースに1枚ずつしまえるよ',
  'ランプをつけると、夜になるよ',
];
let dogLine = 0, dogTimer = 0;
const bubble = $('dogBubble'), zz = document.querySelector('.dog-zz');
function petDog(line) {
  bubble.textContent = line ?? dogLines[dogLine++ % dogLines.length];
  bubble.classList.add('is-shown'); zz.classList.add('is-awake');
  clearTimeout(dogTimer);
  dogTimer = setTimeout(() => { bubble.classList.remove('is-shown'); zz.classList.remove('is-awake'); }, 3600);
}

/* ---------- Hotspots + nav highlighting ---------- */
document.querySelectorAll('.hotspot').forEach(spot => spot.addEventListener('click', () => {
  ({ dog: () => petDog(), about: openAbout, contact: openContact, lamp: () => setNight() })[spot.dataset.spot]();
}));
const lit = { '#works': desk, '#about': document.querySelector('.hotspot-books'), '#contact': document.querySelector('.hotspot-phone') };
document.querySelectorAll('.site-header nav a').forEach(link => {
  const target = lit[link.hash]; if (!target) return;
  const on = () => target.classList.add('is-lit');
  const off = () => target.classList.remove('is-lit');
  link.addEventListener('pointerenter', on); link.addEventListener('pointerleave', off);
  link.addEventListener('focus', on); link.addEventListener('blur', off);
});

/* ---------- Header nav: a highlight glides between the links ---------- */
const nav = document.querySelector('.site-header nav'), navInd = nav.querySelector('.nav-indicator');
function moveIndicator(link) {
  if (!link) { nav.classList.remove('has-indicator'); return; }
  const n = nav.getBoundingClientRect(), r = link.getBoundingClientRect();
  // First appearance: jump into place, then glide from there on.
  if (!nav.classList.contains('has-indicator')) { navInd.style.transition = 'none'; requestAnimationFrame(() => { navInd.style.transition = ''; }); }
  navInd.style.width = `${r.width}px`; navInd.style.transform = `translateX(${r.left - n.left}px)`;
  nav.classList.add('has-indicator');
}
nav.querySelectorAll('a').forEach(a => { a.addEventListener('pointerenter', () => moveIndicator(a)); a.addEventListener('focus', () => moveIndicator(a)); });
nav.addEventListener('pointerleave', () => moveIndicator(null));
nav.addEventListener('focusout', e => { if (!nav.contains(e.relatedTarget)) moveIndicator(null); });

/* ---------- Laptop: auto-typed "help" invites a click ---------- */
const laptop = document.querySelector('.laptop-link');
const typed = document.querySelector('.terminal-typed');
(async () => {
  if (calm()) { typed.textContent = 'help'; laptop.classList.add('is-ready'); return; }
  await wait(1400);
  for (const ch of 'help') { typed.textContent += ch; await wait(120 + Math.random() * 60); }
  await wait(250);
  laptop.classList.add('is-ready');
})();

/* ---------- Camera dive into the laptop ---------- */
const term = $('terminalDialog');
const ZOOM_MS = 760;
function diveTransform() {
  const W = scene.offsetWidth, H = scene.offsetHeight, k = W / 1536;
  const cx = screenQuad.reduce((a, p) => a + p[0], 0) / 4 * k, cy = screenQuad.reduce((a, p) => a + p[1], 0) / 4 * k;
  const [tl, tr, br, bl] = screenQuad, sw = (tr[0] - tl[0] + br[0] - bl[0]) / 2, sh = (bl[1] - tl[1] + br[1] - tr[1]) / 2;
  const z = Math.min(hero.clientWidth * .96 / (sw * k), hero.clientHeight * .92 / (sh * k));
  const ox = W * .58, oy = H * .62; // matches .scene-world transform-origin
  const tx = W / 2 - ox - z * (cx - ox), ty = H / 2 - oy - z * (cy - oy);
  // Same function list as the resting transform (translate, translate, scale) so it interpolates cleanly.
  return `translate(${tx}px,${ty}px) translate(-50%,-50%) scale(${z})`;
}
let afterClose = null;
async function openTerminal() {
  if (term.open) return;
  document.body.style.overflow = 'hidden';
  if (!calm()) {
    hero.classList.add('is-diving');
    scene.style.transition = `transform ${ZOOM_MS}ms cubic-bezier(.77,0,.175,1)`;
    scene.style.transform = diveTransform();
    await wait(ZOOM_MS - 180);
  }
  term.showModal();
  if (!matchMedia('(pointer: coarse)').matches) $('termInput').focus();
}
function closeTerminal(then) {
  afterClose = then || null;
  if (!term.open || term.classList.contains('is-closing')) return;
  if (calm()) { term.close(); return; }
  term.classList.add('is-closing');
  setTimeout(() => { term.classList.remove('is-closing'); term.close(); }, 160);
}
term.addEventListener('cancel', e => { e.preventDefault(); closeTerminal(); });
term.addEventListener('close', async () => {
  document.body.style.overflow = '';
  const next = afterClose; afterClose = null;
  if (hero.classList.contains('is-diving')) {
    scene.style.transform = '';
    hero.classList.remove('is-diving');
    await wait(ZOOM_MS * .8);
    scene.style.transition = '';
  }
  laptop.focus({ preventScroll: true });
  next?.();
});
term.querySelector('.term-close').addEventListener('click', () => closeTerminal());
laptop.addEventListener('click', openTerminal);

/* ---------- Terminal shell ---------- */
const log = $('termLog'), input = $('termInput'), main = $('termMain');
const history = []; let historyAt = 0;
const cmd = c => `<button type="button" class="t-cmd" data-run="${esc(c)}">${esc(c)}</button>`;
const allWorks = () => [...projects, ...webProjects];
const findProject = q => { q = q.toLowerCase(); return allWorks().find(p => p.id === q) || allWorks().find(p => p.id.startsWith(q)); };
function print(html, cls = '') {
  const line = document.createElement('div');
  line.className = 't-out ' + cls; line.innerHTML = html;
  log.append(line); main.scrollTop = main.scrollHeight;
}
function focusTile(p) {
  const b = bodies.find(b => b.p === p); if (!b) return;
  b.el.classList.remove('is-hop'); void b.el.offsetWidth; b.el.classList.add('is-hop');
  setTimeout(() => openProject(p.id), calm() ? 0 : 520);
}
const commands = {
  help: () => print(`<span class="t-dim">使えるコマンド（クリックでも実行できます）</span>
<div class="t-grid">${[
  ['about', 'Junについて（本を開きます）'], ['ls', 'アプリの一覧（ls web で Web）'], ['open nesk', '作品を開く（名前を入れ替えて）'],
  ['works', '作品の一覧を開く'], ['contact', '連絡する（スマホを出します）'], ['whoami', 'ひとことで自己紹介'], ['github', 'GitHub のプロフィール'],
  ['info stabit', '作品の紹介をここに表示'], ['pet', '犬をなでる'], ['lights', '部屋の明かりを切りかえる'], ['tidy', 'タイルを片付ける / ひろげる'],
  ['clear', '画面をきれいに'], ['exit', 'ターミナルを閉じる'],
].map(([c, d]) => `${cmd(c)}<span>${d}</span>`).join('')}</div>`),
  whoami: () => print('jun — ITアナリスト / 個人開発者\n2026年6月に個人開発をはじめ、いまは5本のアプリを App Store で公開中。'),
  ls: arg => arg && /^web/.test(arg) ? print(`<div class="t-ls">${webProjects.map(p => `<button type="button" class="t-cmd" data-run="open ${p.id}">${p.name}/</button><span class="t-dim">web${p.here ? ' · ここ' : ''}</span>`).join('')}</div>`) : print(`<span class="t-dim">apps/</span>  ${cmd('ls web')} で Web の作品も<div class="t-ls">${projects.map(p => `<button type="button" class="t-cmd" data-run="open ${p.id}">${p.name}/</button><span class="t-dim">${p.category.toLowerCase()}${p.status ? ' · ' + p.status : ''}</span>`).join('')}</div>`),
  open: arg => {
    if (!arg) return print(`使いかた: ${cmd('open nesk')}  — 一覧は ${cmd('ls')}`);
    const p = findProject(arg);
    if (!p) return print(`open: '${esc(arg)}' は見つかりませんでした。${cmd('ls')} で一覧を見られます`, 't-err');
    if (p.here) return print(`${p.name} はもう開いています 👀  いま見ているのがそれです。${cmd('info portfolio')}`);
    print(`<span class="t-dim">opening</span> ${p.name} …`);
    setTimeout(() => closeTerminal(() => webProjects.includes(p) ? openProject(p.id) : focusTile(p)), 280);
  },
  info: arg => {
    const p = arg && findProject(arg);
    if (!p) return print(`使いかた: ${cmd('info nesk')}`);
    print(`<span class="t-hello">${p.name}</span>  <span class="t-dim">${p.category.toLowerCase()} · ${esc(p.platform)}${p.status ? ' · ' + p.status : ''}</span>
${esc(p.summary)}

<span class="t-dim">${esc(p.description)}</span>
${p.features.map(f => '  · ' + esc(f)).join('\n')}

${p.here ? '<span class="t-dim">いま見ているサイトです 👀</span>\n' : ''}${p.url ? `<a class="t-cmd" href="${p.url}" target="_blank" rel="noopener noreferrer">サイトを開く ↗</a>  ` : ''}${p.store ? `<a class="t-cmd" href="${p.store}" target="_blank" rel="noopener noreferrer">App Store ↗</a>  ` : ''}${(p.links || []).map(l => `<a class="t-cmd" href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label} ↗</a>  `).join('')}${cmd('open ' + p.id)} で詳しく見る`);
  },
  about: () => { print('<span class="t-dim">本棚から1冊ぬきだしています…</span>'); setTimeout(() => closeTerminal(openAbout), 280); },
  contact: () => { print('<span class="t-dim">スマホを手に取っています…</span>'); setTimeout(() => closeTerminal(openContact), 280); },
  works: () => closeTerminal(openWorks),
  pet: () => { print('犬がしっぽをふっています ♡'); petDog('わん！'); },
  lights: arg => {
    const night = arg === 'off' ? true : arg === 'on' ? false : !document.body.classList.contains('is-night');
    print(night ? 'ランプをつけました。おやすみの時間です。' : 'カーテンを開けました。おはようございます。');
    setTimeout(() => closeTerminal(() => setNight(night)), 380);
  },
  tidy: () => { const t = !bodies.some(b => b.override); print(t ? 'タイルをケースにしまいます。' : 'ケースを開けます。'); setTimeout(() => closeTerminal(() => setTidy(t)), 280); },
  clear: () => { log.innerHTML = ''; },
  exit: () => closeTerminal(),
  date: () => print(new Date().toLocaleString('ja-JP', { dateStyle: 'full', timeStyle: 'short' })),
  echo: arg => print(esc(arg)),
  github: () => print(`<a class="t-cmd" href="https://github.com/junhayashii0" target="_blank" rel="noopener noreferrer">github.com/junhayashii0 ↗</a>\n<span class="t-dim">リポジトリはほとんど非公開です。</span>`),
  sudo: () => print('sudo: 犬の許可がありません。', 't-err'),
  play: () => print(`まだ準備中です。かわりに ${cmd('open monoria')} はいかが？`),
};
const aliases = { light: 'lights', lamp: 'lights', night: 'lights', clean: 'tidy', '?': 'help', cd: 'ls', dir: 'ls', quit: 'exit', q: 'exit', wake: 'pet', me: 'about', mail: 'contact' };
function run(raw) {
  const line = raw.trim();
  print(`<span class="t-ps">jun@portfolio ~ %</span> ${esc(line)}`, 't-echo');
  if (!line) return;
  history.push(line); historyAt = history.length;
  let [name, ...rest] = line.split(/\s+/); name = name.toLowerCase(); name = aliases[name] || name;
  const arg = rest.join(' ');
  if (commands[name]) return commands[name](arg);
  const p = findProject(name);
  if (p && name.length > 2) return commands.open(name);
  print(`zsh: command not found: ${esc(name)} — ${cmd('help')} で一覧を見られます`, 't-err');
}
$('termForm').addEventListener('submit', e => { e.preventDefault(); run(input.value); input.value = ''; });
input.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && history.length) { e.preventDefault(); historyAt = Math.max(0, historyAt - 1); input.value = history[historyAt]; }
  else if (e.key === 'ArrowDown' && history.length) { e.preventDefault(); historyAt = Math.min(history.length, historyAt + 1); input.value = history[historyAt] ?? ''; }
  else if (e.key === 'Tab') {
    e.preventDefault();
    const [head, ...rest] = input.value.split(' ');
    const pool = rest.length ? projects.map(p => p.id) : Object.keys(commands);
    const word = rest.length ? rest.join(' ') : head;
    const hit = word && pool.find(w => w.startsWith(word.toLowerCase()));
    if (hit) input.value = rest.length ? `${head} ${hit}` : hit + ' ';
  }
  else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); commands.clear(); }
});
term.addEventListener('click', e => {
  const b = e.target.closest('[data-run]');
  if (b) { run(b.dataset.run); input.focus(); return; }
  if (e.target === term) closeTerminal();
  else if (!e.target.closest('button,a,input') && !getSelection().toString()) input.focus();
});

// Sidebar mirrors the project folder; chips are the no-typing path.
$('termSide').innerHTML = `<span class="t-dim">⌄ apps</span>` + projects.map(p => `<button type="button" data-run="open ${p.id}">${p.name}</button>`).join('') + `<span class="t-dim t-gap">⌄ web</span>` + webProjects.map(p => `<button type="button" data-run="info ${p.id}">${p.name}</button>`).join('') + `<span class="t-dim t-gap">⌄ portfolio</span><button type="button" data-run="about">about.md</button><button type="button" data-run="contact">contact</button>`;
$('termChips').innerHTML = ['help', 'about', 'ls', 'contact', 'lights', 'pet', 'exit'].map(c => `<button type="button" data-run="${c}">${c}</button>`).join('');

const d = new Date();
print(`<span class="t-dim">Last login: ${d.toLocaleDateString('ja-JP')} ${d.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })} on portfolio</span>`);
print(`<span class="t-hello">Hello, I'm Jun.</span>\nここは Jun の机のターミナルです。${cmd('help')} と打つか、下のボタンを押してみてください。`);

/* ---------- Tile case ----------
   Sits open at the front-left of the desk. Tiles spill out of it on arrival, and any single tile can be
   dropped back in. All 8 inside = lid closes ("desk-tidy"). */
const tidyButton = $('tidyButton');
const caseEl = document.createElement('span');
caseEl.className = 'tile-case'; caseEl.setAttribute('aria-hidden', 'true');
caseEl.innerHTML = '<span class="case-hint">ここにしまう</span>';
const lidEl = document.createElement('button');
lidEl.type = 'button'; lidEl.className = 'case-lid'; lidEl.setAttribute('aria-label', 'ケースを開けて作品をひろげる');
desk.prepend(caseEl); desk.append(lidEl);
// The tidy button sits just under the case.
desk.append(tidyButton);
function caseGeometry() {
  const w = bodies[0].el.offsetWidth, s = .56, g = w * s + 10;
  const phone = smallScreen.matches, [x, y] = imgToDesk(...(phone ? CASE_IMG_PHONE : CASE_IMG)), cx = phone ? x : Math.max(x, g * 2 + 30), cy = y;
  return { s, g, cx, cy, width: g * 4 + 26, height: g * 2 + 34 };
}
function slot(i, geo) { return [geo.cx + ((i % 4) - 1.5) * geo.g, geo.cy + (Math.floor(i / 4) - .5) * geo.g * .78]; }
function placeCase(geo = caseGeometry()) {
  for (const el of [caseEl, lidEl]) Object.assign(el.style, { left: `${geo.cx}px`, top: `${geo.cy}px`, width: `${geo.width}px`, height: `${geo.height}px` });
  Object.assign(tidyButton.style, { left: `${geo.cx}px`, top: `${geo.cy + geo.height * .37 + 18}px` });
}
const stored = () => bodies.filter(b => b.override);
// Loose tiles stay to the right of the case.
caseRightEdge = () => { const g = caseGeometry(); return g.cx + g.width / 2; };
dropZones.push({
  el: caseEl,
  contains: (x, y) => { if (!caseEl.classList.contains('is-shown')) return false; const r = caseEl.getBoundingClientRect(); return x > r.left - 30 && x < r.right + 30 && y > r.top - 40 && y < r.bottom + 30; },
  drop: b => { storeTile(b); updateCase(); },
});
function storeTile(b) {
  const [x, y] = slot(b.i, caseGeometry());
  b.override = { x, y }; b.angle = 0; b.vx = b.vy = b.spin = b.rock = 0;
  if (!calm()) { b.el.classList.add('is-gliding'); setTimeout(() => b.el.classList.remove('is-gliding'), 450); }
  paintBody(b);
}
function updateCase() {
  const n = stored().length, all = n === bodies.length;
  placeCase();
  const shown = true; // the case always sits on the desk; the lid only closes when it's full
  caseEl.classList.toggle('is-shown', shown); caseEl.classList.toggle('is-empty', n === 0);
  lidEl.classList.toggle('is-shown', shown); lidEl.classList.toggle('is-open', !all);
  document.body.classList.toggle('desk-tidy', all);
  tidyButton.querySelector('.tidy-label').textContent = n ? 'ひろげる' : '片付ける';
  tidyButton.setAttribute('aria-pressed', String(all));
}
// Show the open case whenever a tile is picked up.
new MutationObserver(() => updateCase()).observe(document.body, { attributes: true, attributeFilter: ['class'] });
window.addEventListener('tile-unstored', () => updateCase());
let caseBusy = false;
async function setTidy(tidy) {
  if (caseBusy) return;
  const targets = tidy ? bodies.filter(b => !b.override) : stored();
  if (!targets.length) return;
  caseBusy = true;
  const animate = !calm();
  if (animate) desk.classList.add('is-flying');
  targets.forEach((b, i) => b.el.style.setProperty('--d', `${(tidy ? targets.length - 1 - i : i) * 55}ms`));
  if (tidy) {
    caseEl.classList.add('is-shown'); lidEl.classList.add('is-shown', 'is-open'); placeCase();
    if (animate) await wait(200);
    targets.forEach(b => { const [x, y] = slot(b.i, caseGeometry()); b.override = { x, y }; b.angle = 0; b.vx = b.vy = 0; paintBody(b); });
    if (animate) await wait(700 + targets.length * 55);
  } else {
    lidEl.classList.add('is-open');
    if (animate) await wait(280);
    targets.forEach(b => { b.override = null; homeBody(b); paintBody(b); });
    if (animate) await wait(250 + targets.length * 55);
  }
  desk.classList.remove('is-flying');
  targets.forEach(b => b.el.style.removeProperty('--d'));
  caseBusy = false;
  updateCase();
}
lidEl.addEventListener('click', () => setTidy(false));
caseEl.addEventListener('click', () => setTidy(false));
tidyButton.addEventListener('click', () => setTidy(stored().length === 0));
window.addEventListener('resize', () => requestAnimationFrame(() => { const geo = caseGeometry(); stored().forEach(b => { const [x, y] = slot(b.i, geo); b.override = { x, y }; paintBody(b); }); updateCase(); }));
// Arrival: everything starts in the case and spills out once the page has settled.
if (!smallScreen.matches && !calm()) {
  desk.classList.add('no-anim');
  bodies.forEach(b => { const [x, y] = slot(b.i, caseGeometry()); b.override = { x, y }; b.angle = 0; paintBody(b); });
  updateCase();
  requestAnimationFrame(() => requestAnimationFrame(() => desk.classList.remove('no-anim')));
  setTimeout(() => setTidy(false), 900);
} else updateCase();

/* ---------- Phone: swipe sideways to look around the room ---------- */
// The scene and the tiles share one horizontal offset (roomPan). Vertical drags still scroll the page
// (touch-action: pan-y); a horizontal drag pans with a little momentum and rubber-bands at the edges.
const PAN_FOCUS_X = 660; // laptop screen, in background-image px
const panLimit = () => Math.max(0, (scene.offsetWidth - hero.clientWidth) / 2);
const panFor = ix => (.5 - ix / 1536) * scene.offsetWidth;
function setPan(p) { roomPan = p; hero.style.setProperty('--pan', `${p.toFixed(1)}px`); }
panBy = dx => { const lim = panLimit(); setPan(Math.max(-lim, Math.min(lim, roomPan + dx))); if (!hasPanned) { hasPanned = true; hero.classList.add('has-panned'); } };
let panGesture = null, panFrame = 0, suppressTap = false, hasPanned = false;
function glidePan(v) {
  cancelAnimationFrame(panFrame);
  let last = performance.now();
  const step = now => {
    const dt = Math.min(32, now - last); last = now;
    const lim = panLimit(), over = roomPan > lim ? roomPan - lim : roomPan < -lim ? roomPan + lim : 0;
    if (over) { v = v * .7 - over * .012; } else v *= Math.pow(.94, dt / 16);
    setPan(roomPan + v * dt);
    if (Math.abs(v) > .01 || Math.abs(over) > .5) panFrame = requestAnimationFrame(step);
    else setPan(Math.max(-lim, Math.min(lim, roomPan)));
  };
  panFrame = requestAnimationFrame(step);
}
hero.addEventListener('pointerdown', e => {
  if (!smallScreen.matches || !e.isPrimary || e.target.closest('.desk-item,.tilt-button,.hero-copy a')) return;
  cancelAnimationFrame(panFrame);
  panGesture = { id: e.pointerId, x0: e.clientX, y0: e.clientY, p0: roomPan, on: false, samples: [[performance.now(), roomPan]] };
});
hero.addEventListener('pointermove', e => {
  const g = panGesture; if (!g || e.pointerId !== g.id) return;
  const dx = e.clientX - g.x0, dy = e.clientY - g.y0;
  if (!g.on) {
    if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { panGesture = null; return; } // it's a scroll
    if (Math.abs(dx) < 8) return;
    g.on = true; hero.setPointerCapture(e.pointerId); hero.classList.add('is-panning');
    if (!hasPanned) { hasPanned = true; hero.classList.add('has-panned'); }
  }
  const lim = panLimit(); let p = g.p0 + dx;
  if (p > lim) p = lim + (p - lim) * .35; else if (p < -lim) p = -lim + (p + lim) * .35;
  setPan(p);
  const t = performance.now(); g.samples.push([t, p]); while (g.samples.length > 2 && t - g.samples[0][0] > 80) g.samples.shift();
});
function endPan(e) {
  const g = panGesture; if (!g || e.pointerId !== g.id) return;
  panGesture = null; hero.classList.remove('is-panning');
  if (!g.on) return;
  suppressTap = true; setTimeout(() => { suppressTap = false; }, 60);
  const [t0, p0] = g.samples[0], [t1, p1] = g.samples.at(-1);
  glidePan(calm() || performance.now() - t1 > 90 ? 0 : (p1 - p0) / Math.max(16, t1 - t0));
}
hero.addEventListener('pointerup', endPan);
hero.addEventListener('pointercancel', endPan);
// A pan must not also count as a tap on whatever was under the finger.
hero.addEventListener('click', e => { if (suppressTap) { e.stopPropagation(); e.preventDefault(); } }, true);
function resetPan() {
  if (!smallScreen.matches) { setPan(0); return; }
  const lim = panLimit(); setPan(Math.max(-lim, Math.min(lim, panFor(PAN_FOCUS_X))));
}
let wasPhone = smallScreen.matches;
window.addEventListener('resize', () => requestAnimationFrame(() => {
  if (wasPhone !== smallScreen.matches) { wasPhone = smallScreen.matches; resetPan(); }
  else { const lim = panLimit(); setPan(Math.max(-lim, Math.min(lim, roomPan))); }
  resetLayout(); fitLaptop();
}));
resetPan(); resetLayout(); fitLaptop();
// First visit on a phone: a small peek to each side shows the room continues beyond the screen.
if (smallScreen.matches && !calm()) {
  setTimeout(() => {
    if (hasPanned) return;
    const from = roomPan, to = Math.max(-panLimit(), from - 70), t0 = performance.now();
    const peek = now => {
      if (hasPanned) return;
      const t = Math.min(1, (now - t0) / 1400), k = Math.sin(t * Math.PI); // out and back
      setPan(from + (to - from) * k * (1 - t * .15));
      if (t < 1) requestAnimationFrame(peek); else setPan(from);
    };
    requestAnimationFrame(peek);
  }, 1800);
}
if (matchMedia('(pointer: coarse)').matches) document.querySelector('.terminal-hint').textContent = 'tap to open ↵';

/* ---------- Phone: tilt to slide the tiles ----------
   Uses the orientation sensor (iOS asks permission, and only over https). The pose when play starts is
   "level"; tilting away from it slides the loose tiles like on a real tray. */
const tiltButton = $('tiltButton'), tiltLabel = tiltButton.querySelector('.tilt-label');
let tiltOn = false, tiltZero = null, tiltHeard = 0;
// Always offered on touch devices; if the sensor isn't available here, tapping explains why.
if (!matchMedia('(pointer: coarse)').matches) tiltButton.hidden = true;
function onOrient(e) {
  if (!tiltOn || e.beta == null) return;
  tiltHeard = performance.now();
  dbg('events', (debugState.events || 0) + 1); dbg('beta/gamma', `${e.beta?.toFixed(1)} / ${e.gamma?.toFixed(1)}`);
  if (!tiltZero) tiltZero = { beta: e.beta, gamma: e.gamma };
  const dead = d => Math.abs(d) < 1 ? 0 : d - Math.sign(d) * 1;
  const gx = Math.sin(dead(e.gamma - tiltZero.gamma) * Math.PI / 180), gy = Math.sin(dead(e.beta - tiltZero.beta) * Math.PI / 180);
  // app.js eases toward this each frame, which also smooths hand jitter. Depth (y) is foreshortened on the desk.
  const G = .0045; // px/ms² for a full 90°
  // Only while the room is on screen.
  tiltTarget = { ax: gx * G, ay: gy * G * .75 };
  if (tiltTarget) startPhysics();
}
function setTiltLabel(text) { tiltLabel.textContent = text; }
// ?debug: show each step of the sensor setup on screen (for diagnosing on a real phone).
const tiltDebug = new URLSearchParams(location.search).has('debug') ? Object.assign(document.createElement('pre'), { className: 'tilt-debug' }) : null;
const debugState = {};
function dbg(k, v) { if (!tiltDebug) return; debugState[k] = v; tiltDebug.textContent = Object.entries(debugState).map(([a, b]) => `${a}: ${b}`).join('\n'); }
if (tiltDebug) {
  document.body.append(tiltDebug);
  dbg('secure', isSecureContext); dbg('url', location.protocol + '//' + location.host);
  dbg('DeviceOrientationEvent', 'DeviceOrientationEvent' in window);
  dbg('requestPermission', typeof window.DeviceOrientationEvent?.requestPermission);
  dbg('coarse pointer', matchMedia('(pointer: coarse)').matches); dbg('button hidden', tiltButton.hidden);
  tiltButton.addEventListener('pointerdown', () => dbg('button', 'pointerdown'), true);
}
async function startTilt() {
  dbg('button', 'clicked');
  if (!('DeviceOrientationEvent' in window)) { setTiltLabel(isSecureContext ? 'この端末では使えません' : 'https で開くと遊べます'); setTimeout(() => setTiltLabel('傾けて遊ぶ'), 2600); return; }
  try {
    let answer = 'n/a';
    if (typeof DeviceOrientationEvent.requestPermission === 'function') { answer = await DeviceOrientationEvent.requestPermission(); }
    dbg('permission', answer);
    if (answer !== 'n/a' && answer !== 'granted') {
      setTiltLabel('センサーが許可されませんでした'); setTimeout(() => setTiltLabel('傾けて遊ぶ'), 2600); return;
    }
  } catch (err) { dbg('permission error', err && (err.name + ' ' + err.message)); setTiltLabel(isSecureContext ? '許可の確認に失敗しました' : 'https で開くと遊べます'); setTimeout(() => setTiltLabel('傾けて遊ぶ'), 2600); return; }
  tiltOn = true; tiltZero = null; tiltHeard = 0;
  hasPanned = true; hero.classList.add('has-panned'); // the swipe hint would cover the tiles
  window.addEventListener('deviceorientation', onOrient);
  tiltButton.setAttribute('aria-pressed', 'true'); setTiltLabel('傾きをとめる');
  // No readings (e.g. plain http on iPhone): say so instead of silently doing nothing.
  setTimeout(() => { if (tiltOn && !tiltHeard) { stopTilt(); setTiltLabel(isSecureContext ? 'センサーが反応しません' : 'https で開くと遊べます'); setTimeout(() => setTiltLabel('傾けて遊ぶ'), 2600); } }, 2500);
}
function stopTilt() {
  tiltOn = false; tiltTarget = null;
  window.removeEventListener('deviceorientation', onOrient);
  tiltButton.setAttribute('aria-pressed', 'false'); setTiltLabel('傾けて遊ぶ');
}
tiltButton.addEventListener('click', () => (tiltOn ? stopTilt() : startTilt()));

/* ---------- Lamp: day / night ---------- */
function setNight(night = !document.body.classList.contains('is-night')) {
  document.body.classList.toggle('is-night', night);
  document.querySelector('.hotspot-lamp').setAttribute('aria-pressed', String(night));
}
})();
