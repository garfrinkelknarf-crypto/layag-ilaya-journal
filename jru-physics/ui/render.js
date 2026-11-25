(function(K,B){
var css=`
*{box-sizing:border-box}html,body{overflow:hidden}body{margin:0;padding:2px 2px 10px;font-family:Arial,Helvetica,sans-serif;color:#1b2a41;line-height:1.5}
.card{border-radius:16px;overflow:hidden;border:1px solid #d7e0ee;background:#fff}
.hero{position:relative;color:#fff;padding:20px 22px 18px;background:linear-gradient(135deg,#002660 0%,#0b3d91 62%,#0b7a3e 150%)}
.hero.r{background:linear-gradient(135deg,#002660 0%,#0b3d91 55%,#8e1b1b 160%)}
.hero svg{position:absolute;right:-60px;top:-20px;height:140%;opacity:.16;pointer-events:none}
.steps{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;position:relative}
.st{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:4px 11px;font-size:11px;font-weight:700;letter-spacing:.04em;background:rgba(255,255,255,.1);color:#b9c9ea;border:1px solid rgba(255,255,255,.18)}
.st i{width:16px;height:16px;border-radius:50%;background:rgba(255,255,255,.2);display:inline-flex;align-items:center;justify-content:center;font-style:normal;font-size:10px}
.st.on{background:#fff;color:#002660;border-color:#fff}.st.on.g i{background:#1E8E3E;color:#fff}.st.on.r i{background:#C62828;color:#fff}
.kick{color:#F2B600;font-weight:700;font-size:12px;letter-spacing:.14em;position:relative}
h1{margin:4px 0 2px;font-size:25px;line-height:1.15;position:relative}
.top{color:#cfdcf5;font-size:13px;position:relative}
.chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px;position:relative}
.chip{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.28);border-radius:8px;padding:3px 10px;font-size:12px;font-weight:700}
.chip.clo{background:#F2B600;color:#002660;border-color:#F2B600}
.body{padding:14px 20px 16px;background:#f4f7fb}
.key{display:inline-flex;align-items:center;gap:8px;border-radius:999px;padding:4px 12px;font-size:12px;font-weight:700;margin-bottom:10px}
.key i{width:9px;height:9px;border-radius:50%}
.key.g{background:#E6F4EA;color:#0B5A26;border:1px solid #1E8E3E}.key.g i{background:#1E8E3E}
.key.r{background:#FDECEA;color:#8C1D18;border:1px solid #e9a29d}.key.r i{background:#C62828}
ol{margin:0;padding:0;list-style:none;counter-reset:s}
li{counter-increment:s;display:flex;gap:10px;margin:0 0 8px;font-size:14px}
li:before{content:counter(s);flex:0 0 22px;height:22px;border-radius:50%;background:#002660;color:#F2B600;font-weight:700;font-size:12px;display:flex;align-items:center;justify-content:center;margin-top:1px}
.cov{margin-top:6px;font-size:12px;color:#51657f}
.next{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;padding:14px 18px;border-radius:16px;border:1px solid #d7e0ee;background:#fff;border-left:6px solid #1E8E3E}
.next.r{border-left-color:#C62828}
.next small{display:block;font-size:11px;font-weight:700;letter-spacing:.1em;color:#0B7A3E}.next.r small{color:#8C1D18}
.next b{font-size:16px;color:#002660}
.btn{display:inline-block;text-decoration:none;font-weight:700;font-size:14px;padding:10px 18px;border-radius:10px;background:#002660;color:#fff}
.btn:hover{background:#0b3d91}
`;
var atom='<svg viewBox="0 0 200 200" fill="none" stroke="#F2B600" stroke-width="2"><ellipse cx="100" cy="100" rx="80" ry="28"/><ellipse cx="100" cy="100" rx="80" ry="28" transform="rotate(60 100 100)"/><ellipse cx="100" cy="100" rx="80" ry="28" transform="rotate(120 100 100)"/><circle cx="100" cy="100" r="8" fill="#F2B600"/></svg>';
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function draw(D,mode){
 var p=D.pages[K],T=p.type,red=T!=='lesson',cls=red?'r':'g';
 var names={lesson:'Lesson',activity:'Activity',quiz:'Quiz'},order=['lesson','activity','quiz'];
 var html='<style>'+css+'</style>';
 if(mode==='next'){
  var n=p.next;html+='<div class="next '+(n.type==='lesson'?'':'r')+'"><div><small>NEXT STEP</small><b>'+esc(n.label)+'</b></div><a class="btn" target="_top" href="'+D.base+n.slug+'/">Continue →</a></div>';
  return html}
 html+='<div class="card"><div class="hero '+cls+'">'+atom+'<div class="steps">'+order.map(function(o,i){var on=o===T;return '<span class="st'+(on?' on '+(o==='lesson'?'g':'r'):'')+'"><i>'+(i+1)+'</i>'+names[o]+'</span>'}).join('')+'</div>';
 html+='<div class="kick">WEEK '+p.week+' · '+names[T].toUpperCase()+'</div><h1>'+esc(p.title)+'</h1><div class="top">'+esc(p.topic)+'</div>';
 html+='<div class="chips"><span class="chip clo" title="'+esc(D.clo[p.clo])+'">'+p.clo.toUpperCase()+'</span>'+p.chips.map(function(c){return '<span class="chip">'+esc(c)+'</span>'}).join('')+'</div></div>';
 html+='<div class="body"><span class="key '+cls+'"><i></i>'+(red?'RED = you answer or do this':'GREEN = slides and discussion')+'</span><ol>'+p.steps.map(function(s){return '<li>'+esc(s)+'</li>'}).join('')+'</ol>'+(p.covers?'<div class="cov">Covers: '+esc(p.covers)+'</div>':'')+'</div></div>';
 return html}
var mode=(window.__MODE||'head');
fetch(B+'data.json?v='+Date.now()).then(function(r){return r.json()}).then(function(D){document.body.innerHTML=draw(D,mode);[60,300,900,2000].forEach(function(ms){setTimeout(function(){window.dispatchEvent(new Event('resize'));window.dispatchEvent(new Event('load'))},ms)})}).catch(function(){document.body.innerHTML='<p style="font-family:Arial;color:#51657f">Loading…</p>'});
})(window.__K,'https://raw.githubusercontent.com/garfrinkelknarf-crypto/layag-ilaya-journal/main/jru-physics/ui/');
