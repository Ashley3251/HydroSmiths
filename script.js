/* ---------- IMAGE SOURCES ----------
   Files expected in repo root (same level as index.html):
   - before1.jpg
   - after1.jpg
   - beforeandafter.jpg
   Add more as needed.
*/
const galleries = {
  patio: [
    "./before1.jpg",        // BEFORE first
    "./after1.jpg",         // AFTER second
    "./beforeandafter.jpg", // extra
  ],
  driveway: [],
  wall: [],
  roof: []
};

/* ---------- RENDER HELPERS ---------- */
function addImage(src, container, galleryKey, index){
  const img = document.createElement('img');
  img.loading = "lazy";
  img.alt = "HydroSmiths job photo";
  img.src = src;
  img.onerror = () => container.contains(img) && container.removeChild(img);
  img.addEventListener("click", () => openLightbox(galleryKey, index));
  container.appendChild(img);
}

function renderGallery(containerId, galleryKey){
  const el = document.getElementById(containerId);
  if(!el) return;
  const list = galleries[galleryKey] || [];
  if(list.length === 0){
    el.innerHTML = '<p style="opacity:.7">Photos coming soon.</p>';
    return;
  }
  list.forEach((src, i) => addImage(src, el, galleryKey, i));
}

/* ---------- LIGHTBOX (Next/Prev + Close + Esc + Arrow keys) ---------- */
let lb = { key: null, index: 0, overlay: null };

function openLightbox(galleryKey, startIndex=0){
  const list = galleries[galleryKey] || [];
  if(list.length === 0) return;

  lb.key = galleryKey;
  lb.index = startIndex;

  // lock background scroll
  document.body.classList.add('no-scroll');

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');

  const content = document.createElement('div');
  content.className = 'lightbox-content';

  const img = document.createElement('img');
  img.className = 'lightbox-image';

  const btnClose = document.createElement('button');
  btnClose.className = 'lightbox-close';
  btnClose.title = 'Close (Esc)';
  btnClose.addEventListener('click', closeLightbox);

  const btnPrev = document.createElement('button');
  btnPrev.className = 'lightbox-arrow lightbox-prev';
  btnPrev.title = 'Previous (Left Arrow)';
  btnPrev.addEventListener('click', (e)=>{ e.stopPropagation(); step(-1); });

  const btnNext = document.createElement('button');
  btnNext.className = 'lightbox-arrow lightbox-next';
  btnNext.title = 'Next (Right Arrow)';
  btnNext.addEventListener('click', (e)=>{ e.stopPropagation(); step(1); });

  content.appendChild(img);
  content.appendChild(btnClose);
  if(list.length > 1){
    content.appendChild(btnPrev);
    content.appendChild(btnNext);
  }
  overlay.appendChild(content);

  // Click backdrop closes
  overlay.addEventListener('click', closeLightbox);
  // Prevent click on image/content from closing
  content.addEventListener('click', e => e.stopPropagation());

  // Keyboard navigation
  function onKey(e){
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') step(-1);
    if(e.key === 'ArrowRight') step(1);
  }
  document.addEventListener('keydown', onKey);

  function step(delta){
    lb.index = (lb.index + delta + list.length) % list.length;
    img.src = list[lb.index];
  }

  function closeLightbox(){
    document.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', onKey);
    overlay.remove();
    lb.overlay = null;
  }

  // First image
  img.src = list[lb.index];

  lb.overlay = overlay;
  document.body.appendChild(overlay);
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderGallery('patio-grid', 'patio');
  renderGallery('driveway-grid', 'driveway');
  renderGallery('wall-grid', 'wall');
  renderGallery('roof-grid', 'roof');

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      if(id.length>1){
        e.preventDefault();
        document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});
