const projects = [
  {id:'monestia',name:'Monestia',category:'MONEY',summary:'日々のお金を、やさしく見渡す。',description:'収入や支出を記録し、口座・予算・サブスクリプションをまとめて見渡す家計簿。日々の記録を、暮らしを整えるきっかけに。',features:['収支の記録と、口座ごとの残高管理','月ごとの予算・分析・カレンダー','複数通貨と日本語・英語・ポルトガル語'],platform:'iOS',bg:'#e7eaf5',edge:'#b7c6d4',x:40,y:59,a:-10},
  {id:'cotocoto',name:'CotoCoto',category:'COOKING',summary:'「つくる」と「買う」を、ひとつながりに。',description:'レシピを集めて、必要な材料を買い物リストへ。「今日なに作る？」と「なに買えばいい？」をつなぐ、毎日の料理のためのアプリ。',features:['レシピURLから材料と手順を取り込み','複数レシピの材料を買い物リストにまとめる','家にある材料を外して、必要なものだけに'],platform:'iOS',bg:'#f6e6d9',edge:'#d6b9a3',x:57,y:61,a:9},
  {id:'logline',name:'Logline',category:'LIFE LOG',summary:'日々のかけらを、ひと続きの記録に。',description:'メモ、タスク、アイデア、学び。日々の出来事をひとつのタイムラインに残すアプリ。まず書いて、あとから整理し、振り返る。',features:['思いついた瞬間にクイックキャプチャ','メモをタスクに変えて、そのまま続ける','タグや検索で、過去の記録を見つける'],platform:'Desktop / iOS',bg:'#eee6dd',edge:'#bbaa99',x:23,y:66,a:-9},
  {id:'nesk',name:'Nesk',category:'FOCUS',summary:'今日の「やる」を、時間に置いてみる。',description:'今日やることを決め、時間を割り当て、行動につなげるためのデスク。タスクをタイムブロックに置いて、一日の流れを組み立てます。',features:['タスクをドラッグしてカレンダーに配置','見積もり時間と実際にかかった時間を記録','タスクごとのメモを残す'],platform:'Desktop',bg:'#e2edf0',edge:'#b4c4cd',x:75,y:58,a:8},
  {id:'shelfie',name:'Shelfie',category:'READING',summary:'読んだ本が、自分だけの本棚になる。',description:'読みたい本、読んでいる本、読み終えた本。読書の記録と感想を、自分だけの本棚に少しずつ積み重ねていくアプリ。',features:['ISBNスキャン・検索で本を追加','読書の進み具合、引用、感想を記録','表紙の並ぶ本棚と読書の統計'],platform:'iOS',bg:'#e9dfcf',edge:'#80714e',x:38,y:82,a:12},
  {id:'petport',name:'Petport',category:'PETS',summary:'大切な家族のことを、一冊に。',description:'ペットの健康手帳、身分証、思い出をひとつに。普段の記録から、病院やもしものときに必要な情報まで、手元にまとめます。',features:['写真とプロフィールをパスポートに','通院・薬・ワクチンなどの記録と予定','体重の変化や成長の思い出を残す'],platform:'iOS',bg:'#e8eadf',edge:'#b8baa9',x:57,y:80,a:-7},
  {id:'stabit',name:'Stabit',category:'HABITS',summary:'いつもの習慣が、自分のレベルになる。',description:'運動で筋力、勉強で知能。日々の行動を自分のステータスとして積み重ねる習慣アプリ。少しでも取り組んだことが、成長につながります。',features:['習慣の記録をXPとレベルに変える','6つのステータスで成長を見渡す','目標を更新しながら、日々の挑戦を続ける'],platform:'iOS',bg:'#d9e4dd',edge:'#394e44',x:76,y:78,a:11},
  {id:'monoria',name:'Monoria',category:'GAME',summary:'いつものモノと、小さな冒険。',description:'マグカップや日用品が仲間になる育成RPG。身近なものたちを育てて編成し、小さな冒険に出かけるゲームをつくっています。',features:['日用品の仲間を集めて育成・進化','最大4体でチームを組んで冒険','属性やスキルを組み合わせるオートバトル'],platform:'Web / Mobile',bg:'#e8ddd0',edge:'#70604b',x:89,y:67,a:-9}
];
const desk = document.getElementById('deskItems');
const works = document.getElementById('worksGrid');
// Row of tiles along the front of the desk, echoing the reference composition.
const illustratedPositions=[[27.5,80,-7],[34.8,82,4],[42.1,80.5,-3],[49.4,82.5,5],[56.7,80.5,-4],[64,82,6],[71.3,80.5,-5],[78.6,83,4]];
projects.forEach((p,i)=>{[p.x,p.y,p.a]=illustratedPositions[i]});
// Released apps link to the App Store (no country code, so each visitor lands in their own store).
const appStore={logline:'6800836115',shelfie:'6808421902',monestia:'6802481176',cotocoto:'6800907188',petport:'6810294176'};
// Extra links shown next to the App Store button.
const extraLinks={logline:[{label:'紹介サイトを見る',url:'https://loglineweb.netlify.app/'}],monestia:[{label:'Web版を開く',url:'https://monestia.vercel.app/'}]};
projects.find(p=>p.id==='monestia').platform='iOS / Web';
projects.find(p=>p.id==='nesk').platform='Desktop / iOS';
projects.forEach(p=>{p.links=extraLinks[p.id]||[]});
projects.forEach(p=>{if(appStore[p.id])p.store=`https://apps.apple.com/app/id${appStore[p.id]}`;else p.status='開発中'});
// App Store screenshots (assets/shots/<id>/01.jpg …), shown as a swipeable gallery in the details.
const shotCounts={logline:6,petport:5,shelfie:6,stabit:7,monestia:10,cotocoto:9};
// Desktop apps get one wide screenshot instead of a phone strip.
projects.find(p=>p.id==='nesk').screenshot='shots/nesk/01.jpg';
projects.forEach(p=>{if(shotCounts[p.id])p.shots=Array.from({length:shotCounts[p.id]},(_,i)=>`assets/shots/${p.id}/${String(i+1).padStart(2,'0')}.jpg`)});
projects.forEach((p,i)=>{
  const button=document.createElement('button');button.type='button';button.className='desk-item';button.dataset.project=p.id;button.setAttribute('aria-label',p.name+'：'+p.summary+' 詳細を見る');
  button.style.cssText=`--x:${p.x};--y:${p.y};--mx:${15+(i%4)*23.3};--my:${i<4?63:80};--angle:${p.a}deg;--tile-edge:${p.edge}`;
  button.innerHTML=`<span class="tile-face"><img src="assets/${p.id}.png" alt="" draggable="false" width="400" height="400"><span class="night-veil"></span></span><span class="tile-label">${p.name}</span>`;
  desk.append(button);
  const card=document.createElement('button');card.type='button';card.className='work-card';card.dataset.project=p.id;card.style.setProperty('--art-bg',p.bg);card.setAttribute('aria-label',p.name+'の詳細を見る');
  card.innerHTML=`<div class="work-art"><img src="assets/${p.id}.png" alt="" loading="lazy" width="400" height="400"></div><div class="work-info"><h3>${p.name}</h3><span aria-hidden="true">↗</span></div><p>${p.summary}</p><span class="work-platform">${p.platform}${p.store?' · App Store':' · 開発中'}</span>`;
  works.append(card);
});
// Web works live "inside the PC": listed in the terminal and the Works panel, not as desk tiles.
// here:true = the site you're looking at.
const webProjects=[
  {id:'portfolio',name:'Portfolio',category:'WEB',summary:'机の上で遊べる、このポートフォリオ。',description:'イラストの部屋そのものがナビゲーション。PCはターミナル、本は自己紹介、スマホは連絡先。アプリのタイルは動かしたり、ケースにしまったりできます。',features:['操作できるターミナル（help で一覧）','タイルの物理演算とケース','ランプで昼と夜の切りかえ','スマホは傾けてタイルを滑らせる'],platform:'Web',bg:'#efe4d4',here:true,screenshot:'portfolio.jpg'},
  {id:'bezel',name:'Bezel',category:'WEB TOOL',summary:'App Store のスクショを、ブラウザだけで。',description:'App Store 審査提出用のスクリーンショット画像をつくる Web ツール。スクショを入れてキャッチコピーを添え、端末フレームと背景を整えて、必要なサイズをまとめて書き出します。',features:['1つのテーマで、何枚並べても見た目がそろう','iPhone 6.9" / 6.5" / iPad 13" を ZIP で一括書き出し','端末フレームの色・角丸・3D 角度を調整','画像はブラウザの外に出さない（処理はすべて手元）'],platform:'Web · Next.js',bg:'#1b1d2a',status:'非公開',screenshot:'bezel.jpg',darkShot:true},
];
const webGrid=document.getElementById('webGrid');
webProjects.forEach(p=>{
  const card=document.createElement('button');card.type='button';card.className='work-card web-card';card.dataset.project=p.id;card.style.setProperty('--art-bg',p.bg);card.setAttribute('aria-label',p.name+'の詳細を見る');
  card.innerHTML=`<div class="work-art">${p.screenshot?`<span class="mini-browser has-shot" aria-hidden="true"><i></i><i></i><i></i><img src="assets/${p.screenshot}" alt="" loading="lazy"></span>`:`<span class="mini-browser" aria-hidden="true"><i></i><i></i><i></i><b>${p.name}</b></span>`}</div><div class="work-info"><h3>${p.name}</h3><span aria-hidden="true">↗</span></div><p>${p.summary}</p><span class="work-platform">${p.platform}${p.here?' · いま見ているサイト':p.status?' · '+p.status:''}</span>`;
  card.addEventListener('click',()=>openProject(p.id));
  webGrid.append(card);
});
const dialog=document.getElementById('projectDialog');
function openProject(id){
  const p=projects.find(p=>p.id===id)||webProjects.find(p=>p.id===id);if(!p)return;
  const web=webProjects.includes(p);
  const art=web?`<span class="mini-browser is-large" aria-hidden="true"><i></i><i></i><i></i><b>${p.name}</b></span>`:`<img src="assets/${p.id}.png" alt="${p.name}のアイコン">`;
  const siteLink=web?(p.here?`<p class="here-note">👀 いま見ているのが、このサイトです。</p>`:p.url?`<a class="store-link" href="${p.url}" target="_blank" rel="noopener noreferrer">サイトを開く <span aria-hidden="true">↗</span></a>`:''):'';
  document.getElementById('dialogContent').innerHTML=`<div class="dialog-hero" style="--art-bg:${p.bg}">${art}<div><p class="eyebrow">${p.category}</p><h2 id="dialogTitle">${p.name}</h2><p>${p.summary}</p></div></div><div class="dialog-body"><span class="work-platform">${p.platform}${p.status?`<span class="project-status">${p.status}</span>`:''}</span><p>${p.description}</p>${siteLink}${p.store?`<a class="store-link" href="${p.store}" target="_blank" rel="noopener noreferrer"><span class="store-apple" aria-hidden="true"></span>App Store で見る <span aria-hidden="true">↗</span></a>`:''}${(p.links||[]).map(l=>`<a class="store-link is-light" href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label} <span aria-hidden="true">↗</span></a>`).join('')}${p.shots?`<div class="shot-gallery" role="list" aria-label="${p.name}のスクリーンショット">${p.shots.map((src,i)=>`<img role="listitem" src="${src}" alt="${p.name}の画面 ${i+1}" loading="lazy" width="540" height="1168">`).join('')}</div>`:''}<h3>できること</h3><ul>${p.features.map(f=>`<li>${f}</li>`).join('')}</ul>${p.screenshot?`<figure class="dialog-screenshot is-wide${p.darkShot?' is-dark':''}"><img src="assets/${p.screenshot}" alt="${p.name}の画面" loading="lazy"><figcaption>${p.name} / ${p.platform}</figcaption></figure>`:''}</div>`;
  dialog.showModal();document.body.style.overflow='hidden';
}
document.querySelectorAll('[data-project]:not(.web-card)').forEach(b=>b.addEventListener('click',()=>{if(!b.dataset.suppressClick)openProject(b.dataset.project)}));
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>{document.body.style.overflow=''});
const header=document.getElementById('header');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const smallScreen=window.matchMedia('(max-width: 600px)');
const scene=document.getElementById('sceneWorld');
const hero=document.querySelector('.desk-sticky');
// Single screen: the room no longer zooms with scroll.
function updateScene(){}

