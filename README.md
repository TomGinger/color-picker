# Color Scheme Selector

A small web app that generates a color palette from a base color and a scheme
(monochrome, analogic, complement, triad, …) using [The Color API](https://www.thecolorapi.com/).

**Live demo:** https://tomginger.github.io/color-picker/

## Features

- Pick any base color and one of 8 color schemes
- Click a color (or its hex code) to copy it to the clipboard
- Dark mode – remembers your choice and respects the system setting
- Responsive layout for mobile

## Tech

Vanilla HTML, CSS and JavaScript, bundled with [Vite](https://vitejs.dev/).
The Color API is free and needs no API key.

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Deployment

Every push to `main` is built and deployed to GitHub Pages by
`.github/workflows/deploy.yml`.

---

Built as part of the [Scrimba](https://scrimba.com/) Frontend Developer Career Path.
