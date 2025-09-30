// Smooth in-page scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(id.length>1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// Carousel dot indicator
const car = document.querySelector('.carousel');
const dots = document.getElementById('dots');
if (car && dots) {
  const slides = [...car.querySelectorAll('.slide')];
  dots.innerHTML = slides.map(()=>'<span class="dot"></span>').join('');
  const dotEls = [...dots.querySelectorAll('.dot')];

  function mark() {
    let idx=0, min=Infinity;
    slides.forEach((s,i)=>{
      const r=s.getBoundingClientRect();
      const d=Math.abs(r.left - (window.innerWidth*0.05)); // left padding of carousel ~5%
      if(d<min){min=d; idx=i;}
    });
    dotEls.forEach((d,i)=>d.classList.toggle('active', i===idx));
  }
  car.addEventListener('scroll', mark, {passive:true});
  mark();
}
