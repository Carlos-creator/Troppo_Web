# PLAN — Troppo Landing Page

Roadmap operativo del sitio web. Cada tarea incluye **qué falta**, **dónde va** y **cómo hacerlo**.

Complementa a [IDEAS.md](IDEAS.md) (visión y diseño) y al [README.md](../README.md) (stack).

---

## Índice

- [Estado actual](#estado-actual)
- [Fase 0 — Verificación](#fase-0--verificación)
- [Fase 1 — Quick wins visuales](#fase-1--quick-wins-visuales)
- [Fase 2 — Carretera de scroll](#fase-2--carretera-de-scroll)
- [Fase 3 — Contenido del equipo](#fase-3--contenido-del-equipo)
- [Fase 4 — Simulación interactiva](#fase-4--simulación-interactiva)
- [Guía de assets pendientes](#guía-de-assets-pendientes)
- [Deploy — dev y producción](#deploy--dev-y-producción)
- [Decisiones abiertas](#decisiones-abiertas)

---

## Estado actual

- ✅ Estructura Astro completa (12 componentes)
- ✅ Deploy automático en Vercel: [troppo-web-five.vercel.app](https://troppo-web-five.vercel.app/)
- ✅ Producción destino: VM con nginx (reverse proxy ya configurado)
- ✅ Logos oficiales copiados a `public/images/logo/`
- ⏳ Falta: contenido real (fotos, video, screenshot), interactividad, deploy en VM

---

## Fase 0 — Verificación

**Objetivo:** Confirmar que la migración a Astro no rompió nada visible.

- [ ] Correr `npm run dev` y navegar todas las secciones
- [ ] Comparar contra `docs/reference/mockup-v0.html` (abrir con doble clic en el navegador) para paridad visual
- [ ] Testear responsive (móvil desde DevTools + tablet)
- [ ] Verificar que Vercel deploy funciona bien
- [ ] Confirmar que las fuentes de Google (Fraunces + Montserrat) cargan correctamente

**Cuando termine esta fase:** el sitio es idéntico al mockup pero con estructura mantenible.

---

## Fase 1 — Quick wins visuales

**Objetivo:** Pulir presentación sin agregar interactividad. Todo esfuerzo bajo.

### 1.1 Logo real en el Header

**Archivo:** [src/components/Header.astro](../src/components/Header.astro)

Reemplazar el SVG placeholder de la brújula (líneas ~9-13) por:

```astro
<img
  src="/images/logo/medium-navy.png"
  alt="Troppo"
  class="logo-img"
  width="140"
/>
```

Y eliminar el `<span class="wordmark">TROPPO</span>` (el logo ya contiene el wordmark).

Ajustar CSS de `.logo-img` con `height: 40px; width: auto;`.

**Variantes disponibles en `public/images/logo/`:**
- `full-light.png` — logo grande para fondos claros
- `medium-navy.png` — mediano para fondos claros (Header)
- `medium-white.png` — mediano para fondos oscuros (Footer)
- `star-dark.png` / `star-light.png` — solo la brújula (favicon, decoración)

### 1.2 Favicon optimizado ✅

Generado con [realfavicongenerator.net](https://realfavicongenerator.net) a partir de `star-dark.png`.

Archivos en `public/favicon/`:
- `favicon.ico` — fallback universal
- `favicon.svg` — vectorial para navegadores modernos
- `favicon-96x96.png` — retina
- `apple-touch-icon.png` — 180×180 para iOS
- `web-app-manifest-192x192.png` / `web-app-manifest-512x512.png` — PWA
- `site.webmanifest` — configurado con nombre Troppo, tema navy `#044559`, idioma es-CL

Links en `Base.astro` referencian `/favicon/*` para todos los formatos.

### 1.3 Screenshot real del dashboard

**Archivo destino:** `public/images/screenshots/dashboard.png`

**Cómo obtenerlo:**
1. Pedirle a Baltazar/Cristian que corra el `sumo_v2` localmente
2. Tomar screenshot del **Visualizador 3D live** o del **Panel de comparación** — son los más impresionantes visualmente
3. Formato: PNG, ancho mínimo 1600px, sin barra de tareas del OS
4. Nombre sugerido: `dashboard-live-3d.png` o `dashboard-compare.png`

**Cómo integrarlo:** editar [src/components/Dashboard.astro](../src/components/Dashboard.astro), reemplazar el `.dash-panel` por:

```astro
<img
  src="/images/screenshots/dashboard-live-3d.png"
  alt="Panel de resultados de simulación"
  class="dash-screenshot"
/>
```

Y ajustar CSS de `.dash-screenshot` para que respete el border-radius del frame.

### 1.4 Mapa real (Google Maps) ✅

Implementado en `FinalCTA.astro` con embed simple por coordenadas:
`https://maps.google.com/maps?q=-33.4905109,-70.6190188&hl=es&z=17&output=embed`

Ubicación: USM Campus San Joaquín, Av. Vicuña Mackenna 3939. Altura 280px, filtro `saturate(0.85)` para armonizar con la paleta oscura del bloque.

**Si en el futuro quieres upgrade al embed oficial** (más control del zoom/vista inicial): ver sección original abajo.

---

### 1.4 (referencia) Cómo obtener embed oficial

**Archivo:** [src/components/FinalCTA.astro](../src/components/FinalCTA.astro)

Reemplazar el `<div class="map-box">` por:

```astro
<iframe
  class="map-embed"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.5!2d-70.6293!3d-33.6191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d10a3feefcfd%3A0x9d02fb5fcafd9fce!2sUniversidad%20T%C3%A9cnica%20Federico%20Santa%20Mar%C3%ADa%20-%20Campus%20San%20Joaqu%C3%ADn!5e0!3m2!1sen!2scl!4v1700000000000"
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="USM Campus San Joaquín"
></iframe>
```

**Cómo obtener el `src` exacto:**
1. Abrir [Google Maps](https://maps.google.com), buscar "USM Campus San Joaquín"
2. Click en **Compartir → Insertar mapa**
3. Copiar el atributo `src` del iframe que te dan

CSS del `.map-embed`: `width: 100%; height: 100%; border: 0; border-radius: 16px;`

### 1.5 Contadores animados

**Archivo:** [src/components/Problem.astro](../src/components/Problem.astro)

Los números 7.000 / 9 hrs / 800+ pueden animarse con IntersectionObserver cuando entren al viewport.

**Cómo hacerlo:**
1. Agregar `data-count-to="7000"` y `data-count-to="9"` y `data-count-to="800"` a los `.num`
2. Agregar `<script>` al final del componente Astro (no lleva `is:inline`, Astro lo procesa):

```astro
<script>
  const nums = document.querySelectorAll<HTMLElement>('.num[data-count-to]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target as HTMLElement;
      const target = Number(el.dataset.countTo);
      const duration = 1200;
      const start = performance.now();
      const original = el.textContent;
      const suffix = original?.replace(/[\d.,]/g, '') ?? '';

      function tick(now: number) {
        const progress = Math.min((now - start) / duration, 1);
        const current = Math.floor(target * progress);
        el.textContent = current.toLocaleString('es-CL') + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });

  nums.forEach((el) => observer.observe(el));
</script>
```

---

## Fase 2 — Carretera de scroll

**Archivo:** [src/components/ScrollRoad.astro](../src/components/ScrollRoad.astro)

Implementar la **variante C** de [IDEAS.md §2.2](IDEAS.md) — progress bar tipo carretera con camión.

**Approach recomendado (sin JS):**

CSS scroll-driven animations (soporte nativo en navegadores modernos, 2024+):

```astro
<div class="scroll-road" aria-hidden="true">
  <div class="road-line">
    <div class="dashes"></div>
  </div>
  <div class="truck">
    <svg viewBox="0 0 40 20" width="40" height="20">
      <!-- silueta de camión -->
    </svg>
  </div>
</div>

<style>
  .scroll-road {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 6px;
    z-index: 100;
    pointer-events: none;
    background: var(--navy);
  }
  .dashes {
    height: 100%;
    background: repeating-linear-gradient(
      90deg,
      var(--cream) 0 12px,
      transparent 12px 24px
    );
    animation: scroll-progress linear;
    animation-timeline: scroll(root);
    transform-origin: left;
  }
  .truck {
    position: absolute;
    top: -8px; left: 0;
    animation: truck-move linear;
    animation-timeline: scroll(root);
  }
  @keyframes scroll-progress {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
  @keyframes truck-move {
    from { left: 0; }
    to { left: calc(100% - 40px); }
  }
</style>
```

**Fallback para navegadores sin soporte:** agregar detección + IntersectionObserver + `scrollTop` clásico.

**Referencia CSS scroll-driven:** [developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)

---

## Fase 3 — Contenido del equipo

### 3.1 Fotos del equipo

**Archivo destino:** `public/images/team/`

**Formato requerido:**
- 400×400 px mínimo (cuadrado)
- JPEG comprimido a ~50KB (usar [squoosh.app](https://squoosh.app) o similar)
- Fondo neutro (idealmente blanco o crema — combina con la paleta)

**Convención de nombres:**
```
cristobal-cesped.jpg
carlos-ramirez.jpg
cristian-tapia.jpg
andres-araya.jpg
leonardo-chacon.jpg
baltazar-portilla.jpg
```

**Cómo integrarlo:** editar [src/components/Team.astro](../src/components/Team.astro). Cambiar el array `members`:

```typescript
const members = [
  { photo: '/images/team/cristobal-cesped.jpg', name: 'Cristóbal Césped', role: 'Product Owner' },
  { photo: '/images/team/carlos-ramirez.jpg', name: 'Carlos Ramírez', role: 'UI/UX Lead' },
  // ...
];
```

Y en el JSX, reemplazar el `.avatar` con iniciales por:

```astro
<img src={m.photo} alt={m.name} class="avatar" />
```

CSS: agregar `object-fit: cover;` al `.avatar`.

### 3.2 Video del pitch

**Recomendación fuerte: usar YouTube embed, NO archivo local.**

**Por qué YouTube:**
| Ventaja | Por qué importa |
|---|---|
| Cero bandwidth en la VM | El video pesa 50–200MB, no gastas ancho de banda del server |
| Streaming adaptativo | YouTube ajusta calidad al internet del visitante — funciona en móvil 3G |
| Cero mantenimiento | Si querés cambiarlo, editás el video en YT, el sitio no se toca |
| Analytics gratis | Sabés cuántos lo vieron, dónde abandonan |
| Compresión profesional | H.264/VP9 optimizados — imposible replicar sin trabajo |

**Únicos contras:** logo de YouTube visible + dependencia externa. Para una feria universitaria, no importa.

**Cómo integrarlo:**

1. Subir el video del pitch a YouTube (puede ser público o "no listado" si querés que solo lo vea quien tenga el link)
2. Copiar el ID del video (la parte `xxxxxxxxxxx` de `https://youtube.com/watch?v=xxxxxxxxxxx`)
3. Editar [src/components/Video.astro](../src/components/Video.astro), reemplazar el `.video-placeholder` por:

```astro
<iframe
  class="video-embed"
  src="https://www.youtube.com/embed/VIDEO_ID?rel=0"
  title="Pitch de Troppo"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  loading="lazy"
></iframe>
```

CSS del `.video-embed`: `width: 100%; height: 100%; border: 0;`

**Si por alguna razón NO se puede usar YouTube** (censura corporativa, restricciones de derechos):
- Formato: MP4 con codec H.264, audio AAC
- Resolución máxima: 1080p (2K/4K es innecesario)
- Duración: <2 minutos → usar `<video autoplay muted loop>` sin controles
- Duración: >2 minutos → agregar controles nativos
- Comprimir con [HandBrake](https://handbrake.fr) con preset "Web Optimized"
- Guardar en `public/videos/pitch.mp4`
- Usar `<video src="/videos/pitch.mp4" controls poster="/images/pitch-poster.jpg">`

---

## Fase 4 — Simulación interactiva

**Archivo:** [src/components/Simulation.astro](../src/components/Simulation.astro)

Feature grande, ver [IDEAS.md §2.1](IDEAS.md) para flujo completo.

**Approach recomendado:** Canvas 2D vanilla (sin librerías). El mapa es simple: círculos (nodos) + líneas (rutas) + rects (vehículos).

**Estructura sugerida del componente:**

```astro
---
// Isla interactiva — hidratada solo cuando entra al viewport
---

<section class="simulation-demo" id="demo">
  <div class="wrap">
    <div class="sim-controls">
      <button id="btn-place">Colocar nodos</button>
      <button id="btn-simulate">Iniciar simulación</button>
      <button id="btn-ai">Activar IA</button>
    </div>
    <canvas id="sim-canvas" width="1200" height="675"></canvas>
    <div class="sim-metrics"></div>
  </div>
</section>

<script>
  // Lógica de canvas — vehículos, semáforos, animación con requestAnimationFrame
  // Ver especificación detallada en docs/IDEAS.md §2.1
</script>
```

**Antes de empezar a codear:**
1. Hacer un boceto en papel del mapa simplificado
2. Definir 3–5 nodos fijos (rotonda, acceso norte, ferrocarril, terminales)
3. Definir métricas ficticias pero plausibles a mostrar
4. Recién ahí codear

**Estimado:** 2–4 sesiones de trabajo. Vale la pena porque es EL diferenciador visual del sitio.

---

## Guía de assets pendientes

Tabla de referencia rápida:

| Asset | Formato | Tamaño | Ubicación | Componente que lo usa |
|---|---|---|---|---|
| Logos | PNG | Ya listos | `public/images/logo/` | Header, Footer |
| Favicon | ICO | 32×32 | `public/favicon.ico` | Base layout |
| Screenshot dashboard | PNG | ≥1600px ancho | `public/images/screenshots/dashboard-*.png` | Dashboard.astro |
| Fotos equipo (6) | JPEG | 400×400, ~50KB | `public/images/team/{nombre-apellido}.jpg` | Team.astro |
| Video pitch | YouTube embed | — | (URL externa) | Video.astro |
| Mapa USM | Google Maps embed | — | (iframe src) | FinalCTA.astro |

**Convención de nombres:**
- `snake-case` con guiones, todo minúsculas, sin tildes ni ñ
- Nunca espacios en nombres de archivo
- Prefijo por tipo cuando ayude (`logo-`, `dashboard-`, etc.)

---

## Deploy — dev y producción

### Development (Vercel)

Ya está configurado. Cada push a `main`:
- Rebuild automático (~60 segundos)
- URL actualizada: [troppo-web-five.vercel.app](https://troppo-web-five.vercel.app/)
- Otras ramas generan preview URLs propias

**Cómo compartir un preview de rama con el equipo:**
```bash
git checkout -b feature/carretera-scroll
git push -u origin feature/carretera-scroll
# Vercel comenta el PR con el link, o lo ves en dashboard
```

### Producción (VM con nginx)

**Cuándo hacerlo:** cuando el sitio esté listo para la feria, no antes.

**Pasos:**

1. Compilar localmente:
   ```powershell
   npm run build
   ```
   Esto genera la carpeta `dist/`.

2. Transferir `dist/` a la VM. Preguntar al admin de la VM por credenciales SSH. Ejemplo:
   ```bash
   scp -r dist/* usuario@vm.troppo.cl:/var/www/troppo/
   ```

3. Verificar que la config nginx tenga:
   ```nginx
   server {
       listen 80;
       server_name troppo.feriadesoftware.cl;
       root /var/www/troppo;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache agresivo para assets con hash
       location ~* \.(js|css|png|jpg|jpeg|svg|webp|woff2)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

4. Reload nginx: `sudo nginx -s reload`

**Alternativa:** montar CI/CD con GitHub Actions que haga el `scp` automático en cada push a `main` de una rama `production`. Pedir ayuda al admin de la VM.

---

## Decisiones abiertas

Items que requieren decisión antes de avanzar:

- [ ] **Dominio final:** ¿`troppo.feriadesoftware.cl` como asume `astro.config.mjs`? ¿O uno propio?
- [ ] **Formulario de contacto real:** el botón "Hablemos" no hace nada. Opciones: mailto (más simple), Formspree gratis, o simplemente mostrar contacto directo
- [ ] **Analytics:** ¿necesitamos saber cuántos visitan? Recomendado: [Plausible](https://plausible.io) (privacy-friendly, no requiere banner cookies) o simplemente ninguno
- [ ] **Redes sociales del proyecto:** ¿el equipo abre cuentas Instagram/LinkedIn para Troppo, o los links del footer se dejan vacíos?
- [ ] **Idioma:** ¿solo español o también versión en inglés? Astro soporta i18n nativo si se necesita
- [ ] **Modo oscuro:** la paleta ya tiene versión oscura natural. Baja prioridad pero fácil de agregar con `prefers-color-scheme`

---

## Referencias útiles

- Docs Astro: [docs.astro.build](https://docs.astro.build)
- Optimización imágenes: [squoosh.app](https://squoosh.app)
- Compresión video: [HandBrake](https://handbrake.fr)
- Favicon generator: [realfavicongenerator.net](https://realfavicongenerator.net)
- Google Maps embed: [Compartir → Insertar](https://support.google.com/maps/answer/144361)
- Vercel dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
