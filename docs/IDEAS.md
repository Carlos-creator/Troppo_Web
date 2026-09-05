# IDEAS — Troppo Landing Page

Archivo de ideas, referencias y decisiones de diseño para el sitio web de la feria.

---

## 1. Diferencias entre el landing page y la app real

### Qué muestra el landing page actual
Referencia visual congelada en `docs/reference/mockup-v0.html`. La versión activa vive en `src/pages/index.astro` como composición de componentes Astro.

- Dashboard estático con 3 filas de métricas (reducción de congestión por nodo)
- "Cómo funciona" en 4 pasos lineales (solicitud → orquestador → SUMO + IA → resultados)
- Brújula animada giratoria como único elemento visual dinámico
- No menciona la ferrocarril, el 3D, ni el análisis contrafactual

### Qué tiene la app real que el landing no muestra

| Feature de la app | Por qué es interesante para el landing |
|---|---|
| **Visualizador 3D live** (Three.js) | El más impresionante visualmente — camiones, livianos y trenes a escala física en tiempo real |
| **Cruce ferroviario Pablo Neruda/EFE** | Diferenciador inesperado — los trenes generan colas reales que se propagan a la rotonda |
| **Comparación side-by-side** de dos simulaciones | El "antes/después" que el landing promete pero no muestra realmente |
| **Análisis contrafactual de ubicaciones** (NSGA-II) | La IA no solo controla semáforos — recomienda dónde ponerlos |
| **Editor OSM** — cualquier zona del mundo | Escalabilidad concreta: no es solo San Antonio |
| **14 secciones de workflow** | Muestra la profundidad de la herramienta sin tecnicismos |
| **Screenshot real** (`og-sumov2-control.png`) | Disponible en `sumo_v2/app_web/public/` — reemplaza el dashboard mockup estático |

### Qué agregar / mejorar en el landing
- Usar el screenshot real del dashboard en lugar del mockup HTML
- Agregar una mención al ferrocarril en la sección de problema (es parte del cuello de botella real)
- La sección "Cómo funciona" podría incluir un paso 0: "Importa la red vial desde OSM" — muestra que es replicable
- Agregar las dos secciones faltantes: video del pitch + grid de confianza/atributos técnicos

---

## 2. Ideas de interactividad para el sitio

### 2.1 Simulación interactiva embebida (ALTA PRIORIDAD)

**Concepto:** Una mini-demo directamente en el landing, sin necesidad de instalar la app. El visitante experimenta el núcleo del producto en segundos.

**Flujo propuesto:**
1. Se muestra un mapa simplificado (puede ser un canvas SVG/HTML5, no Leaflet real) de la zona de San Antonio — solo los nodos clave: rotonda, acceso norte, cruce ferroviario, terminales.
2. El visitante hace clic para **colocar nodos** que delimitan una zona de optimización.
3. Al confirmar, aparecen vehículos animados (CSS o canvas) — camiones lentos y autos — que circulan por las rutas.
4. Un botón "Activar IA" cambia las fases semafóricas visualmente y se ve cómo el flujo mejora (reducción de cola, mayor velocidad).
5. Aparece un card con métricas ficticias pero plausibles: "Espera promedio: 9 min → 3 min · CO₂: −22 %".

**Tecnología sugerida:** HTML5 Canvas o SVG animado — sin dependencias externas, liviano, embebible directamente en el HTML del landing.

**Dónde ponerlo:** Entre la sección "Solución con mockup" y el "Video del pitch". Es el gancho central de la página.

---

### 2.2 Carretera interactiva de fondo al hacer scroll (ALTA PRIORIDAD)

**Concepto:** Mientras el visitante baja por la página, hay una carretera o corredor vial animado que avanza en paralelo — como si el usuario estuviera viajando por la ruta que Troppo optimiza. Funciona como hilo conductor visual de toda la landing.

**Variantes posibles:**

**A) Línea lateral (más sutil):**
- En el margen izquierdo o derecho, una línea punteada tipo carretera avanza con el scroll.
- Cada sección de la página es un "punto del camino": el problema es el atasco, la solución es el semáforo inteligente, el equipo es la llegada al puerto.
- Pequeños íconos de camión animan sobre la línea.

**B) Fondo de sección hero animado:**
- El hero tiene una vista aérea simplificada de intersección con vehículos moviéndose en loop.
- Al hacer scroll, la vista hace zoom out y se ve el corredor completo.

**C) Progress bar estilizada tipo carretera:**
- La barra de progreso de scroll de la página es literalmente una carretera con un camión que avanza.
- Simple, efectivo, muy memorable en feria.

**Tecnología sugerida:** CSS scroll-driven animations (nativo moderno, sin JS) o IntersectionObserver + CSS transitions para compatibilidad.

**Dónde aplicarlo:** Como elemento global de la página — no en una sección específica sino como capa decorativa sobre todo el scroll.

---

### 2.3 Otras ideas menores

- **Contador animado** en la sección de problema: los números (7.000 / 9 hrs / 800+) se incrementan con conteo animado cuando entran al viewport — dan sensación de dato en tiempo real.
- **Mapa real embebido** (Leaflet o Google Maps embed) en la sección CTA final — muestra la ubicación real de USM San Joaquín, no un placeholder.
- **Hover en tarjetas de equipo** — al pasar el mouse, la tarjeta muestra una línea de "fun fact" o el rol técnico específico de cada persona en Troppo.
- **Modo oscuro automático** — la paleta del sitio ya tiene versión oscura natural (azul marino + crema). Podría respetar `prefers-color-scheme`.

---

## 3. Priorización sugerida

| Prioridad | Tarea | Esfuerzo estimado |
|---|---|---|
| 1 | Integrar logo real (ya copiado a `public/images/logo/`) en `Header.astro` | Bajo |
| 2 | Añadir sección de confianza/atributos técnicos | Bajo |
| 3 | Añadir espacio de video del pitch | Bajo |
| 4 | **Carretera interactiva de scroll** (variante C — progress bar) | Medio |
| 5 | **Simulación interactiva embebida** (canvas SVG básico) | Alto |
| 6 | Screenshot real del dashboard en lugar del mockup HTML | Bajo |
| 7 | Contador animado en sección de problema | Bajo |
| 8 | Mapa real en sección CTA | Bajo |
