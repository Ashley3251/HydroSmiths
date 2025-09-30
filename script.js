/* ----- Simple smooth scroll for on-page links ----- */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if(id.length>1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

/* ----- GALLERIES ----- */
/* Add more images by pushing to these arrays (filenames in repo root). */
const galleries = {
  patio: [
    { src: "./before1.jpg",  caption: "Patio — Before" },
    { src: "./after1.jpg",   caption: "Patio — After"  },
    { src: "./beforeandafter.jpg", caption: "Patio — Clean finish" }
  ]
};

function renderGallery(id, items){
  const el = document.getElementById(id);
  if(!el) return;
  el.innerHTML = "";
  items.forEach((it, i)=>{
    const card = document.createElement('button');
    card.className = 'thumb';
    card.setAttribute('aria-label', it.caption || 'Work photo');
    card.innerHTML = `
      <img loading="lazy" src="${it.src}" alt="${it.caption || 'HydroSmiths work'}">
      ${i===0?'<span class="badge">Before</span>':''}
      ${i===1?'<span class="badge">After</span>':''}
    `;
    card.addEventListener('click', ()=>openLightbox(it.src, it.caption));
    el.appendChild(card);
  });
}

renderGallery('patio-gallery', galleries.patio);

/* ----- LIGHTBOX (zoom with ESC & Close button) ----- */
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('.lightbox-img');
const lbCap = lb.querySelector('.lightbox-caption');
const lbClose = lb.querySelector('.lightbox-close');

function openLightbox(src, cap){
  lbImg.src = src;
  lbCap.textContent = cap || '';
  lb.classList.add('open');
  lb.setAttribute('aria-hidden','false');
}
function closeLightbox(){
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden','true');
  lbImg.src = '';
  lbCap.textContent = '';
}
lbClose.addEventListener('click', closeLightbox);
lb.addEventListener('click', (e)=>{ if(e.target===lb) closeLightbox(); });
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeLightbox(); });
