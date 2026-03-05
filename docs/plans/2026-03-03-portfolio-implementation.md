# NextGenLab.studio Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page dark-studio portfolio site that showcases all NextGenLab.studio website templates with screenshots, descriptions, and live links.

**Architecture:** Single HTML page with vanilla CSS and JS. Templates are linked via relative paths (`../templatename/index.html`) for static sites. JS renders template cards dynamically from a data array, making future additions easy. Screenshots are taken with Playwright and stored in `/assets/screenshots/`.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), vanilla JavaScript (Intersection Observer for scroll animations), Playwright (screenshot capture only)

---

## Template Data Reference

| Name | Folder | Has index.html |
|------|--------|----------------|
| AI Website | `AI website` | yes |
| Futuristic | `Futuristic` | yes |
| Travel | `Travel` | yes |
| Bakery | `bakery` | yes |
| Better Bakery | `betterbakery` | yes |
| Fast Food Pro | `fast_food_pro` | yes |
| Lawyer | `lawyer` | yes |
| Modern Clothing | `modern_clothing` | yes |
| Nail Salon | `nail-salon` | NO (Next.js — needs deployed URL) |
| Restaurant | `restaurant` | NO (Node.js — needs deployed URL) |
| Child Care | `child-care` | NO (Node.js — needs deployed URL) |

Nail Salon, Restaurant, and Child Care will show cards but link to `#` with a "Coming Soon" badge until deployed URLs are available.

---

## Color & Design Tokens

```css
--bg:        #0D0F1A;
--surface:   #13162A;
--accent:    #C084FC;
--accent-glow: rgba(192, 132, 252, 0.25);
--text:      #F1F5F9;
--text-muted: #94A3B8;
--radius:    12px;
--font:      'Plus Jakarta Sans', sans-serif;
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/main.js`
- Create: `assets/screenshots/` (empty folder — screenshots added in Task 6)

**Step 1: Create folder structure**

```bash
mkdir -p assets/screenshots css js
touch css/style.css js/main.js
```

**Step 2: Create `index.html` skeleton**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NextGenLab.studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header id="hero"></header>
  <main id="templates"></main>
  <footer id="contact"></footer>
  <script src="js/main.js"></script>
</body>
</html>
```

**Step 3: Open in browser and verify blank dark page loads**

Open `index.html` in browser. Expect: blank page, no console errors.

**Step 4: Commit**

```bash
git init
git add index.html css/style.css js/main.js
git commit -m "feat: scaffold project structure"
```

---

## Task 2: CSS Foundation

**Files:**
- Modify: `css/style.css`

**Step 1: Write CSS reset + design tokens + base styles**

```css
/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── Tokens ── */
:root {
  --bg:           #0D0F1A;
  --surface:      #13162A;
  --accent:       #C084FC;
  --accent-glow:  rgba(192, 132, 252, 0.25);
  --text:         #F1F5F9;
  --text-muted:   #94A3B8;
  --radius:       12px;
  --font:         'Plus Jakarta Sans', sans-serif;
}

/* ── Base ── */
html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  line-height: 1.6;
  min-height: 100vh;
}

img { display: block; max-width: 100%; }

a { color: inherit; text-decoration: none; }
```

**Step 2: Verify in browser**

Expect: dark navy background, white text if you add a test `<p>` in index.html. Remove test `<p>` after.

**Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add CSS reset, tokens, and base styles"
```

---

## Task 3: Hero Section

**Files:**
- Modify: `index.html` (fill `<header id="hero">`)
- Modify: `css/style.css` (add hero styles)

**Step 1: Add hero HTML inside `<header id="hero">`**

```html
<header id="hero">
  <div class="hero-content">
    <div class="hero-badge">Web Studio</div>
    <h1 class="hero-title">NextGenLab<span class="accent">.</span>studio</h1>
    <p class="hero-sub">Modern websites, built for the next generation.</p>
    <a href="#templates" class="btn btn-primary">Browse Templates</a>
  </div>
</header>
```

**Step 2: Add hero CSS**

```css
/* ── Hero ── */
#hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(192,132,252,0.12), transparent);
}

.hero-content {
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.hero-badge {
  display: inline-block;
  padding: 0.3rem 1rem;
  border: 1px solid rgba(192,132,252,0.4);
  border-radius: 999px;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}

.hero-title {
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.accent { color: var(--accent); }

.hero-sub {
  font-size: 1.15rem;
  color: var(--text-muted);
  max-width: 480px;
}

/* ── Buttons ── */
.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: var(--accent);
  color: #0D0F1A;
}

.btn-primary:hover {
  background: #d8a4ff;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px var(--accent-glow);
}
```

