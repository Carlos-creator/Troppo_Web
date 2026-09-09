# Rúbrica — Orden y contenido definitivo del sitio

> Documento de tracking basado en `docs/reference/TroppoOrdenDefinitivo.docx`.
> Este es el orden y contenido **obligatorio** según rúbrica del ramo.
> Cada tarea tiene checkbox para marcar progreso.

---

## 📐 Orden requerido (9 secciones)

```
1. Hero
2. El problema
3. Qué ofrece Troppo
4. Por qué Troppo es mejor que sus competidores
5. Para quién es Troppo
6. Mostrar el software
7. Escalabilidad
8. Zona empresa (Nosotros + Misión + Visión + Valores)
9. Cierre
```

---

## 🎯 Sección 1 — Hero

**Rúbrica:** frase corta de posicionamiento o enganchar directamente con el problema.

**Estado actual:** ✅ Cumplido con `Hero.astro`

- H1 actual: *"Simulamos el futuro del tráfico y probamos soluciones antes de aplicarlas."*
- Tag Feria de Software USM · 13 nov
- 2 CTAs: "Ver la simulación" (→#demo) y "Cómo funciona" (→#como-funciona)
- Brújula rotando + card 9h→2h

**Ajustes propuestos:**

- [ ] **Reemplazar brújula SVG genérica por el logo oficial "Logo estrella beige"** rotando (prio media, cambio visual)
- [ ] Ajustar CTAs si el orden final elimina `#como-funciona` como sección propia

---

## 🎯 Sección 2 — El problema

**Rúbrica textual:**

> Cada día, miles de camiones circulan por los accesos al Puerto de San Antonio, enfrentándose a una red vial que muchas veces no da abasto. Esto genera congestión, largas filas y tiempos de espera que pueden alcanzar hasta **nueve horas**.
>
> Y no es solo un problema aislado: el sector portuario chileno pierde **entre 50 mil y 100 mil millones de pesos al año** debido a la congestión y brechas de gestión.
>
> Pero el problema no es solo la congestión: también es difícil saber qué medidas realmente funcionarán para solucionarla. Cambiar la programación de los semáforos o invertir en nueva infraestructura implica decisiones costosas, y probarlas directamente en la realidad puede ser riesgoso.
>
> Por eso surge la necesidad de poder evaluar distintas alternativas antes de implementarlas.

**Requerido explícitamente:**
- *"Animación del carlos de la rotonda"* (solo la animación de congestión)

**Estado actual:** ⚠️ `Problem.astro`

- Tiene banda cinematográfica del puerto (dos fotos con dissolve + tinte cyan)
- 3 stat cards: 7.000 camiones / 9 hrs / 800+ transportistas
- H2: *"San Antonio mueve el país. Y el país espera en la fila."*
- **Falta:** cifra clave **50-100 mil millones CLP/año**
- **Falta:** animación específica del "carlos de la rotonda" (aunque `Simulation.astro` tiene la rotonda con camioncitos, no es el foco de esta sección)
- **Falta:** contexto de "difícil saber qué medidas funcionarán → decisiones costosas" (esto engancha con la sección 3)

**Ajustes propuestos:**

- [ ] Agregar 4ta stat card o bloque con la cifra **50-100 mil millones CLP/año**
- [ ] Agregar párrafo bridge que introduzca "por eso surge Troppo" al final de Problem, enganchando con sección 3
- [ ] Decidir si duplicar la rotonda de Simulation aquí (o mantener solo en sección 6)

---

## 🎯 Sección 3 — Qué ofrece Troppo

**Rúbrica textual:**

> Troppo permite probar y evaluar distintas soluciones de tráfico antes de implementarlas en la realidad. A través de simulaciones de la red vial, es posible analizar cómo se comportaría cada escenario y comparar sus resultados.
>
> Además, incorpora **inteligencia artificial mediante aprendizaje por refuerzo** para generar políticas de semaforización orientadas a mejorar el flujo vehicular y reducir la congestión.
>
> De esta forma, el cliente puede pasar de tomar decisiones basadas únicamente en estimaciones a evaluar alternativas con **evidencia obtenida desde un entorno digital**.

**Estado actual:** ⚠️ `Values.astro` (3 columnas)

- Actuales: "Simulación sin riesgo" / "Sensórica sin cámaras" / "Bimodal por diseño"
- **No matchea la rúbrica.** El foco actual es privacy + tecnología, no "qué ofrece" en términos del cliente
- H2 actual: *"Menos obra civil. Más algoritmo."*

**Ajustes propuestos:**

- [ ] **Reescribir `Values.astro` como "Qué ofrece Troppo"** con 3 pilares:
  - **1. Simulaciones de red vial** — probar escenarios sin tocar la calle
  - **2. IA con aprendizaje por refuerzo** — políticas de semaforización optimizadas
  - **3. Evidencia digital para decidir** — dejar atrás las estimaciones
- [ ] Renombrar componente a `QueOfrece.astro` (o mantener `Values.astro` con nuevo copy)

---

## 🎯 Sección 4 — Por qué Troppo es mejor que sus competidores

**Rúbrica textual:**

> La principal diferencia de Troppo es que somos la **única solución que integra en un mismo sistema simulación, inteligencia artificial y operación en tiempo real**.
>
> Mientras otras herramientas se enfocan principalmente en simular y analizar distintos escenarios, Troppo conecta todo el proceso en una misma plataforma. El cliente puede probar una estrategia, analizar sus resultados, optimizarla mediante inteligencia artificial y luego monitorear el comportamiento de la red.
>
> De esta forma, Troppo no solo permite entender qué está ocurriendo, sino también probar qué podría ocurrir y tomar mejores decisiones antes de implementarlas en la realidad.

**Estado actual:** ❌ **No existe sección dedicada**

- `Trust.astro` (6 flip cards) toca temas relacionados (Privacy-preserving, Escalabilidad, IA aprendida, etc.) pero no está posicionado como "vs competidores"

**Ajustes propuestos:**

- [ ] **Crear `PorQueTroppo.astro`** con tesis clara: "único que integra simulación + IA + operación en tiempo real"
- [ ] Diagrama/gráfico comparando Troppo (3 procesos integrados) vs competidores (solo 1 o 2)
- [ ] Reutilizar los flip cards de Trust reformulados hacia diferenciación (o dejar Trust como sección separada de refuerzo)

---

## 🎯 Sección 5 — Para quién es Troppo

**Rúbrica textual:**

> Troppo está pensado para cualquier entidad que tenga problemas de congestión en una zona crítica en la que tenga capacidades de realizar cambios: **entidades grandes, puertos nacionales o incluso municipalidades**.

**Estado actual:** ❌ **No existe sección dedicada**

**Ajustes propuestos:**

- [ ] **Crear `ParaQuien.astro`** con 3 tarjetas:
  - **Puertos nacionales** (foco actual: San Antonio; también Valparaíso, Coronel, Iquique, etc.)
  - **Municipalidades** (zonas urbanas con congestión y capacidad de decisión sobre semaforización)
  - **Entidades grandes / operadores logísticos** (empresas con corredores propios)
- [ ] Cada tarjeta con perfil de dolor + cómo Troppo lo resuelve

---

## 🎯 Sección 6 — Mostrar el software

**Rúbrica textual:**

> Animación del software real en funcionamiento (rotonda con camioncitos y sus variaciones)
>
> Qué se puede hacer actualmente con el software: **simular**, **obtener configuraciones de semaforización**, **obtener indicadores medioambientales**, **distribuciones de tráfico**.

**Estado actual:** ✅ Cumplido pero disperso

- `HowItWorks.astro` — 4 pasos del flujo con carretera serpenteante
- `Dashboard.astro` — laptop + celular con animación de encendido
- `Simulation.astro` — 4 escenarios de rotonda (jam / flow / contingency / bimodal) con 26 vehículos c/u

**Ajustes propuestos:**

- [ ] Verificar que el copy de Simulation menciona las 4 capacidades del rúbrica (semaforización, indicadores medioambientales, distribuciones)
- [ ] Considerar unificar HowItWorks + Dashboard + Simulation bajo un contenedor visual "Mostrar el software" con navegación entre las 3 vistas
- [ ] Opcional: rotular explícitamente que estas 3 secciones son "cómo se ve Troppo en acción"

---

## 🎯 Sección 7 — Escalabilidad

**Rúbrica textual:**

> Aunque Troppo nace enfocado en las necesidades del Puerto de San Antonio, su desarrollo no está limitado a una zona específica. La solución está construida de manera que pueda adaptarse a distintas redes viales y contextos de movilidad.
>
> Esto permite que, en el futuro, el mismo sistema pueda ser aplicado en otras zonas críticas, ciudades, puertos o empresas, sin tener que desarrollar una solución completamente nueva para cada caso.
>
> Así, el proyecto desarrollado para San Antonio no solo busca resolver un problema concreto, sino que sienta las bases para llevar la tecnología de Troppo a nuevos escenarios y mercados.

**Estado actual:** ✅ Cumplido con `Scalability.astro`

- 3 zonas rotando (USM Santiago / Puerto San Antonio / Valparaíso)
- Cursor animado colocando puntos, análisis LiDAR, tráfico circulando
- Copy actual: *"Funciona en cualquier zona del país"*

**Ajustes propuestos:**

- [ ] Revisar copy para alinear con "no solo San Antonio, sienta las bases para nuevos escenarios y mercados"
- [ ] Sin cambios estructurales necesarios

---

## 🎯 Sección 8 — Zona empresa

**Rúbrica textual (contenido requerido):**

- **Quiénes somos** — Foto, nombre, cargo, contacto (correo) por cada integrante
- **Misión:** *Optimizar la gestión del tráfico portuario mediante simulación bimodal y análisis inteligente en tiempo real, entregando a entidades importantes herramientas basadas en datos que reduzcan tiempos de espera, mejoren el flujo vehicular y respalden decisiones operativas con evidencia cuantificable.*
- **Visión:** *Ser la plataforma de referencia en gestión inteligente de tráfico para la industria portuaria y logística de Chile y Latinoamérica, integrando gemelos digitales, IA aplicada y sensórica real para transformar la manera en que puertos, municipalidades y entidades grandes planifican y operan su infraestructura vial.*
- **Valores** (5):
  - **Innovación** — integramos simulación + IA + monitoreo en vivo
  - **Precisión** — sustento en datos reales y validación, calibrando el programa a medida
  - **Transparencia** — reportes con configuración completa; la mejora se justifica en métricas, no promesas
  - **Cercanía** — se diseña *con* quien nos contrata y no *para* él
  - **Sustentabilidad operacional** — al optimizar el flujo se reduce combustible quemado en detención y huella de la operación

**Estado actual:** ⚠️ `Team.astro`

- Tiene 6 tarjetas con iniciales (foto placeholder)
- **Falta:** Misión, Visión y Valores explícitos en la landing (están internos en `docs/PITCH.md`)
- **Falta:** contactos por correo por cada integrante
- Fotos reales pendientes (asset bloqueado)

**Ajustes propuestos:**

- [ ] **Extender `Team.astro` o crear `Empresa.astro`** que incluya:
  - Bloque MVV al inicio (Misión, Visión, Valores como cards)
  - Team grid abajo con foto/nombre/cargo/**correo**
- [ ] Reemplazar iniciales por fotos reales cuando estén disponibles
- [ ] Copy oficial de MVV según texto del rúbrica (exacto)

---

## 🎯 Sección 9 — Cierre

**Rúbrica textual:**

> Tomas la decisión, nos llamas, elegimos el lugar, simulamos, optimizamos y decidimos y mañana lo llevamos a la realidad.
>
> **El futuro de la movilidad se decide antes de llegar a la calle.**
>
> La congestión no tiene por qué enfrentarse mediante ensayo y error. Con Troppo, las decisiones pueden probarse, medirse y optimizarse en un entorno digital antes de llevarlas a la realidad.
>
> Nos llamas, elegimos el lugar; simulamos para optimizar. Hoy decidimos con claridad, mañana lo llevamos a la realidad.
>
> **Hoy comenzamos en el puerto. Mañana, podemos llevar esta tecnología a tu infraestructura.**
>
> Mapa USM SJ
>
> **¿Tienes algún desafío de movilidad? Contáctanos**
>
> `[Conoce nuestro proyecto]` `[Conoce nuestro equipo]`

**Estado actual:** ⚠️ `FinalCTA.astro`

- Tiene mapa Google Maps embed de USM San Joaquín ✅
- Título actual sobre feria + fecha
- **Falta:** frase cierre *"Tomas la decisión, nos llamas..."*
- **Falta:** los 2 botones específicos `Conoce nuestro proyecto` y `Conoce nuestro equipo`
- **Falta:** frase *"¿Tienes algún desafío de movilidad? Contáctanos"*

**Ajustes propuestos:**

- [ ] Reescribir copy de `FinalCTA.astro` con la frase completa del rúbrica
- [ ] Agregar los 2 botones: `Conoce nuestro proyecto` (link a sección 6) y `Conoce nuestro equipo` (link a sección 8)
- [ ] Mantener el mapa USM SJ
- [ ] Considerar mover Video (`iframe` del pitch) aquí como parte del cierre

---

## 🔄 Reorden final propuesto

| Actual (index.astro) | Nuevo orden según rúbrica |
|---|---|
| Hero | Hero |
| Problem | Problem *(+ cifra 50-100mil MM)* |
| Values | **QueOfrece** *(reescrito desde Values)* |
| HowItWorks | **PorQueTroppo** *(nuevo)* |
| Dashboard | **ParaQuien** *(nuevo)* |
| Simulation | HowItWorks *(mover)* |
| Scalability | Dashboard *(mover)* |
| Video | Simulation *(mover)* |
| Trust | Scalability |
| Team | **Empresa** *(Team + MVV)* |
| FinalCTA | Video *(mover al cierre)* |
| — | FinalCTA *(reescrito)* |

**Componentes a mover / crear / eliminar:**

- 🆕 **Crear:** `QueOfrece.astro`, `PorQueTroppo.astro`, `ParaQuien.astro`, `Empresa.astro`
- 🔄 **Reescribir:** `Problem.astro` (agregar cifra), `FinalCTA.astro` (copy cierre + botones)
- ❓ **Decidir:** `Trust.astro` — ¿mantener como refuerzo dentro de PorQueTroppo, o eliminar?
- ❓ **Decidir:** `Values.astro` — ¿reescribir como QueOfrece, o crear componente nuevo?

---

## 🌟 Cambio de logo (aparte de rúbrica)

**Task:** Reemplazar la brújula SVG genérica del Hero por el logo oficial rotando.

- Fuente: `ideas/cosas_random/Logos troppo en svg y PNG/Logo estrella beige svg.svg`
- Copiar a `public/images/logo/logo_estrella_beige.svg`
- En `Hero.astro`, cambiar el `<svg class="compass-big">` inline por un `<img class="compass-big">`
- Mantener animación `spin 60s linear infinite`
- Mantener efectos LiDAR (sweep + scanner + ripples) ya que están en overlays independientes

**Impacto:** cero en lógica, alto en identidad visual (pasa de brújula genérica al logo real).

---

## 📊 Progreso general

- Total tareas: 22 checkbox
- Completadas: 0
- Prioridad alta (bloqueadoras de rúbrica): 8
- Prioridad media (mejoras de contenido): 10
- Prioridad baja (estética/refinamiento): 4

Actualizar este archivo marcando los `[x]` a medida que se implementan.
