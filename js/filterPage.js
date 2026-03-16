/**
 * filterPage.js
 * Page Object: FilterPage
 *
 * Responsabilidad única: gestionar el estado de filtros y ordenamiento,
 * exponer acciones del usuario y coordinar con Renderer para actualizar la vista.
 *
 * No construye HTML directamente — eso es trabajo del Renderer.
 * No conoce los datos crudos — eso es trabajo de data.js.
 */

const FilterPage = (() => {

  // ── Estado interno ────────────────────────────────────────────────────
  let _sortCol = 'rendimiento';
  let _sortDir = 1;  // -1 = descendente, 1 = ascendente
  let _tab     = 'todos';

  const SORT_BTN_MAP = {
    rendimiento: 'btn-rend',
    banco:       'btn-banco',
    ponderacion: 'btn-pond',
    varianza:    'btn-var',
  };
  const SORT_KEYS = ['rendimiento', 'banco', 'ponderacion', 'varianza'];

  // ── Lectura de controles ──────────────────────────────────────────────

  function _getQuery() {
    return document.getElementById('search').value.trim().toLowerCase();
  }

  function _getBanco() {
    return document.getElementById('filterBanco').value;
  }

  function _getTipo() {
    return document.getElementById('filterTipo').value;
  }

  // ── Filtrado y sort ───────────────────────────────────────────────────

  /**
   * Devuelve los datos filtrados y ordenados según el estado actual.
   * @returns {Array}
   */
  function getFilteredRows() {
    const q     = _getQuery();
    const banco = _getBanco();
    const tipo  = _getTipo();

    const filtered = DATA.filter(d => {
      if (_tab === 'garantizado'  && d.section !== 'Rendimiento garantizado')    return false;
      if (_tab === 'condiciones'  && d.section !== 'Con condiciones especiales') return false;
      if (_tab === 'fci'          && d.section !== 'FCI')                        return false;
      if (banco && d.banco !== banco)                                             return false;
      if (tipo  && d.tipo  !== tipo)                                              return false;
      if (q && !d.fondo.toLowerCase().includes(q) && !d.banco.toLowerCase().includes(q)) return false;
      return true;
    });

    return filtered.sort((a, b) => {
      let va = a[_sortCol];
      let vb = b[_sortCol];
      if (va == null) va = _sortDir === -1 ? -Infinity : Infinity;
      if (vb == null) vb = _sortDir === -1 ? -Infinity : Infinity;
      if (typeof va === 'string') return _sortDir * va.localeCompare(vb, 'es');
      return _sortDir * (vb - va);
    });
  }

  // ── Sincronización de UI de controles ────────────────────────────────

  function _syncSortButtons() {
    // Desactivar todos
    Object.values(SORT_BTN_MAP).forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.classList.remove('active');
    });

    // Activar el correspondiente
    const activeId = SORT_BTN_MAP[_sortCol];
    if (activeId) {
      const btn = document.getElementById(activeId);
      if (btn) btn.classList.add('active');
    }

    // Actualizar flechas
    SORT_KEYS.forEach(k => {
      const arrow = document.getElementById('arr-' + k);
      if (arrow) arrow.textContent = (k === _sortCol) ? (_sortDir === -1 ? '↓' : '↑') : '';
    });
  }

  function _syncTabChips(activeTab) {
    document.querySelectorAll('.chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.tab === activeTab);
    });
  }

  // ── Render maestro ────────────────────────────────────────────────────

  /**
   * Ejecuta el ciclo completo: filtrar → renderizar → actualizar UI de controles.
   */
  function refresh() {
    const rows = getFilteredRows();
    const maxP = Utils.maxPonderacion(DATA);

    Renderer.renderCards(rows, _tab, maxP);
    Renderer.renderTable(rows, _tab, maxP);
    Renderer.updateTableHeaders(_sortCol, _sortDir);
    Renderer.updateResultsCount(rows.length);
  }

  // ── Acciones públicas (llamadas desde app.js vía event listeners) ─────

  /**
   * Cambia el tab activo y refresca.
   * @param {string} tab
   */
  function setTab(tab) {
    _tab = tab;
    _syncTabChips(tab);
    refresh();
  }

  /**
   * Cambia la columna de ordenamiento (o invierte dirección si es la misma).
   * @param {string} col
   */
  function setSort(col) {
    if (_sortCol === col) {
      _sortDir *= -1;
    } else {
      _sortCol = col;
      _sortDir = -1;
    }
    _syncSortButtons();
    refresh();
  }

  /**
   * Resetea todos los filtros al estado inicial.
   */
  function clearAll() {
    document.getElementById('search').value      = '';
    document.getElementById('filterBanco').value = '';
    document.getElementById('filterTipo').value  = '';

    _tab     = 'todos';
    _sortCol = 'rendimiento';
    _sortDir = -1;

    _syncTabChips('todos');
    _syncSortButtons();
    refresh();
  }

  // ── Getters de estado (para app.js si necesita leer) ──────────────────

  function getSortCol() { return _sortCol; }
  function getSortDir() { return _sortDir; }
  function getTab()     { return _tab; }

  // API pública
  return {
    refresh,
    setTab,
    setSort,
    clearAll,
    getSortCol,
    getSortDir,
    getTab,
  };

})();