**Step 3: Verify in browser**

Expect: full-screen hero with logo, tagline, and purple button. Clicking "Browse Templates" should smooth-scroll (to an empty section for now).

**Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add hero section"
```

---

## Task 4: Template Data Array

**Files:**
- Modify: `js/main.js`

**Step 1: Write the template data array**

```js
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
```

**Step 2: Verify data is accessible**

Add temporarily to bottom of `main.js`:
```js
console.log(templates.length); // should log 11
```
Open browser console and confirm. Remove the `console.log` after.

**Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add template data array"
```

---

## Task 5: Template Grid — HTML Rendering

**Files:**
- Modify: `index.html` (fill `<main id="templates">`)
- Modify: `js/main.js` (add render function)

**Step 1: Add section wrapper to `index.html`**

Replace `<main id="templates"></main>` with:

```html
<main id="templates">
  <div class="section-header">
    <h2>Our Templates</h2>
    <p class="section-sub">Click any template to see it live.</p>
  </div>
  <div class="grid" id="template-grid"></div>
</main>
```

**Step 2: Add render function to `js/main.js`** (after the data array)

```js
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
```

**Step 3: Verify in browser**

Expect: 11 cards rendered below the hero, images broken (screenshots not taken yet — that's Task 6), text and buttons visible.

**Step 4: Commit**

```bash
git add index.html js/main.js
git commit -m "feat: render template cards dynamically from data array"
```

---

## Task 6: Card Styles + Hover Effects

**Files:**
- Modify: `css/style.css`

**Step 1: Add grid and card CSS**

```css
/* ── Templates Section ── */
#templates {
  padding: 6rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.section-header h2 {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.section-sub {
  color: var(--text-muted);
  margin-top: 0.5rem;
  font-size: 1rem;
}

/* ── Grid ── */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
}

/* ── Card ── */
.card {
  background: var(--surface);
  border-radius: var(--radius);
  border: 1px solid rgba(255,255,255,0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px var(--accent-glow);
  border-color: rgba(192,132,252,0.3);
}

.card-img-wrap {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
  background: #0a0c18;
}

.card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.4s ease;
}

.card:hover .card-img-wrap img {
  transform: scale(1.03);
}

.badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(13,15,26,0.85);
  border: 1px solid rgba(192,132,252,0.4);
  color: var(--accent);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  backdrop-filter: blur(4px);
}

.card-body {
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
}

.card-desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.55;
  flex: 1;
}

.btn-outline {
  align-self: flex-start;
  padding: 0.55rem 1.25rem;
  border-radius: 999px;
  border: 1px solid rgba(192,132,252,0.5);
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-outline:hover {
  background: var(--accent);
  color: #0D0F1A;
  border-color: var(--accent);
}

.btn-outline.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
```

**Step 2: Verify in browser**

Expect: cards in 3-column grid, hover lifts card with violet glow, "Coming Soon" badge on 3 cards, images still broken.

**Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add card grid styles and hover effects"
```

---

## Task 7: Scroll Fade-In Animations

**Files:**
- Modify: `css/style.css` (add fade-in keyframe)
- Modify: `js/main.js` (add Intersection Observer)

**Step 1: Add fade-in CSS**

```css
/* ── Animations ── */
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Step 2: Add Intersection Observer to `js/main.js`** (after `renderTemplates()`)

```js
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
```

**Step 3: Verify in browser**

Scroll down past hero. Cards should fade in with a slight stagger. Refresh and scroll quickly — same effect.

**Step 4: Commit**

```bash
git add css/style.css js/main.js
git commit -m "feat: add scroll fade-in animation with Intersection Observer"
```

---

## Task 8: Footer / Contact Section

**Files:**
- Modify: `index.html` (fill `<footer id="contact">`)
- Modify: `css/style.css` (add footer styles)

**Step 1: Add footer HTML**

Replace `<footer id="contact"></footer>` with:

```html
<footer id="contact">
  <div class="footer-inner">
    <p class="footer-tagline">Want a website like these?</p>
    <h2 class="footer-heading">Let's build something great.</h2>
    <a href="mailto:your@email.com" class="btn btn-primary">Book Now</a>
    <p class="footer-copy">&copy; 2026 NextGenLab.studio &mdash; All rights reserved.</p>
  </div>
</footer>
```

> **Note:** Replace `your@email.com` with your actual email address.

**Step 2: Add footer CSS**

```css
/* ── Footer ── */
#contact {
  padding: 6rem 2rem;
  text-align: center;
  border-top: 1px solid rgba(255,255,255,0.06);
  background: radial-gradient(ellipse 60% 50% at 50% 100%, rgba(192,132,252,0.08), transparent);
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.footer-tagline {
  font-size: 0.9rem;
  color: var(--accent);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
}

.footer-heading {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.footer-copy {
  margin-top: 2rem;
  font-size: 0.8rem;
  color: var(--text-muted);
}
```

**Step 3: Verify in browser**

Expect: footer section with heading, "Book Now" button (clicking it opens email client). Subtle violet glow at the bottom.

**Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add footer with mailto contact CTA"
```

---

## Task 9: Responsive Design

**Files:**
- Modify: `css/style.css`

**Step 1: Add media queries at bottom of `style.css`**

```css
/* ── Responsive ── */
@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }

  #templates { padding: 4rem 1.25rem; }

  #contact { padding: 4rem 1.25rem; }
}
```

**Step 2: Verify in browser**

Use DevTools → toggle device toolbar. Check:
- Desktop (>1024px): 3 columns
- Tablet (640–1024px): 2 columns
- Mobile (<640px): 1 column, comfortable padding

**Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add responsive grid breakpoints"
```

