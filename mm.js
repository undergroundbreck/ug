/* PHONE MENU DRILL-DOWN (11/21/26, Austin: "the mobile menus don't work great"). Shared by UG (hd.js) and SMS (sms/speed.js) through window.__MM_CFG.
   (1) Shop tiles in the phone menu that have subcategories open an in-menu list (Shop all + each subcategory, with its own sub-links) instead of jumping straight to the top category. Tiles without subcategories, Gift Cards, Sale and Brands still go straight to their page.
   (2) The CATALOG button under the header opens this same menu at the Shop section (UG's Ecwid catalog panel ignored taps on category names; SMS's jumped to the full catalog page).
   (3) Bigger tap target on the menu button; SMS call/directions buttons sit on their own row.
   Categories come from the public store API (all pages), cached for 30 minutes in sessionStorage. */
!function(){if(window.__mmX)return;window.__mmX=1;var C=window.__MM_CFG;if(!C)return;var D=document,P=C.pfx,CATS=null,BY=null,KIDS=null,q=0;
var css='.'+P+'__g>a.mmx-has{cursor:pointer}.'+P+'__g>a.mmx-open{border-color:'+C.accent+'!important}.'+P+'__g>a.mmx-open svg,.'+P+'__g>a.mmx-open::after{transform:rotate(90deg)}'+
'.mmx-p{grid-column:1/-1;background:#161616;border-left:3px solid '+C.accent+';padding:6px 0 10px;margin:0 0 2px;font-family:inherit}'+
'.mmx-p a{display:flex;align-items:center;min-height:44px;padding:0 16px;color:#fff!important;text-decoration:none!important;font-size:15px;font-weight:600;line-height:1.25;border:0!important;background:none!important;letter-spacing:0;text-transform:none}'+
'.mmx-p a:active,.mmx-p a:hover{color:'+C.accent+'!important}.mmx-p .mmx-all{color:'+C.accent+'!important;font-weight:700;text-transform:uppercase;letter-spacing:.08em;font-size:13px}'+
'.mmx-p .mmx-sub{display:flex;flex-wrap:wrap;gap:0 4px;padding:0 16px 6px 28px;margin-top:-6px}.mmx-p .mmx-sub a{min-height:38px;padding:0 10px 0 0;font-size:14px;font-weight:500;color:#cfcfcf!important}'+
'.mmx-p .mmx-two{display:grid;grid-template-columns:1fr 1fr}.mmx-p .mmx-sub a::after,.mmx-p .mmx-sub a svg,.mmx-p .mmx-all::after,.mmx-p .mmx-all svg{display:none!important}'+
(C.bigToggle?'#ec-instantsite .mobile-header__menu-toggle{box-sizing:content-box!important;padding:10px!important;margin:-10px!important}':'')+
(C.btnRow?'html body .fullscreen-overlay .'+P+'__f{display:block!important}html body .fullscreen-overlay .'+P+'__f b{display:block!important;margin:0 0 6px!important}#ecwid_body .fullscreen-overlay .'+P+'__btns{display:grid!important;grid-template-columns:1fr 1fr!important;gap:10px!important;width:100%!important;margin:16px 0 0!important;padding:0!important;max-width:none!important}#ecwid_body .fullscreen-overlay .'+P+'__btns a{display:flex!important;align-items:center!important;justify-content:center!important;min-height:48px!important;margin:0!important;width:auto!important;padding:0 8px!important}':'')+
(C.hideNavBtns?'html body .mobile-site-menu__content .navigation-menu__item:has(> .navigation-menu__button){display:none!important}':'');
var st=D.createElement("style");st.textContent=css;D.head.appendChild(st);
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function slug(h){var m=String(h||"").match(/\/products\/([^/?#]+)/);return m?m[1]:""}
function path(u){return String(u||"").replace(/^https?:\/\/[^\/]+/,"")}
function load(cb){if(CATS)return cb();var k="__mmx"+C.sid;try{var c=JSON.parse(sessionStorage.getItem(k)||"null");if(c&&Date.now()-c.t<18e5){set(c.i);return cb()}}catch(e){}
var all=[];(function pg(o){fetch("https://app.ecwid.com/api/v3/"+C.sid+"/categories?token="+C.tok+"&limit=100&offset="+o+"&responseFields=total,items(id,parentId,name,url,orderBy,enabled)").then(function(r){return r.json()}).then(function(j){all=all.concat(j.items||[]);if(o+100<(j.total||0))pg(o+100);else{set(all);try{sessionStorage.setItem(k,JSON.stringify({t:Date.now(),i:all}))}catch(e){}cb()}}).catch(function(){})})(0)}
function set(a){CATS=a.filter(function(x){return x.enabled!==false});BY={};KIDS={};CATS.forEach(function(x){BY[slug(x.url)]=x;(KIDS[x.parentId||0]=KIDS[x.parentId||0]||[]).push(x)});Object.keys(KIDS).forEach(function(k){KIDS[k].sort(function(a,b){return(a.orderBy||0)-(b.orderBy||0)})})}
function kids(c){var k=(KIDS[c.id]||[]).slice();var ex=(C.extra||{})[slug(c.url)]||[];ex.forEach(function(s){BY[s]&&k.push(BY[s])});return k}
function panel(a,c,label){var ks=kids(c),h='<a class="mmx-all" href="'+esc(path(a.getAttribute("href")))+'">Shop all '+esc(label)+' &rarr;</a>',simple=ks.every(function(x){return!(KIDS[x.id]||[]).length});
if(simple){h+='<div class="mmx-two">'+ks.map(function(x){return'<a href="'+esc(path(x.url))+'">'+esc(x.name)+'</a>'}).join("")+'</div>'}
else ks.forEach(function(x){var g=KIDS[x.id]||[];h+='<a href="'+esc(path(x.url))+'">'+esc(x.name)+'</a>';if(g.length)h+='<div class="mmx-sub">'+g.map(function(y){return'<a href="'+esc(path(y.url))+'">'+esc(y.name)+'</a>'}).join("")+'</div>'});
var p=D.createElement("div");p.className="mmx-p";p.innerHTML=h;return p}
function solo(g){var ts=[].slice.call(g.querySelectorAll(":scope>a"));ts.forEach(function(a,i){if(a.__mmxSolo||/is-gift/.test(a.className))return;var nx=ts[i+1],pv=ts[i-1];var left=!pv||pv.offsetTop<a.offsetTop-5;var alone=left&&(!nx||nx.offsetTop>a.offsetTop+5);if(alone&&a.offsetWidth<g.offsetWidth*.75){a.__mmxSolo=1;a.style.gridColumn="1 / -1"}})}
function wire(){var g=D.querySelector("."+P+"__g");if(!g||!CATS)return;solo(g);[].forEach.call(g.querySelectorAll(":scope>a"),function(a){if(a.__mmx)return;a.__mmx=1;if(/is-gift|is-sale/.test(a.className))return;var s=slug(a.getAttribute("href")),c=BY[s];if(!c||C.skip&&C.skip.indexOf(s)>=0||!kids(c).length)return;a.classList.add("mmx-has");a.setAttribute("aria-expanded","false");
a.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();var open=g.querySelector(".mmx-p"),was=a.classList.contains("mmx-open");if(open)open.remove();[].forEach.call(g.querySelectorAll(".mmx-open"),function(x){x.classList.remove("mmx-open");x.setAttribute("aria-expanded","false")});if(was)return;
var tiles=[].slice.call(g.querySelectorAll(":scope>a")),i=tiles.indexOf(a),cols=getComputedStyle(g).gridTemplateColumns.split(" ").length||2,row=Math.floor(i/cols),last=tiles[Math.min(tiles.length-1,row*cols+cols-1)];
var wide=a.offsetWidth>g.offsetWidth*.75;var after=wide?a:last;for(var j=i+1;j<tiles.length&&!wide;j++){if(tiles[j].offsetTop>a.offsetTop+5){after=tiles[j-1];break}after=tiles[j]}
var p=panel(a,c,a.textContent.trim());after.parentNode.insertBefore(p,after.nextSibling);a.classList.add("mmx-open");a.setAttribute("aria-expanded","true")},!0)})}
function openShop(){var t=D.querySelector(".mobile-header__menu-toggle");if(!t)return 0;t.click();var n=0;(function w(){var h=D.querySelector("."+P+"__h"),g=D.querySelector("."+P+"__g");if(!g&&n++<30)return setTimeout(w,100);h&&h.scrollIntoView&&h.scrollIntoView({block:"start"})})();return 1}
function soon(){var n=0;(function w(){if(D.querySelector("."+P+"__g")){load(wire);setTimeout(wire,700);setTimeout(wire,1600);return}if(n++<30)setTimeout(w,100)})()}
/* page-wide listener instead of a page-wide watcher (speed): only reacts to taps on the two header buttons */
D.addEventListener("click",function(e){var el=e.target&&e.target.closest&&e.target.closest(".mobile-header__catalog-btn, .mobile-header__menu-toggle");if(!el)return;if(el.classList.contains("mobile-header__catalog-btn")){if(openShop()){e.preventDefault();e.stopImmediatePropagation();soon()}}else soon()},!0);
setTimeout(function(){load(function(){})},2500)}();
