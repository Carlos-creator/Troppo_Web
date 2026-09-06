# TROPPO — Contexto del Proyecto

> **Inteligencia que mueve el tráfico.**
> Landing page para la 34.ª Feria de Software USM.

---

## 0. Reglas de trabajo con Claude

1. **Sin interacción con git en nombre del usuario.** Claude no ejecuta `git push`, no agrega colaboradores, no sube nada al repositorio remoto. Todo lo que involucre el repo remoto lo hace el usuario.
2. **Comandos de commit en texto.** Cuando el usuario quiera subir algo, Claude entrega los comandos exactos para copiar y pegar (incluyendo el mensaje de commit). Claude no ejecuta esos comandos.

---

Este documento es la fuente de verdad para cualquier trabajo de frontend/diseño sobre el sitio de Troppo. Antes de generar código, componentes o copy, léelo completo.

---

## 1. Qué es Troppo

Troppo es un **gemelo digital de tráfico** acoplado a un sistema de control inteligente. Simula, entrena y despliega políticas de semaforización mediante **Redes Neuronales de Grafos** y **Aprendizaje por Refuerzo Profundo**, con sensórica LiDAR bajo una lógica *privacy-preserving* (sin cámaras invasivas).

**Problema que resuelve:**
El acceso terrestre al Puerto de San Antonio colapsa en horas peak: hasta **7.000 camiones/día** y esperas de hasta **9 horas**. Las soluciones actuales son físicas o reactivas — no se adaptan a la volatilidad de la demanda ni a la asimetría entre vehículos pesados y livianos. Troppo mitiga el riesgo de implementar una solución directamente en terreno, permitiendo **simular y probar políticas de semaforización inteligente antes de desplegarlas**.

**A quién está dirigido:**
- **Cliente institucional:** autoridades portuarias (EPSA) y administradores de terminales logísticos — buscan reducir OPEX/CAPEX y mejorar indicadores como el *get-out*.
- **Usuarios finales:** operadores de centros de control de tráfico y transportistas de carga pesada (+800 conductores diarios fijos en la zona).

**Propuesta de valor:**
- Optimización de activos existentes → posterga inversión en obra civil.
- Menor carga cognitiva en la toma de decisiones para operadores.
- Menos tiempo de ralentí para transportistas, menos emisiones para la comunidad urbana.

**Diferenciación:** enfoque bimodal (carga pesada + tráfico civil) + LiDAR privacy-preserving, trasladando la complejidad al algoritmo en vez de a hardware costoso e invasivo (cámaras ITS convencionales).

---

## 2. Arquitectura (para la sección técnica del sitio)

Troppo se organiza en **8 subsistemas** desacoplados. El principio rector: **simulación headless, desacoplada de la visualización** — la simulación corre completa, se procesa y almacena; el frontend reconstruye la visualización después, sin recibir estado en vivo.

| Subsistema | Responsabilidad |
|---|---|
| Frontend Web | Presentación, interacción y reconstrucción visual de simulaciones |
| API Backend | Gestión de la aplicación, puerta REST hacia el resto del sistema |
| Orquestador de Simulaciones | Coordina el ciclo de simulación (SUMO + AI Inference) |
| Motor de Simulación (SUMO) | Simulación de tráfico vía TraCI |
| AI Training | Entrena modelos y políticas de forma independiente al ciclo de simulación |
| AI Inference | Inferencia en tiempo de simulación (gRPC) |
| Procesamiento y Análisis | Transforma resultados crudos en métricas |
| Persistencia (PostgreSQL + TimescaleDB) y Almacenamiento de Archivos | Guardan datos y artefactos de simulación |

**Flujo resumido:** Frontend → REST → API Backend → Orquestador → SUMO (TraCI) + AI Inference (gRPC) → Procesamiento y Análisis → Almacenamiento → API Backend → Frontend reconstruye.