---

## Task 10: Capture Template Screenshots

**Files:**
- Create: `assets/screenshots/*.png` (11 screenshots)

Screenshots are needed for the 8 static templates. The 3 non-static ones (nail-salon, restaurant, child-care) need their own screenshots — use existing images from their directories if available, or placeholder images.

**Step 1: Check for existing screenshot images**

```bash
ls ../nail-salon/*.png
ls ../restaurant/public/ 2>/dev/null || echo "no public dir"
```

**Step 2: Use Playwright to capture screenshots of static templates**

Run this Node.js script (save as `scripts/capture-screenshots.js`, then delete after use):

```js
const { chromium } = require('playwright');
const path = require('path');

const templates = [
  { name: 'ai-website',      path: '../AI website/index.html' },
  { name: 'futuristic',      path: '../Futuristic/index.html' },
  { name: 'travel',          path: '../Travel/index.html' },
  { name: 'bakery',          path: '../bakery/index.html' },
  { name: 'betterbakery',    path: '../betterbakery/index.html' },
  { name: 'fast-food-pro',   path: '../fast_food_pro/index.html' },
  { name: 'lawyer',          path: '../lawyer/index.html' },
  { name: 'modern-clothing', path: '../modern_clothing/index.html' },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  for (const t of templates) {
    const filePath = 'file://' + path.resolve(__dirname, '..', t.path);
    console.log(`Capturing: ${t.name}`);
    await page.goto(filePath, { waitUntil: 'networkidle' });
    await page.screenshot({
      path: `assets/screenshots/${t.name}.png`,
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
  }

  await browser.close();
  console.log('Done!');
})();
```

**Step 3: Install Playwright and run**

```bash
npm init -y
npm install playwright
node scripts/capture-screenshots.js
```

**Step 4: Handle non-static templates**

- `nail-salon`: copy `../nail-salon/homepage-full.png` → `assets/screenshots/nail-salon.png`
- `restaurant`: no screenshot available — create a 1440×900 placeholder (solid dark color with text)
- `child-care`: no screenshot available — same as above

For placeholders, use an online placeholder or this quick HTML-to-image workaround: take a manual screenshot of a simple dark card with the template name.

**Step 5: Verify in browser**

Refresh portfolio. All 8 static cards should now show real screenshots. 3 "Coming Soon" cards show placeholders.

**Step 6: Commit**

```bash
git add assets/screenshots/
git commit -m "feat: add template screenshots"
```

---

## Task 11: Final Polish + Review

**Files:**
- Modify: `index.html` — verify email address in mailto link
- Modify: `css/style.css` — any final tweaks

**Step 1: Check all links open correctly**

Click every "View Full Site →" button. Verify:
- 8 static templates open in a new tab
- 3 "Coming Soon" cards are not clickable

**Step 2: Check mailto**

Click "Book Now". Verify your email client opens with the correct address.

**Step 3: Check scrolling**

Click "Browse Templates" in the hero. Verify it smooth-scrolls to the template grid.

**Step 4: Check all text**

- Hero tagline reads correctly
- All 11 template names and descriptions match the data array
- Footer copyright year is 2026

**Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete NextGenLab.studio portfolio site"
```

---

## What's Next (Post-MVP)

- Add real deployed URLs for nail-salon, restaurant, child-care
- Replace `mailto:` with a contact form
- Consider deploying the portfolio itself to Vercel
