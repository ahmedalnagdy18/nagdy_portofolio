# Ahmed Alnagdy portfolio

A lightweight, responsive, bilingual portfolio built with semantic HTML, CSS, and JavaScript. No framework or package installation is needed. English is the default; visitors can switch to Arabic with full RTL layout. Their language and motion preferences are saved on their own device.

## Preview

Serve `dist` using any static web server. For example:

```sh
python -m http.server 4173 --directory dist
```

Open http://localhost:4173. Deploy the `dist` directory to any static hosting service.

## Content

- `dist/app.js`: translations and the seven project records.
- `dist/styles.css`: design, responsive layouts, animations, and reduced-motion support.
- `dist/index.html`: page structure, contact links, metadata.
- `dist/assets/ahmed-alnagdy.jpg`: supplied portrait.

Experience follows the user's corrections: five years, Baianat ending January 2026, ITI part-time from August 2025. The CV's older experience count was not reused. Medcare is presented alongside the other projects, with its healthcare features and technology stack verified against the local Medcare source project. Project cards use typography until actual project screenshots are supplied. Contact actions use email, WhatsApp, and the LinkedIn address from the CV; there is no form or backend.

Google Fonts is optional; local system fonts are used if unavailable. Motion respects the OS reduced-motion preference and has a footer pause control.
