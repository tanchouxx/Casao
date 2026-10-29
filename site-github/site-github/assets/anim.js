/* Casao — animations légères : header au scroll, apparitions, compteurs. Respecte prefers-reduced-motion. */
(function(){
  var hd=document.querySelector('header');
  function onScroll(){if(hd)hd.classList.toggle('scrolled',window.scrollY>24)}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce||!('IntersectionObserver' in window))return;

  var sel=['.secs>section','.wrap>section','.keys>*','.proof','.post','.sv','.tier','.rcard','.ma','.tl','.w','.vals-g>div',
           '.how-g li','.mate','.scam','.ch','.photo-band','.faq details','.dur','.badge','.tile','.right','.towns li','.pr','.cta'];
  var els=[].slice.call(document.querySelectorAll(sel.join(',')));
  var vh=window.innerHeight;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -6% 0px'});
  var n=0;
  els.forEach(function(el){
    if(el.closest('.rv'))return;
    if(el.getBoundingClientRect().top>vh*0.95){el.classList.add('rv');el.style.transitionDelay=((n++%4)*80)+'ms';io.observe(el)}
  });

  // compteurs (chiffres clés)
  var nums=[].slice.call(document.querySelectorAll('.keys .n, .tier b, .dur .v, .co-main b'));
  var cio=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;cio.unobserve(e.target);
    var el=e.target,txt=el.textContent,m=txt.match(/^(\d+)(,(\d))?(.*)$/);if(!m)return;
    var end=parseFloat(m[1]+(m[3]?'.'+m[3]:'')),dec=m[3]?1:0,rest=m[4],t0=null;
    if(end<2||txt.length>14)return;
    function step(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/900),v=end*(1-Math.pow(1-k,3));
      el.textContent=v.toFixed(dec).replace('.',',')+rest;if(k<1)requestAnimationFrame(step);else el.textContent=txt}
    requestAnimationFrame(step);
  })},{threshold:.6});
  nums.forEach(function(n){cio.observe(n)});
})();
/* parallaxe douce des bandeaux photo */
(function(){
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var bands=[].slice.call(document.querySelectorAll('.photo-band'));if(!bands.length)return;
  var tick=false;
  function upd(){tick=false;var vh=innerHeight;bands.forEach(function(b){var r=b.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;var k=(r.top+r.height/2-vh/2)/vh;b.style.setProperty('--py',(k*-40).toFixed(1)+'px')})}
  window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});upd();
})();
