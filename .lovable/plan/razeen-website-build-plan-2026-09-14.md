# Razeen Website Build Plan

## Goal

Build a responsive, premium industrial catalogue website for Razeen Building Material Trading LLC using the PRD’s blue-and-yellow design system and enquiry-first structure.

## Pages and experiences

- Shared responsive header, mobile menu, footer, and persistent mobile contact actions.
- Home page with product-led visual, category discovery, featured products, brand presentation, service reassurance, and quote prompt.
- Products catalogue with search and category filtering, plus category and product detail pages.
- Brands, About, Contact/Locations, and Request a Quote pages.
- Functional front-end enquiry forms, BOQ file selection, WhatsApp/call links, and clear success feedback.

## Design direction

- Manrope typography, deep Razeen blue, restrained yellow actions, white/neutral surfaces.
- Crisp borders, modest radii, minimal shadows, product-focused industrial imagery, and restrained motion.
- Responsive layouts validated at mobile, tablet, and desktop widths with accessible navigation, labels, focus states, and touch targets.

## Content and data

- Use clearly identified demonstration catalogue content because final products, brands, logo, branch details, and contact details were not supplied.
- Keep catalogue data structured for later replacement by a CMS and future commerce features.
- Do not invent unverified statistics, certifications, pricing, or market-leading claims.

## Technical details

- TanStack Start routes with unique metadata for every page.
- Reusable React components and centralized typed catalogue data.
- Semantic Tailwind v4 tokens in the global design system; existing button and form primitives for controls.
- Generated, licensed-for-project visual assets stored locally.
- No database or live form delivery in this stage; submissions remain an in-page demonstration until real contact details and Cloud storage are connected.

## Validation

- Check production compilation and lint/tests relevant to the work.
- Verify main pages and interactions in Chromium at 390px, 768px, and 1280px with screenshots and console checks.
