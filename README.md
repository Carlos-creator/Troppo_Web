# Troppo Web

Landing page para **Troppo** — 34.ª Feria de Software USM, 13 de noviembre de 2026.

> **Inteligencia que mueve el tráfico.**

---

## Stack

- **[Astro](https://astro.build)** — framework estático con islas de interactividad
- **Vanilla CSS scoped** por componente (sin framework de estilos)
- **TypeScript** para el tipado de props de componentes

---

## Estructura

```
Troppo_Web/
├── src/
│   ├── layouts/Base.astro           # Shell HTML, meta, fuentes
│   ├── pages/index.astro            # Landing page (ensambla componentes)
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Problem.astro
│   │   ├── Values.astro
│   │   ├── HowItWorks.astro
│   │   ├── Dashboard.astro
│   │   ├── Simulation.astro         # Isla interactiva (pendiente)
│   │   ├── Video.astro              # Placeholder pitch video
│   │   ├── Trust.astro              # Atributos técnicos
│   │   ├── Team.astro
│   │   ├── FinalCTA.astro
│   │   ├── Footer.astro
│   │   └── ScrollRoad.astro         # Isla interactiva (pendiente)
│   └── styles/global.css            # Variables de marca, reset, tipografía
├── public/
│   ├── images/logo/                 # Logos oficiales
│   ├── images/screenshots/          # Screenshots del dashboard (pendiente)
│   └── images/team/                 # Fotos del equipo (pendiente)
├── docs/
│   ├── IDEAS.md                     # Ideas de diseño y roadmap
│   └── reference/mockup-v0.html     # Mockup original preservado
├── ideas/                           # Assets internos (gitignored)
├── CLAUDE.md                        # Contexto del proyecto para Claude
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Setup local

Requiere Node.js 18+ (recomendado 20 LTS).

```bash
npm install
npm run dev
```

El sitio queda disponible en `http://localhost:4321`.

---

## Comandos

| Comando           | Qué hace                                       |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Levanta el servidor de desarrollo (hot reload) |
| `npm run build`   | Genera el sitio estático en `dist/`            |
| `npm run preview` | Sirve el build de producción localmente        |

---

## Roadmap del sitio

- **[docs/PLAN.md](docs/PLAN.md)** — pasos concretos, ubicación de assets, comandos de deploy
- **[docs/IDEAS.md](docs/IDEAS.md)** — visión, ideas de diseño y diferencias con la app real

Pendientes principales:

1. Simulación interactiva embebida (`src/components/Simulation.astro`)
2. Carretera animada de scroll (`src/components/ScrollRoad.astro`)
3. Integración de logos reales en el Header (actualmente usa SVG placeholder)
4. Video del pitch (`src/components/Video.astro`)
5. Fotos del equipo
6. Mapa real en `FinalCTA.astro`

---

## Créditos

Proyecto capstone INF360 · UTFSM · 2026-1. Ver equipo completo en la sección correspondiente del sitio.

**Autor del sitio web:** Carlos Ramírez Valdés — UI/UX Lead