Esto es un buen ángulo para una sección tipo "cómo funciona" con un diagrama simple — sin exponer complejidad interna innecesaria al visitante de feria.

---

## 3. Identidad de marca

### Naming y concepto
- **Troppo** viene del latín *tropus* (griego *trópos*: giro, vuelta). El nombre se entiende como **dirección**.
- El logo es una **rosa de los vientos / brújula**: Troppo guía a las empresas hacia la optimización y reducción de costos. Forma redonda = movimiento y rutas.
- **Tagline oficial:** "Inteligencia que mueve el tráfico."
- Troppo = optimización.

### Personalidad de marca
| Atributo | Sensación que transmite |
|---|---|
| Inteligente | Confianza en las decisiones |
| Eficiente | Tranquilidad |
| Preciso | Seguridad |
| Profesional | Credibilidad |
| Analítico | Control y comprensión |
| Organizado | Claridad |
| Confiable | Seguridad |
| Escalable | Proyección y adaptabilidad futura |

Tono de copy: directo, técnico pero legible, sin jerga vacía. Nada de exageraciones marketineras — la credibilidad viene de la precisión.

### Paleta de color

| Nombre | Hex | Uso sugerido |
|---|---|---|
| Azul marino (REAL) | `#044559` | Color primario — fondos oscuros, headers, texto de marca |
| Celeste/turquesa | `#61E1E6` | Acento — íconos, detalles del logo, highlights |
| Crema | `#FFF8EA` | Fondo claro principal, contraste con el azul |
| Verde lima | `#D1EB78` | CTAs / botones de acción |
| Casi negro | `#151B20` | Texto sobre fondo claro, elementos de máximo contraste |

Sensaciones asociadas: azul marino = confianza y análisis · celeste = claridad e información · crema = calma y equilibrio · verde lima = creatividad y frescura.

### Tipografías
- **Logo:** Arsenica Antiqua (serif con carácter — elegante, evita verse genérico, transmite que Troppo construye soluciones innovadoras).
- **Títulos/encabezados:** Helvetica — jerarquía y presencia visual fuerte.
- **Texto general, web y redes:** Montserrat — legible, simple, versátil en distintos tamaños.

### Assets disponibles
- Logo principal (wordmark + rosa de los vientos) en versión sobre fondo oscuro y sobre fondo claro.
- Tarjetas de presentación, uniforme (polera con logo + tagline), papelería corporativa — ya definidos en el manual de identidad visual, sirven como referencia de aplicación de marca pero no son necesarios para el sitio web.

---

## 4. Estructura del sitio web

Referencia tomada del sitio de **Sentinel** (proyecto de feria de software anterior), adaptada a las competencias de Troppo. Landing B2B de una sola página, estructura clásica: Hero → Value props → Problema → Solución → Prueba social → Confianza → CTA → Footer.

1. **Header** — logo Troppo + nav (Inicio, Nosotros, Plataforma/Cómo funciona, Equipo, Contacto) + botón CTA destacado en verde lima.
2. **Hero** — titular fuerte con palabra clave destacada en celeste (ej. "Convertimos el **caos vial** en **flujo inteligente**"), subtítulo explicando el gemelo digital + IA, CTA, dato del evento (fecha/lugar de la Feria de Software USM).
3. **Propuesta de valor en 3 columnas** — ej. "Simulación sin riesgo", "Políticas de semaforización con IA", "Menos tiempo de espera, menos emisiones".
4. **Sección de problema** (bloque oscuro azul marino, alto contraste) — la cifra dura: 7.000 camiones/día, 9 horas de espera, cuellos de botella en San Antonio.
5. **Solución con mockup** — visualización de la simulación/dashboard de tráfico (reconstrucción post-simulación), mostrando el "antes/después" del flujo vehicular.
6. **Video del pitch** — espacio embebido para la presentación de feria.
7. **Equipo** — tarjetas con foto, nombre, rol, LinkedIn.
8. **Confianza/atributos técnicos** — grid de puntos: privacy-preserving (LiDAR, no cámaras invasivas), escalabilidad de componentes, simulación desacoplada de producción, trazabilidad de resultados.
9. **CTA final + ubicación** — mapa, dirección, fecha del evento (feria USM), botón de contacto.
10. **Footer** — logo, auspiciadores, contacto, redes.

