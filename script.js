/* ---------- GALLERY SOURCES ---------- */
const patioImages = [
  "./before1.jpg",       // show "before" first
  "./after1.jpg",        // then "after"
  "./beforeandafter.jpg" // extra photo
];

const drivewayImages = [];
const wallImages = [];
const roofImages = [];

/* ---------- RENDER HELPERS ---------- */
function addImage(src, container){
  const img = document.createElement('img');
  img.loading = "lazy";
  img.alt = "HydroSmiths job photo";
  img.src = src;
  img.onerror = () => container.removeChild(img);
  img.addEventListener("click", () => openLightbox(src)); // zoom on click
  container.appendChild(img);
}

function renderGallery(containerId, list){
  const el = document.getElementById(containerId);
  if(!el) return;
  if(!list || list.length === 0){
    el.innerHTML = '<p style="opacity:.7">Photos coming soon.</p>';
    return;
  }
  list.forEach(src => addImage(src, el));
}

/* ---------- LIGHTBOX ---------- */
function openLightbox(src){
  let overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.innerHTML = `
    <div class="lightbox-content">
      <img src="${src}" alt="Zoomed photo">
    </div>
  `;
  overlay.addEventListener("click", () => document.body.removeChild(overlay));
  document.body.appendChild(overlay);
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderGallery('patio-grid', patioImages);
  renderGallery('driveway-grid', drivewayImages);
  renderGallery('wall-grid', wallImages);
  renderGallery('roof-grid', roofImages);

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
