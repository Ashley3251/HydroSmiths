/* ---------- GALLERY SOURCES ----------
   Put your images in the repo root or /assets and list them here.
   The code hides any that 404 (so typos won’t break the page).
*/
const patioImages = [
  // your current files:
  "./after1.jpg",
  "./before1.jpg",
  "./beforeandafter.jpg",
  // If you add more later (recommended place: /assets/patios):
  // "./assets/patios/patio2.jpg",
  // "./assets/patios/patio3.jpg",
];

const drivewayImages = [
  // add driveway images here when you have them
  // "./assets/driveways/drive1.jpg",
];

const wallImages = [];
const roofImages = [];

/* ---------- RENDER HELPERS ---------- */
function addImage(src, container){
  const img = document.createElement('img');
  img.loading = "lazy";
  img.alt = "HydroSmiths job photo";
  img.src = src;
  img.onerror = () => container.removeChild(img); // hide missing/typo images
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
