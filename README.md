# Iryna Lopatina — Portfolio

Static portfolio built with **HTML + Tailwind CSS** and a small vanilla JS file. No inline styles, no hand-written CSS.

```
index.html           page markup (Tailwind classes only)
script.js            preloader counter, hero "look inside" lens, lens button states
tailwind.config.js   colors, fonts, keyframes/animations + a few small components (.chip, .handle, .crop, .nav-link, .reveal)
src/input.css        Tailwind entry (only the @tailwind directives)
css/tailwind.css     compiled CSS (committed, so the site works without a build)
assets/              images
favicon.ico
```

## Develop
```bash
npm install
npm run dev     # watches index.html / script.js and rebuilds css/tailwind.css
```

## Build
```bash
npm run build   # minified css/tailwind.css
```

## Deploy (Netlify)
- Build command: `npm run build`
- Publish directory: `.`

`css/tailwind.css` is committed too, so deploying without a build step also works.

The contact form is set up for Netlify Forms (`data-netlify="true"`).