---

## 5. Notas de implementación

- Priorizar contraste alto entre azul marino / crema para mantener legibilidad — evitar mezclar celeste y verde lima como fondo/texto directo (bajo contraste).
- El compás/rosa de los vientos puede reutilizarse como elemento gráfico decorativo de fondo (marca de agua rotada), tal como aparece en el manual de identidad.
- Reemplazar cualquier "Lorem ipsum" de mockups previos por copy real basado en la propuesta de valor de la sección 1.
- Si se necesita un diagrama de arquitectura para la sección técnica, usar una versión simplificada de la tabla de la sección 2 — no el diagrama completo de 8 subsistemas con flechas técnicas (ese es para documentación interna, no para visitantes de feria).

---

## 6. Componentes e interacciones (estado del código)

Sección de referencia técnica para operar sobre el código sin re-leer todo. Complementa `docs/PLAN.md` (qué se hizo/falta) y `docs/IDEAS.md` (visión y roadmap).

### 6.1 Stack

- **Astro 5** (islas + CSS scoped por componente)
- **TypeScript** en scripts de componentes
- **CSS vanilla** con variables globales, sin frameworks
- **Sin dependencias JS externas** (todo animado con `requestAnimationFrame`, `IntersectionObserver`, o CSS transitions)

**Ubicación de archivos:**
```
src/
├── layouts/Base.astro          → HTML shell, fuentes, favicon, meta
├── pages/index.astro           → Compone los 13 componentes en orden
├── components/*.astro          → Componentes de sección
└── styles/global.css           → Variables de marca (--font-*, colores)
public/
├── favicon/                    → Set completo (ico, svg, apple-touch, manifest)
├── fonts/                      → ArsenicaTrial Regular + Bold (self-hosted)
└── images/logo/                → Logos oficiales
```

### 6.2 Orden y propósito de componentes

Renderizados por `index.astro` en este orden:

| # | Componente | Propósito |
|---|---|---|
| — | `ScrollRoad` | Barra fixed bottom + camión + semáforo widget (global) |
| — | `Header` | Sticky, logo real (SVG brújula + wordmark Arsenica), nav, CTA |
| 1 | `Hero` | Titular + brújula con LiDAR sweep + card "9h→2h" |
| 2 | `Problem` | 3 stat cards con contadores animados (7.000 / 9hrs / 800+) |
| 3 | `Values` | 3 columnas — simulación, LiDAR, bimodal |
| 4 | `HowItWorks` | 4 pasos del flujo simulación |
| 5 | `Dashboard` | Laptop + celular con animación de encendido + notif Troppo |
| 6 | `Simulation` | 4 escenarios auto-ciclando de San Antonio (26 vehículos c/u) |
| 7 | `Scalability` | 3 zonas rotando (USM/San Antonio/Valparaíso) con análisis |
| 8 | `Video` | Iframe YouTube (temporal: MJ, cambiar `YT_VIDEO_ID`) |
| 9 | `Trust` | 6 atributos técnicos en grid |
| 10 | `Team` | 6 tarjetas con iniciales (pendiente fotos) |
| 11 | `FinalCTA` | Título + fecha + iframe Google Maps USM San Joaquín |
| — | `Footer` | Logo, tagline, redes, copyright, atribución Arsenica |

### 6.3 Sistemas interactivos globales (`ScrollRoad.astro`)

**Barra de carretera** (fixed bottom, 4px lime que crece con scroll) + **camión SVG** 32×16 que translateX según progreso de `scrollY` + **semáforo widget** (bottom-right, glass-morphism, verde scrollando / amarillo desacelerando / rojo idle).

