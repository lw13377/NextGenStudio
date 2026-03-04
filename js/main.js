const templates = [
  {
    name: "AI Website",
    description: "A sleek, futuristic landing page designed for AI products and SaaS tools.",
    screenshot: "assets/screenshots/ai-website.png",
    link: "../AI website/index.html",
    available: true
  },
  {
    name: "Futuristic",
    description: "Bold, neon-accented design perfect for tech brands and digital agencies.",
    screenshot: "assets/screenshots/futuristic.png",
    link: "../Futuristic/index.html",
    available: true
  },
  {
    name: "Travel",
    description: "Stunning travel agency template with immersive imagery and booking sections.",
    screenshot: "assets/screenshots/travel.png",
    link: "../Travel/index.html",
    available: true
  },
  {
    name: "Bakery",
    description: "Warm and inviting bakery site with menu, gallery, and contact pages.",
    screenshot: "assets/screenshots/bakery.png",
    link: "../bakery/index.html",
    available: true
  },
  {
    name: "Better Bakery",
    description: "An elevated bakery experience with refined typography and smooth layouts.",
    screenshot: "assets/screenshots/betterbakery.png",
    link: "../betterbakery/index.html",
    available: true
  },
  {
    name: "Fast Food Pro",
    description: "High-energy fast food template with bold visuals and a modern menu layout.",
    screenshot: "assets/screenshots/fast-food-pro.png",
    link: "../fast_food_pro/index.html",
    available: true
  },
  {
    name: "Lawyer",
    description: "Professional and trustworthy law firm site with clean structure and strong CTAs.",
    screenshot: "assets/screenshots/lawyer.png",
    link: "../lawyer/index.html",
    available: true
  },
  {
    name: "Modern Clothing",
    description: "Minimalist fashion e-commerce layout with product grid and lookbook sections.",
    screenshot: "assets/screenshots/modern-clothing.png",
    link: "../modern_clothing/index.html",
    available: true
  },
  {
    name: "Nail Salon",
    description: "Elegant nail salon site with service listings and appointment booking.",
    screenshot: "assets/screenshots/nail-salon.png",
    link: "#",
    available: false
  },
  {
    name: "Restaurant",
    description: "Full-featured restaurant site with menu, reservations, and atmosphere gallery.",
    screenshot: "assets/screenshots/restaurant.png",
    link: "#",
    available: false
  },
  {
    name: "Child Care",
    description: "Friendly and reassuring child care center site with enrollment and schedule info.",
    screenshot: "assets/screenshots/child-care.png",
    link: "#",
    available: false
  }
];

function renderTemplates() {
  const grid = document.getElementById('template-grid');

  templates.forEach(t => {
    const card = document.createElement('article');
    card.className = 'card fade-in';

    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${t.screenshot}" alt="${t.name} template preview" loading="lazy" />
        ${!t.available ? '<span class="badge">Coming Soon</span>' : ''}
      </div>
      <div class="card-body">
        <h3 class="card-title">${t.name}</h3>
        <p class="card-desc">${t.description}</p>
        <a
          href="${t.link}"
          class="btn btn-outline ${!t.available ? 'disabled' : ''}"
          ${t.available ? 'target="_blank" rel="noopener"' : 'aria-disabled="true"'}
        >
          View Full Site &rarr;
        </a>
      </div>
    `;

    grid.appendChild(card);
  });
}

renderTemplates();
