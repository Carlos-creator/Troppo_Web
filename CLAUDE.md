# TROPPO — Contexto del Proyecto

> **Inteligencia que mueve el tráfico.**
> Landing page para la 33.ª Feria de Software USM.

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