const templates = [
  {
    name: "Photography",
    description: "A striking portfolio template for photographers — bold imagery, clean galleries, and seamless browsing.",
    screenshot: "assets/screenshots/photography.png",
    link: "https://photographer-gules.vercel.app/",
    available: true
  },
  {
    name: "Travel",
    description: "Stunning travel agency template with immersive imagery and destination booking sections.",
    screenshot: "assets/screenshots/travel.png",
    link: "../Travel/index.html",
    available: true
  },
  {
    name: "Bakery",
    description: "An elevated bakery experience with refined typography, menu pages, and smooth layouts.",
    screenshot: "assets/screenshots/bakery-new.png",
    link: "https://better-bakery.vercel.app/",
    available: true
  },
  {
    name: "Fast Food",
    description: "High-energy fast food template with bold visuals and a modern menu layout.",
    screenshot: "assets/screenshots/fast-food-pro.png",
    link: "../fast_food_pro/index.html",
    available: true
  },
  {
    name: "Law Firm",
    description: "Professional and trustworthy law firm site with clean structure and strong calls to action.",
    screenshot: "assets/screenshots/lawyer.png",
    link: "../lawyer/index.html",
    available: true
  },
  {
    name: "Fashion",
    description: "Minimalist fashion e-commerce layout with product grid and lookbook sections.",
    screenshot: "assets/screenshots/modern-clothing.png",
    link: "../modern_clothing/index.html",
    available: true
  },
  {
    name: "Nail Salon",
    description: "Elegant nail salon site with service listings, a gallery, and appointment booking.",
    screenshot: "assets/screenshots/nail-salon-new.png",
    link: "https://nail-salon-r6oa1705p-lw13377s-projects.vercel.app/",
    available: true
  },
  {
    name: "Real Estate",
    description: "Sleek real estate listing site with property search, listings grid, and agent profiles.",
    screenshot: "assets/screenshots/real-estate.png",
    link: "https://real-estate-beta-amber.vercel.app/",
    available: true
  },
  {
    name: "Dentist",
    description: "Clean and welcoming dental practice site with services, team profiles, and booking.",
    screenshot: "assets/screenshots/dentist.png",
    link: "https://bright-smile-dental-five.vercel.app/",
    available: true
  }
];

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function renderTemplates() {
  const grid = document.getElementById('template-grid');

  templates.forEach(t => {
    const card = document.createElement('article');
    card.className = 'card fade-in';

    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${t.screenshot}" alt="${escapeHtml(t.name)} template preview" loading="lazy" />
        ${!t.available ? '<span class="badge">Coming Soon</span>' : ''}
      </div>
      <div class="card-body">
        <h3 class="card-title">${escapeHtml(t.name)}</h3>
        <p class="card-desc">${escapeHtml(t.description)}</p>
        <a
          href="${t.link}"
          class="btn btn-outline${!t.available ? ' disabled' : ''}"
          ${t.available ? 'target="_blank" rel="noopener"' : 'aria-disabled="true" tabindex="-1"'}
        >
          View Full Site &rarr;
        </a>
      </div>
    `;

    grid.appendChild(card);
  });
}

renderTemplates();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 70);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
