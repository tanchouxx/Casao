(function(){
  var b=document.getElementById('burger'),m=document.getElementById('mnav');
  if(b&&m)b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o);b.textContent=o?'Fermer':'Menu'});
  document.querySelectorAll('.copy').forEach(function(btn){btn.addEventListener('click',function(){
    var t=btn.dataset.copy;
    navigator.clipboard.writeText(t).then(function(){btn.textContent='Copié';setTimeout(function(){btn.textContent='Copier'},1500)}).catch(function(){var r=document.createRange();r.selectNodeContents(btn.previousElementSibling);var s=getSelection();s.removeAllRanges();s.addRange(r)});
  })});
  var links=[].slice.call(document.querySelectorAll('.toc a'));
  if(links.length&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-30% 0px -60% 0px'});
    document.querySelectorAll('.secs section').forEach(function(s){io.observe(s)});
  }
})();
