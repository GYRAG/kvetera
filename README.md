<div align="center">

# კვეტერა — Kvetera

**The Fortress-City of the Duchy of Kvetera**

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

</div>

---

An immersive digital heritage experience dedicated to the ancient fortress-city of Kvetera — the administrative center of the Duchy of Kvetera, founded in the 7th–8th centuries in the highlands of Kakheti, Georgia. The site blends archival imagery, historical text, and modern web design to preserve and share the story of a fortress that once controlled the major caravan routes between the Caucasus.

> *"The name Kvetera-Kvetena, in Old Georgian, means 'uniter' or 'connector' — a buckle and clasp of peoples and civilizations."*
> — Academician N. Berdzenishvili

---

## Features

- Full **Georgian & English** bilingual support
- **Audio guide** narration (English)
- **Live weather** data from Akhmeta via Open-Meteo
- **Interactive timeline** and archival image gallery with lightbox
- **Hover glossary** for historical terms
- **Dark / Light** theme
- Print-optimized archive layout

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animation | Motion (Framer Motion) |
| Icons | Lucide React |
| Weather | Open-Meteo API |

---

## Getting Started

```bash
git clone https://github.com/GYRAG/kvetera.git
cd kvetera
npm install
npm run dev
```

Runs at `http://localhost:3000`. Copy `.env.example` to `.env.local` if you need the Gemini API key.

```bash
npm run build   # production bundle
```

---

## Project Structure

```
src/
├── assets/        # hero.jpeg, church.jpeg, architecture.jpeg, overview.jpeg
├── App.tsx        # main component — layout, state, interactions
├── content.ts     # all bilingual content (EN / KA)
├── index.css      # design tokens, print styles, light/dark theme
└── main.tsx
```

---

## Location

Kvetera Fortress sits west of Akhmeta, on the right bank of the Iltö River, Kakheti, Georgia.  
[View on Google Maps](https://share.google/ZsoEaD0G9amMauVA0)

---

## Credit

Historical content by **Historian Gogi Urgebashvili**.