// Pointer movement uses the desk's local coordinates, including camera zoom.
// Clicks remain native buttons; only a deliberate drag suppresses opening.
// b.override (set by the tile case) pins a tile to a slot in the case instead of its desk position.
const bodies=[...document.querySelectorAll('.desk-item')].map((el,i)=>({el,face:el.querySelector('.tile-face'),p:projects[i],i,x:0,y:0,vx:0,vy:0,angle:projects[i].a,spin:0,rock:0,drag:false,override:null}));
let physicsFrame=0,lastFrame=0;
function paintBody(b){
  const {x,y}=b.override||b;
  b.el.style.left=`${x}px`;b.el.style.top=`${y}px`;b.el.style.setProperty('--s',b.override?.56:1);
  b.face.style.transform=`perspective(800px) translateY(${b.drag?-9:0}px) rotateX(42deg) rotateZ(${b.angle+Math.sin(b.rock*.032)*Math.min(6,b.rock*.012)}deg)`;
}
function homeBody(b){
  const w=desk.clientWidth,h=desk.clientHeight;
  if(smallScreen.matches){const [x,y,a]=HOME_PHONE[b.i];[b.x,b.y]=imgToDesk(x,y);b.angle=a}
  else{const [x,y,a]=HOME[b.i];[b.x,b.y]=imgToDesk(x,y);b.angle=a;keepOnDesk(b)}
  b.vx=b.vy=b.spin=b.rock=0;
}
function resetLayout(){
  measureObjects();
  for(const b of bodies){if(!b.override)homeBody(b);paintBody(b)}
  updateScene();
}
// Tiles stay in one smooth region at the front of the desk (background-image pixels, 1536×1024):
// behind them runs a soft curve along the fronts of the coaster, laptop and dog; the phone's left end,
// the tile case and the bottom bar close the other sides. No obstacle corners, so nothing snags.
const FRONT_EDGE=[[0,752],[420,752],[470,692],[930,692],[990,724],[1536,724]];
const PHONE_LEFT_X=1180;
const HOME=[[431,843,-7],[531,757,4],[631,843,-3],[732,757,5],[832,843,-4],[932,757,6],[1033,843,-5],[1133,757,4]];
const CASE_IMG=[230,823],CASE_IMG_PHONE=[250,790];
// Phones: two rows of tiles near the laptop, where the room first opens.
const HOME_PHONE=[[533,742,-6],[618,736,4],[703,742,-3],[788,736,5],[533,818,4],[618,824,-5],[703,818,3],[788,824,-4]];
// Horizontal look-around offset on phones (px), set by room.js; scene and tiles both shift by it.
let roomPan=0;
// Set by room.js on phones: shifts the room while a tile is dragged against the screen edge.
let panBy=null;
// Tilt acceleration from the phone's sensors (px/ms²), set by room.js while tilt play is on.
let tilt=null,tiltTarget=null; // room.js sets tiltTarget from the sensor; tilt eases toward it every frame
// Tray friction while tilting (px/ms²): below TILT_STATIC a resting tile stays put (about 5° of tilt).
const TILT_STATIC=.00055,TILT_KINETIC=.0005;
let view={left:0,top:0,k:1};
// Registered by room.js: the case's right edge (desk px) and drop targets.
const dropZones=[];let caseRightEdge=()=>0;
function measureObjects(){
  const m=new DOMMatrix(getComputedStyle(scene).transform);
  view={k:scene.offsetWidth/1536,left:scene.offsetLeft+m.e-roomPan,top:scene.offsetTop+m.f};
}
const imgToDesk=(x,y)=>[view.left+x*view.k,view.top+y*view.k];
const smooth=t=>t*t*(3-2*t);
function frontEdgeY(xi){
  for(let i=1;i<FRONT_EDGE.length;i++){const [x0,y0]=FRONT_EDGE[i-1],[x1,y1]=FRONT_EDGE[i];if(xi<=x1)return y0+(y1-y0)*smooth(Math.max(0,(xi-x0)/(x1-x0)))}
  return FRONT_EDGE.at(-1)[1];
}
function keepOnDesk(b){
  const w=desk.clientWidth,h=desk.clientHeight,half=b.el.offsetWidth*.5;
  let minX,maxX,minY,maxY;
  {
    // Phones pan the room, so only the room's own edges apply there; desktop also keeps clear of the viewport.
    const phone=smallScreen.matches;
    // A held tile may hover over the case (to drop it in); loose tiles stay to its right.
    minX=Math.max(phone?view.left+half:16+half,b.drag?-Infinity:caseRightEdge()+8+half);maxX=Math.min(phone?Infinity:w-16-half,view.left+PHONE_LEFT_X*view.k-half);
    maxY=h-(phone?80:100);
    // While tilting, the phone screen itself is the tray: tiles stop at its edges instead of sliding out of view.
    if(phone&&tilt&&!b.drag){minX=Math.max(minX,-roomPan+half+8);maxX=Math.min(maxX,w-roomPan-half-8)}
    if(b.x<minX){b.x=minX;b.vx=Math.abs(b.vx)*.3}if(b.x>maxX){b.x=maxX;b.vx=-Math.abs(b.vx)*.3}
    minY=view.top+frontEdgeY((b.x-view.left)/view.k)*view.k+half*.8;
  }
  if(b.x<minX){b.x=minX;b.vx=Math.abs(b.vx)*.3}if(b.x>maxX){b.x=maxX;b.vx=-Math.abs(b.vx)*.3}
  if(b.y<minY){b.y=minY;b.vy=Math.abs(b.vy)*.3}if(b.y>maxY){b.y=maxY;b.vy=-Math.abs(b.vy)*.3}
}
function physics(now){
  const dt=Math.min(32,now-lastFrame||16);lastFrame=now;let active=false;
  if(tiltTarget){tilt??={ax:0,ay:0};const f=Math.min(1,dt/80);tilt.ax+=(tiltTarget.ax-tilt.ax)*f;tilt.ay+=(tiltTarget.ay-tilt.ay)*f}else tilt=null;
  if(bodies.some(b=>b.drag)||tilt)active=true;
  for(const b of bodies){if(b.drag||b.override)continue;
    if(tilt){
      // A tile on a tilted tray: static friction holds it at small angles; once moving, gravity keeps
      // accelerating it while kinetic friction takes off a constant amount, so it glides to a stop when levelled.
      const pull=Math.hypot(tilt.ax,tilt.ay),sp0=Math.hypot(b.vx,b.vy);
      if(sp0<.02&&pull<TILT_STATIC){b.vx=b.vy=0}
      else{
        b.vx+=tilt.ax*dt;b.vy+=tilt.ay*dt;
        const sp=Math.hypot(b.vx,b.vy),fr=TILT_KINETIC*dt;
        if(sp<=fr){b.vx=b.vy=0}else{const k=(sp-fr)/sp,cap=Math.min(1,.55/(sp-fr));b.vx*=k*cap;b.vy*=k*cap}
      }
    }
    b.x+=b.vx*dt;b.y+=b.vy*dt;b.angle+=b.spin*dt;
    if(!tilt){b.vx*=Math.pow(.91,dt/16);b.vy*=Math.pow(.91,dt/16)}b.spin*=Math.pow(.90,dt/16);b.rock=Math.max(0,b.rock-dt);keepOnDesk(b);if(tilt||Math.abs(b.vx)+Math.abs(b.vy)+Math.abs(b.spin)>.008||b.rock>0)active=true;else b.vx=b.vy=b.spin=0;}
  // A few relaxation passes so tiles piled into a corner (tilt, shoves) still end up side by side.
  for(let pass=0;pass<(tilt?4:1);pass++)for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++){
    // Tiles never rest on top of each other: overlaps ease apart, and a carried tile nudges others aside.
    // Distance is measured with the vertical squashed, since the tiles lie flat in perspective.
    const a=bodies[i],b=bodies[j];if(a.override||b.override)continue;
    const dx=b.x-a.x,dy=(b.y-a.y)/.8,d=Math.hypot(dx,dy)||.01,r=(a.el.offsetWidth+b.el.offsetWidth)*.5;
    if(d<r-1){
      const nx=dx/d,ny=dy/d,pen=r-d,wa=a.drag?0:b.drag?1:.5,wb=1-wa,ease=Math.min(1,pen*.35+.5);
      a.x-=nx*pen*wa*ease;a.y-=ny*pen*.8*wa*ease;b.x+=nx*pen*wb*ease;b.y+=ny*pen*.8*wb*ease;
      const rel=(a.vx-b.vx)*nx+(a.vy-b.vy)*ny;if(rel>0&&!a.drag&&!b.drag){a.vx-=rel*nx*.7;a.vy-=rel*ny*.7;b.vx+=rel*nx*.7;b.vy+=rel*ny*.7;b.rock=300}
      if(!a.drag)keepOnDesk(a);if(!b.drag)keepOnDesk(b);
      if(pen>1.5)active=true;
    }
  }
  bodies.forEach(paintBody);physicsFrame=active?requestAnimationFrame(physics):0;
}
function startPhysics(){if(!physicsFrame){lastFrame=performance.now();physicsFrame=requestAnimationFrame(physics)}}
for(const b of bodies){
  let pointer=null,moved=false,startX=0,startY=0,originX=0,originY=0,lastX=0,lastY=0,lastTime=0,edgeDir=0,edgeFrame=0;
  const edgeStep=()=>{
    edgeFrame=0;if(!b.drag||!edgeDir)return;
    const before=roomPan;panBy(edgeDir*7);const shift=roomPan-before;
    if(shift){originX-=shift;b.x-=shift;keepOnDesk(b);paintBody(b)}
    edgeFrame=requestAnimationFrame(edgeStep);
  };
  b.el.addEventListener('pointerdown',e=>{
    if(e.button!==0||pointer!==null||document.body.classList.contains('desk-tidy'))return;
    if(b.override){[b.x,b.y]=[b.override.x,b.override.y];b.pullOut=true}
    delete b.el.dataset.suppressClick;pointer=e.pointerId;moved=false;startX=e.clientX;startY=e.clientY;originX=b.x;originY=b.y;lastX=b.x;lastY=b.y;lastTime=performance.now();b.vx=b.vy=b.spin=b.rock=0;
    b.el.setPointerCapture(pointer);
  });
  b.el.addEventListener('pointermove',e=>{
    if(e.pointerId!==pointer||document.body.classList.contains('desk-tidy'))return;
    const dx=e.clientX-startX,dy=e.clientY-startY;if(!moved&&Math.hypot(dx,dy)<7)return;
    if(!moved){if(b.pullOut){b.override=null;b.angle=b.p.a;window.dispatchEvent(new CustomEvent('tile-unstored',{detail:b}))}document.body.classList.add('is-carrying')}
    moved=true;b.drag=true;startPhysics();b.el.classList.add('dragging');b.el.dataset.suppressClick='true';
    const zone=dropZones.find(z=>z.contains(e.clientX,e.clientY));dropZones.forEach(z=>z.el.classList.toggle('is-drop-hover',z===zone));
    const scale=desk.getBoundingClientRect().width/desk.clientWidth;
    b.x=originX+dx/scale;b.y=originY+dy/scale;keepOnDesk(b);
    // Phones: holding a tile near the screen edge scrolls the room along with it.
    edgeDir=smallScreen.matches&&panBy?(e.clientX<44?1:e.clientX>innerWidth-44?-1:0):0;
    if(edgeDir&&!edgeFrame)edgeFrame=requestAnimationFrame(edgeStep);
    const now=performance.now(),dt=Math.max(8,now-lastTime);b.vx=Math.max(-.7,Math.min(.7,(b.x-lastX)/dt));b.vy=Math.max(-.7,Math.min(.7,(b.y-lastY)/dt));lastX=b.x;lastY=b.y;lastTime=now;paintBody(b);
  });
  function finish(e,cancelled=false){
    if(e.pointerId!==pointer)return;pointer=null;b.pullOut=false;b.drag=false;edgeDir=0;b.el.classList.remove('dragging');
    startPhysics();
    if(moved){document.body.classList.remove('is-carrying');const zone=!cancelled&&dropZones.find(z=>z.el.classList.contains('is-drop-hover'));dropZones.forEach(z=>z.el.classList.remove('is-drop-hover'));
      if(zone){b.el.dataset.suppressClick='true';setTimeout(()=>{delete b.el.dataset.suppressClick},400);b.vx=b.vy=0;zone.drop(b);return}}
    if(moved){b.el.dataset.suppressClick='true';setTimeout(()=>{delete b.el.dataset.suppressClick},400);if(cancelled||reducedMotion.matches){b.vx=b.vy=0;}else{if(performance.now()-lastTime>90)b.vx=b.vy=0;b.spin=b.vx*.035;b.rock=520;startPhysics();}}
    paintBody(b);
  }
  b.el.addEventListener('pointerup',e=>finish(e));b.el.addEventListener('pointercancel',e=>finish(e,true));b.el.addEventListener('lostpointercapture',e=>finish(e,true));
}
let resizeFrame=0;window.addEventListener('resize',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(resetLayout)});
resetLayout();

