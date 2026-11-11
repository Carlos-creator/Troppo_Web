/* ============================================================
   Reveal con histéresis
   ------------------------------------------------------------
   Problema que resuelve: los componentes revelan elementos con
   IntersectionObserver y los ocultan con un `transform` (translateY,
   rotate…). IntersectionObserver mide la caja YA transformada, así
   que al ocultarse el elemento puede volver a intersectar y
   revelarse de nuevo → bucle visible como "temblor" en los límites
   de la pantalla.

   Solución: separar ENTRADA y SALIDA en dos observadores.
   - Entrada: misma zona y umbral que antes; revela sólo si
     isIntersecting && intersectionRatio >= threshold.
   - Salida: zona más amplia; oculta cuando la proporción visible
     DENTRO de esa zona baja de `exitThreshold` (por defecto, el mismo
     umbral). Con la zona igual a la original, el punto de salida sería
     idéntico al anterior; ampliándola sólo donde hace falta, la salida
     se retrasa lo justo para romper el bucle.

   Regla para elegir `exitMargin` (lo que rompe el bucle):
   1. La zona de salida debe CONTENER a la de entrada en todos los
      lados (así, al ocultarse, el observador de entrada también quedó
      por debajo del umbral y volverá a avisar al reingresar).
   2. En cada lado hacia el que el estado oculto acerca la caja al
      interior de la pantalla, la zona de salida debe extenderse más
      allá de la de entrada en MÁS que ese desplazamiento. Así, la caja
      oculta no alcanza el umbral de entrada y no se revela sola.
      La diferencia (extensión − desplazamiento) es la banda de
      histéresis: el scroll debe moverse al menos eso para cambiar
      de estado.
   ============================================================ */

export interface RevealOptions {
  /** rootMargin de la zona de entrada (el mismo que usaba el componente). */
  enterMargin: string;
  /** Proporción visible mínima para revelar (el mismo threshold de antes). */
  threshold: number;
  /** rootMargin de la zona de salida. Debe contener a la de entrada. */
  exitMargin: string;
  /** Proporción (dentro de la zona de salida) por debajo de la cual se
      oculta. Por defecto = `threshold`. Con 0 se oculta sólo al salir
      por completo de la zona. */
  exitThreshold?: number;
  /** Se llama una vez por cada transición oculto → visible. `index` es la
      posición del elemento dentro del lote de avisos (igual que el `i`
      de los `entries.forEach((e, i) => …)` originales). */
  onEnter: (el: HTMLElement, index: number) => void;
  /** Se llama una vez por cada transición visible → oculto. */
  onExit: (el: HTMLElement) => void;
}

// Tolerancia para errores de coma flotante en intersectionRatio.
const RATIO_EPSILON = 0.001;

export function observeReveal(targets: Iterable<HTMLElement>, opts: RevealOptions): void {
  const shown = new WeakSet<Element>();
  const exitThreshold = opts.exitThreshold ?? opts.threshold;

  const enterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (shown.has(e.target)) return;
        if (e.isIntersecting && e.intersectionRatio >= opts.threshold - RATIO_EPSILON) {
          shown.add(e.target);
          opts.onEnter(e.target as HTMLElement, i);
        }
      });
    },
    { rootMargin: opts.enterMargin, threshold: opts.threshold },
  );

  const exitObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!shown.has(e.target)) return;
        const below = !e.isIntersecting || e.intersectionRatio < exitThreshold - RATIO_EPSILON;
        if (below) {
          shown.delete(e.target);
          opts.onExit(e.target as HTMLElement);
        }
      });
    },
    // 0 para enterarse de la salida completa; exitThreshold para el cruce.
    { rootMargin: opts.exitMargin, threshold: exitThreshold > 0 ? [0, exitThreshold] : [0] },
  );

  for (const el of targets) {
    enterObserver.observe(el);
    exitObserver.observe(el);
  }
}

export interface RevealClassOptions {
  enterMargin: string;
  threshold: number;
  exitMargin: string;
  exitThreshold?: number;
  /** Retraso escalonado por posición en el lote (ms). 0 = sin retraso. */
  staggerMs?: number;
  /** Clase que marca el estado visible. Por defecto `revealed`. */
  className?: string;
}

/** Caso común: alternar la clase `.revealed` con histéresis, con el
    escalonado opcional por `setTimeout` que usaban algunos componentes. */
export function revealOnScroll(targets: Iterable<HTMLElement>, opts: RevealClassOptions): void {
  const cls = opts.className ?? 'revealed';
  const stagger = opts.staggerMs ?? 0;
  const timers = new WeakMap<Element, number>();

  const clearTimer = (el: Element) => {
    const t = timers.get(el);
    if (t) {
      window.clearTimeout(t);
      timers.delete(el);
    }
  };

  observeReveal(targets, {
    enterMargin: opts.enterMargin,
    threshold: opts.threshold,
    exitMargin: opts.exitMargin,
    exitThreshold: opts.exitThreshold,
    onEnter: (el, i) => {
      clearTimer(el);
      if (stagger > 0) {
        const t = window.setTimeout(() => {
          el.classList.add(cls);
          timers.delete(el);
        }, i * stagger);
        timers.set(el, t);
      } else {
        el.classList.add(cls);
      }
    },
    onExit: (el) => {
      clearTimer(el);
      el.classList.remove(cls);
    },
  });
}
