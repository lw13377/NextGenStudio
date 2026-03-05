/* ── Template Data ── */
const templates = [
  {
    name: "Levant Restaurant",
    category: "Food & Restaurant",
    description: "Premium Levantine cuisine site with heritage storytelling, menu showcase, and online ordering.",
    screenshot: "assets/screenshots/fast-food.png",
    link: "https://newestfastfood.vercel.app/"
  },
  {
    name: "Luxe Nails",
    category: "Beauty",
    description: "Elegant nail salon site with service listings, gallery, booking system, and client testimonials.",
    screenshot: "assets/screenshots/nail-salon.png",
    link: "https://nail-salon-phi.vercel.app/"
  },
  {
    name: "Luminary Estates",
    category: "Real Estate",
    description: "Ultra-luxury real estate site with property search, listings grid, and agent profiles.",
    screenshot: "assets/screenshots/real-estate.png",
    link: "https://real-estate-icx66zd0w-lw13377s-projects.vercel.app/"
  },
  {
    name: "Photography",
    category: "Photography",
    description: "A striking portfolio template for photographers — bold imagery, clean galleries, and seamless browsing.",
    screenshot: "assets/screenshots/photography.png",
    link: "https://photographer-gules.vercel.app/"
  },
  {
    name: "Bright Smile Dental",
    category: "Healthcare",
    description: "Clean and welcoming dental practice site with services, team profiles, and appointment booking.",
    screenshot: "assets/screenshots/dentist.png",
    link: "https://bright-smile-dental-five.vercel.app/"
  },
  {
    name: "Baked Bliss",
    category: "Bakery & Cafe",
    description: "Artisan bakery site with warm gold aesthetics, bestseller showcases, and daily fresh bakes.",
    screenshot: "assets/screenshots/bakery-new.png",
    link: "https://better-bakery.vercel.app/"
  },
  {
    name: "BuildRight Construction",
    category: "Construction",
    description: "Bold construction company site showcasing projects, services, and client testimonials.",
    screenshot: "assets/screenshots/construction.png",
    link: "https://constuction-topaz.vercel.app/"
  },
  {
    name: "Prestige Law Firm",
    category: "Legal Services",
    description: "Professional law firm site with practice areas, attorney bios, and strong credibility design.",
    screenshot: "assets/screenshots/law-firm.png",
    link: "https://lawfirm-amber-eight.vercel.app/"
  },
  {
    name: "Wanderlust Travel",
    category: "Travel",
    description: "Stunning travel agency template with immersive imagery, destination guides, and trip booking.",
    screenshot: "assets/screenshots/travel.png",
    link: "https://newesttravel.vercel.app/"
  },
  {
    name: "Sunshine Daycare",
    category: "Childcare",
    description: "Warm and friendly daycare site with programs, enrollment info, and parent testimonials.",
    screenshot: "assets/screenshots/daycare.png",
    link: "https://daycare-vert.vercel.app/"
  }
];

/* ── Render Project Cards ── */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  templates.forEach(t => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-img">
        <img src="${t.screenshot}" alt="${t.name} template preview" loading="lazy" />
        <span class="project-tag">${t.category}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${t.name}</h3>
        <p class="project-desc">${t.description}</p>
        <a href="${t.link}" class="project-link" target="_blank" rel="noopener">
          View Live Site &rarr;
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}

renderProjects();

/* ── GSAP + ScrollTrigger Setup ── */
gsap.registerPlugin(ScrollTrigger);

/* ── Character Reveal Animation ── */
function charReveal(selector) {
  document.querySelectorAll(selector).forEach(el => {
    const split = new SplitType(el, { types: 'chars' });

    gsap.from(split.chars, {
      opacity: 0,
      y: 18,
      scale: 1.45,
      filter: 'blur(10px)',
      duration: 0.8,
      ease: 'power4.out',
      stagger: 0.03,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });
}

/* ── Fade Up Animation ── */
function fadeUp(selector) {
  document.querySelectorAll(selector).forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      filter: 'blur(6px)',
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true
      }
    });
  });
}

/* ── Card Stagger Animation ── */
function staggerCards(selector) {
  document.querySelectorAll(selector).forEach(grid => {
    const cards = grid.children;
    gsap.from(cards, {
      opacity: 0,
      y: 80,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: grid,
        start: 'top 85%',
        once: true
      }
    });
  });
}

/* ── Counter Animation ── */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);

    gsap.fromTo(el,
      { innerText: 0 },
      {
        innerText: target,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true
        }
      }
    );
  });
}

/* ── Initialize All Animations ── */
function initAnimations() {
  // Character reveals
  charReveal('.hero-title, .section-heading, .cta-heading');

  // Fade ups
  fadeUp('.hero-label, .hero-sub, .hero-ctas, .hero-badges, .section-label, .contact-sub');

  // Card staggers
  staggerCards('.features-grid, .services-grid, .projects-grid, .process-grid');

  // Counters
  animateCounters();
}

// Wait for fonts + SplitType to be ready
document.fonts.ready.then(() => {
  initAnimations();
});

/* ── Navbar Scroll Behavior ── */
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
})();

/* ── Smooth Scroll for Anchor Links ── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      // Close mobile menu if open
      const mobileMenu = document.querySelector('.mobile-menu');
      const hamburger = document.querySelector('.hamburger');
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }

      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();

/* ── Hamburger Menu Toggle ── */
(function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
})();

/* ── Book a Project — Gmail Compose ── */
function openBookingEmail() {
  const to = 'nextgenlabstudio@gmail.com';
  const subject = 'Project Inquiry — NextGenLab.studio';
  const body =
`Hello NextGenLab Team,

I'm interested in working with your studio on a new project. Below are my details:

Full Name:
Email:
Phone (optional):
Business / Brand Name:
Industry:
Project Type: [ New Website / Redesign / Template Customization ]
Preferred Template (if any):
Budget Range:
Timeline:

Additional Details:


Looking forward to hearing from you.

Best regards,`;

  const url = 'https://mail.google.com/mail/?view=cm&fs=1'
    + '&to=' + encodeURIComponent(to)
    + '&su=' + encodeURIComponent(subject)
    + '&body=' + encodeURIComponent(body);

  window.open(url, '_blank');
}
