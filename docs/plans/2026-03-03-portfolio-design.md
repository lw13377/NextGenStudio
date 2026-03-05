# NextGenLab.studio — Portfolio Design Doc
**Date:** 2026-03-03

## Overview
A single-page portfolio website to showcase website templates built by NextGenLab.studio. Visitors can browse all templates, click through to live sites, and contact the owner for bookings.

## Brand
- **Name:** NextGenLab.studio
- **Tagline:** "Modern websites, built for the next generation."

## Visual Style
- **Concept:** Dark Studio / Agency
- **Background:** `#0D0F1A` (dark navy)
- **Card surface:** `#13162A` (slightly lighter navy)
- **Accent:** `#C084FC` (soft violet-purple)
- **Text:** White primary, soft gray secondary
- **Font:** Inter or Plus Jakarta Sans
- **Card hover:** violet glow + subtle lift (`box-shadow` + `translateY`)
- **Animations:** fade-in on scroll, smooth and subtle

## Page Structure (Single Page)

### 1. Hero
- Full-width, vertically centered
- Large wordmark: `NextGenLab.studio`
- Tagline beneath
- CTA button: scrolls to template grid

### 2. Template Grid
- Responsive: 3 cols desktop → 2 tablet → 1 mobile
- Each card contains:
  - Full screenshot image (top)
  - Template name
  - Short description
  - "View Full Site →" button (opens in new tab)
- Card hover: violet glow + slight lift

### 3. Footer / Contact
- Minimal dark footer
- Line: "Want a website like these? Get in touch."
- "Book Now" button → `mailto:` link

## Templates to Include
- AI website
- Futuristic
- Travel
- Bakery
- Better Bakery
- Fast Food Pro
- Lawyer
- Modern Clothing
- Nail Salon
- Restaurant
- Child Care

## Contact
- Method: `mailto:` link (booking form to be added later)

## Tech
- Plain HTML, CSS, JavaScript (no framework needed for this scope)
- Screenshots stored locally in `/assets/screenshots/`