**Body class `is-scrolling`:** El script agrega/quita esta clase al `<body>`. Otros componentes pueden reaccionar. Actualmente usado por Hero: `.lidar-sweep .ring` acelera (5s → 1.8s) mientras el usuario scrollea.

### 6.4 Interactividad clave por componente

**Hero** (`Hero.astro`):
- **LiDAR sweep ambient:** 3 anillos cyan pulsando desde la brújula cada 5s (o 1.8s si scrolling)
- **Scanner hover:** al pasar el mouse sobre `.hero-visual`, aparece brazo cyan siguiendo el cursor + blip pulsante + HUD "DETECTADO · X+123 Y-45" con coordenadas relativas al centro de la brújula
- **Click ripples:** cada click en el área genera un flash + 3 anillos concéntricos cyan expandiéndose (loop de creación y auto-remove)

**Problem** (`Problem.astro`):
- Contadores 0 → 7000/9/800 con easing ease-out cubic (1400ms) al entrar al viewport. `IntersectionObserver` + `unobserve()` para disparar una sola vez. Respeta `prefers-reduced-motion`. Formato `es-CL` (7.000 con punto).

**Dashboard** (`Dashboard.astro`):
- **Laptop + celular** con animación de encendido al entrar al viewport
- Coreografía: lid abre (rotateX -92deg → 0), pantalla laptop fade, filas escalonan, phone fade, notif desliza desde arriba, filas del phone escalonan
- **Notificación de Troppo** en el celular: "Diagnóstico completado — optimización aplicada, +42% flujo"
- **Approach técnico crítico:** usa CSS **transitions con `.pre` class** (no `@keyframes + fill:both`). Ver 6.5 gotchas.

**Simulation** (`Simulation.astro`):
- Showcase auto-animado de **4 escenarios** cada 9s ciclando: `jam` (congestión sin IA, sin semáforos, friction en rotonda), `flow` (IA optimizando), `contingency` (accidente en Ruta Norte), `bimodal` (camiones prioritarios)
- **Todos con 26 vehículos** para consistencia visual
- Rutas con **bypass de rotonda** — polylines con waypoints que rodean la rotonda en (520,240)
- **Car-following real:** cars mantienen distancia mínima, frenan si el de adelante está cerca. Se detienen ante semáforos rojos y en `extraStops` (accidente contingencia)
- **Panel lateral:** contador de escenario + título + descripción + métricas + 4 dots navegables

**Scalability** (`Scalability.astro`):
- **3 zonas ciclando** (~9s c/u) con cursor animado colocando puntos + análisis visual + tráfico
- Zonas: **USM San Joaquín** (3 puntos triángulo), **Puerto San Antonio** (4 puntos cuadrilátero), **Valparaíso** (5 puntos pentágono)
- Cada zona tiene su propio mapa SVG (`<g class="zone-map">`) que fade in/out
- Al completar polígono: **capa de análisis se activa** (scanner LiDAR barriendo + corner brackets cyan en vértices + polygon pulse). Después spawn de vehículos circulando dentro (clipped al polígono via `clipPath` dinámico)

**FinalCTA** (`FinalCTA.astro`):
- Iframe Google Maps embed simple: `maps.google.com/maps?q=lat,lng&output=embed` de USM Campus San Joaquín

### 6.5 Gotchas técnicos importantes