// Fit the terminal onto the drawn laptop window, whose corners are skewed in the illustration.
// Corners are in background-image pixels (1536×1024): TL, TR, BR, BL.
const laptop=document.querySelector('.laptop-link');
const screenQuad=[[474,348],[842,338],[863,539],[486,550]];
function solve(A,b){const n=b.length;for(let i=0;i<n;i++){let m=i;for(let r=i+1;r<n;r++)if(Math.abs(A[r][i])>Math.abs(A[m][i]))m=r;[A[i],A[m]]=[A[m],A[i]];[b[i],b[m]]=[b[m],b[i]];for(let r=i+1;r<n;r++){const f=A[r][i]/A[i][i];for(let c=i;c<n;c++)A[r][c]-=f*A[i][c];b[r]-=f*b[i];}}const x=Array(n);for(let i=n-1;i>=0;i--){let s=b[i];for(let c=i+1;c<n;c++)s-=A[i][c]*x[c];x[i]=s/A[i][i];}return x}
function fitLaptop(){
  if(!laptop||!laptop.offsetParent)return;
  const k=scene.offsetWidth/1536,w=400,h=216;
  const src=[[0,0],[w,0],[w,h],[0,h]],dst=screenQuad.map(([x,y])=>[x*k,y*k]);
  const A=[],b=[];
  src.forEach(([x,y],i)=>{const[u,v]=dst[i];A.push([x,y,1,0,0,0,-u*x,-u*y]);b.push(u);A.push([0,0,0,x,y,1,-v*x,-v*y]);b.push(v);});
  const[a,c,e,d,f,g,p,q]=solve(A,b);
  laptop.style.cssText=`left:0;top:0;width:${w}px;height:${h}px;transform-origin:0 0;transform:matrix3d(${a},${d},0,${p},${c},${f},0,${q},0,0,1,0,${e},${g},0,1)`;
}
window.addEventListener('resize',fitLaptop);fitLaptop();
