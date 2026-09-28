# Ahmed Alnagdy portfolio

A lightweight, responsive, bilingual portfolio built with semantic HTML, CSS, and JavaScript. No framework or package installation is needed. English is the default; visitors can switch to Arabic with full RTL layout. Their language and motion preferences are saved on their own device.

## Preview

Serve `dist` using any static web server. For example:

```sh
python -m http.server 4173 --directory dist
```

Open http://localhost:4173. Deploy the `dist` directory to any static hosting service.

## Content

- `dist/app.js`: translations and the eight project records.
- `dist/styles.css`: design, responsive layouts, animations, and reduced-motion support.
- `dist/gallery.css`: responsive project covers and galleries for Medcare, Quarto, Alopr, Ava, Skinalyze, and Nagah.
- `dist/assets/medcare/`: 14 unchanged user-supplied screenshots and the app icon board.
- `dist/assets/quarto/`: nine original PNGs, with optimized WebP display images and thumbnails.
- `dist/assets/alopr/`: six supplied flow boards encoded as WebP, plus lightweight thumbnails.
- `dist/index.html`: page structure, contact links, metadata.
- `dist/assets/ahmed-alnagdy.jpg`: supplied portrait.

Experience follows the user's corrections: five years, Baianat ending January 2026, ITI part-time from August 2025. The CV's older experience count was not reused. Medcare is presented alongside the other projects, with its healthcare features and technology stack verified against the local Medcare source project. Medcare includes all 14 supplied original images, a screenshot cover, and a bilingual gallery with thumbnails, previous/next controls, keyboard navigation, touch swipe, and in-gallery zoom. Quarto includes nine supplied screens, a desktop cover, a landscape gallery with pan-to-inspect zoom, and in-gallery magnification. Its gallery captions and description cover gaming rooms, café orders, billing, staff orders, and financial reporting. Alopr includes six flow boards covering doctor/follower and patient journeys, sign-in, onboarding, splash animation storyboards, and settings. Zoom allows panning across wide boards. The original-image action has been removed from all galleries. Ava includes two interface boards with six light/dark screens and neutral bilingual captions. Skinalyze includes two interface boards covering onboarding, photo upload, skin checks, history, and settings, with a sage-and-cream visual identity. Revised PNGs, optimized WebP images, and thumbnails are in dist/assets/ava/ and dist/assets/skinalyze/. The design-generation prompts and provenance are recorded in INTERFACE_PROMPTS.md. Remaining project cards use typography until their screenshots are supplied. Contact actions use email, WhatsApp, and the LinkedIn address from the CV; there is no form or backend.

Google Fonts is optional; local system fonts are used if unavailable. Motion respects the OS reduced-motion preference and has a footer pause control.



Nagah includes two generated interface boards (six screens) for home, map, reporting, report tracking, area insights, and admin review. Features were checked against D:/ngah. The current map implementation uses flutter_map with OpenStreetMap tiles; google_maps_flutter is declared but is not used by the map screen. Design prompts and provenance are in NAGAH_INTERFACE_PROMPTS.md. Stars, command symbols, decorative plus marks and navigation icons use inline SVG for consistent mobile rendering.