- **Astro scope CSS pero no JS.** `document.querySelectorAll('.foo')` es GLOBAL al documento — si hay `.foo` en otro componente, lo captura. Bug real: `Simulation` tenía dots que se desalineaban porque el Hero también tiene `<span class="dot">`. **Solución:** siempre usar selectores scoped tipo `.side-dots .dot` o clases únicas.
- **Preferir CSS transitions sobre `@keyframes + fill:both`.** La animación puede "revertir" al estado del cascade después de completarse por bugs de especificidad. En Dashboard hubo un caso donde elementos aparecían y desaparecían. Solución adoptada: usar clase `.pre` (transition-duration: 0s → oculta instantáneamente) y remover para disparar transitions naturales con delays.
- **`visibilitychange` para pausar animaciones costosas** (Simulation, Scalability): cuando la pestaña se oculta, cancelar `rAF` y `setInterval`. Ahorra CPU/batería.
- **`passive: true` en scroll listeners** (`ScrollRoad`) para no bloquear el scroll nativo.
- **rAF throttling en `mousemove`** (Hero scanner) — 60fps máximo sin importar la frecuencia del evento.
- **Rutas de vehículos con polylines:** función `routePoint(path, progress)` interpola posición y ángulo. Ángulo se usa con SVG `transform="rotate(deg cx cy)"` para orientar el vehículo en su dirección de viaje.
- **Body class communication:** para que componentes reaccionen a cambios globales (ej: `is-scrolling`), un componente escribe la clase en `<body>` y otros la leen via `:global(body.is-scrolling)` en su CSS scoped.

### 6.6 Convenciones

**Variables CSS** (definidas en `global.css`):
```css
--navy: #044559       --font-brand: 'Arsenica', 'Fraunces', 'Georgia', serif
--navy-deep: #033544  --font-serif: 'Fraunces', serif
--cyan: #61E1E6       --font-sans: 'Montserrat', system-ui
--cream: #FFF8EA      --font-title: 'Helvetica Neue', Helvetica, Arial
--lime: #D1EB78
--ink: #151B20
```

- `--font-brand` = **solo para el wordmark TROPPO** (Header + Footer). No usar en texto largo.
- `--font-serif` = titulares (`h1`, `h2`, `h3` display).
- `--font-title` = etiquetas UI técnicas (`h3`/`h4` en value cards).

**Timing común:**
- Transiciones cortas: 250-500ms ease-out
- Fade in-out de secciones: 400-700ms
- Loop de escenarios (Simulation, Scalability): 8-9s por escenario
- Animación de laptop encendido: coreografía total ~3s

**Vehículos SVG** (rects con rotate):
- Simulation: `car` 11×6 cyan, `truck` 22×8 lime, rx=1
- Scalability: `car` 9×5 cyan, `truck` 18×7 lime, rx=1
- Ambos con `stroke rgba(0,0,0,0.35)` 0.5px para borde sutil

**HUD flotante estilo sensor** (usado en Simulation, Scalability):
- Pill negro con `backdrop-filter: blur(8px)`, border cyan 1px, texto letter-spacing 1.5px uppercase
- Dot pulsante 6×6 con box-shadow del mismo color (glow)

### 6.7 Fuentes y assets

- **Arsenica Trial** (Zetafonts, CC-BY-NC) — self-hosted en `public/fonts/ArsenicaTrial-Regular.ttf` + `Bold.ttf`. Atribución obligatoria (visible en Footer copyright)
- **Fraunces, Montserrat** — Google Fonts CDN via `<link>` en Base.astro
- **Helvetica NO se self-hostea** (licencia comercial). Fallback: macOS/iOS ven Helvetica, Windows/Android ven Arial (visualmente equivalente)
- **Logos** en `public/images/logo/`: `logo_dark_sinfondo.png` (brújula oscura para fondos claros), `logo_light_sinfondo.png` (brújula clara para fondos oscuros), variantes con fondo
- **Favicons** en `public/favicon/` (subcarpeta, no en raíz)

### 6.8 Deploy

- **Dev preview:** Vercel auto en cada push a `main` — https://troppo-web-five.vercel.app/
- **Producción destino:** VM del equipo con nginx (aún no desplegado). Build: `npm run build` → `dist/` → `scp` a la VM
- **Deploy en VM = puramente estático.** Astro compila a HTML/CSS/JS puro, sin Node en runtime