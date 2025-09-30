/* ---------- GALLERY SOURCES ----------
   Current patio files (repo root): before1.jpg, after1.jpg, beforeandafter.jpg
   Add more later by pushing to arrays (or move to /assets/... and update paths).
*/
const patioImages = [
  "./before1.jpg",        // BEFORE first
  "./after1.jpg",         // AFTER second
  "./beforeandafter.jpg", // extra
];

const drivewayImages = []; // add later
const wallImages = [];     // add later
const roofImages = [];     // add later

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

/* ---------- LIGHTBOX (smaller + close button + ESC) ---------- */
function openLightbox(src){
  // lock background scroll
  document.body.classList.add('no-scroll');

  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.setAttribute("role","dialog");
  overlay.setAttribute("aria-modal","true");

  const content = document.createElement("div");
  content.className = "lightbox-content";

  const img = document.createElement("img");
  img.src = src;
  img.alt = "Zoomed photo";

  const closeBtn = document.createElement("button");
  closeBtn.className = "lightbox-close";
  closeBtn.title = "Close (Esc)";
  closeBtn.addEventListener("click", close);

  content.appendChild(img);
  content.appendChild(closeBtn);
  overlay.appendChild(content);

  // clicking outside image closes
  overlay.addEventListener("click", e => {
    if (e.target === overlay) close();
  });

  // ESC to close
  function onKey(e){ if(e.key === "Escape") close(); }
  document.addEventListener("keydown", onKey);

  function close(){
    document.body.classList.remove('no-scroll');
    document.removeEventListener("keydown", onKey);
    overlay.remove();
  }

  document.body.appendChild(overlay);
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderGallery('patio-grid', patioImages);
  renderGallery('driveway-grid', drivewayImages);
  renderGallery('wall-grid', wallImages);
  renderGallery('roof-grid', roofImages);

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
