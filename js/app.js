/**
 * app.js
 * Punto de entrada de la aplicación — Page Object Model
 *
 * Responsabilidad única: inicializar los Page Objects y conectar
 * los eventos del DOM con las acciones correspondientes.
 *
 * No contiene lógica de negocio, renderizado ni estado.
 * Es el "director de orquesta" que une data.js + utils.js +
 * renderer.js + filterPage.js.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Inicializar vistas estáticas ────────────────────────────────
  Renderer.renderHeaderDate();
  Renderer.populateBancoSelect(Utils.uniqueBancos(DATA));

  // ── 2. Render inicial ──────────────────────────────────────────────
  FilterPage.refresh();

  // ── 3. Eventos de búsqueda y selects ──────────────────────────────
  document.getElementById('search')
    .addEventListener('input', () => FilterPage.refresh());

  document.getElementById('filterBanco')
    .addEventListener('change', () => FilterPage.refresh());

  document.getElementById('filterTipo')
    .addEventListener('change', () => FilterPage.refresh());

  // ── 4. Chips de categoría (tab) ────────────────────────────────────
  document.querySelectorAll('.chip[data-tab]').forEach(chip => {
    chip.addEventListener('click', () => FilterPage.setTab(chip.dataset.tab));
  });

  // ── 5. Botones de sort del panel de filtros ────────────────────────
  document.querySelectorAll('.sbtn[data-sort]').forEach(btn => {
    btn.addEventListener('click', () => FilterPage.setSort(btn.dataset.sort));
  });

  // ── 6. Encabezados de tabla (sort en desktop) ──────────────────────
  document.querySelectorAll('thead th[data-col]').forEach(th => {
    th.addEventListener('click', () => FilterPage.setSort(th.dataset.col));
  });

  // ── 7. Botón limpiar filtros ───────────────────────────────────────
  document.getElementById('btn-clear')
    .addEventListener('click', () => FilterPage.clearAll());

});
