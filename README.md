# UX Portfolio

React + Vite + Tailwind CSS v4 portfolio site.

## Run it

```bash
npm install
npm run dev      # local dev server at http://localhost:5173
npm run build    # production build into /dist
npm run preview  # serve the production build
```

## Make it yours

- **All text** (name, email, socials, projects, skills, experience) lives in `src/data/content.js`.
- **Hero photo**: `src/assets/hero.jpg`. Swap the file to change it; crop focus is set with the `object-[x%_y%]` classes in `src/components/Hero.jsx`.
- **Case-study thumbnails** are CSS mock-ups (`src/components/ProjectVisual.jsx`). Replace them with real screenshots and set `link` on each project to point at a case-study page or Behance post.
- **Résumé**: put `resume.pdf` in `/public` and set `resumeUrl: '/resume.pdf'`.
- **Colours & fonts** are theme tokens at the top of `src/index.css`.
