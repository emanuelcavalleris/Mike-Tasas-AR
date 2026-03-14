/**
 * renderer.js
 * Page Object: Renderer
 *
 * Responsabilidad única: construir y actualizar el DOM.
 * No contiene lógica de filtrado, sorting ni estado.
 * Recibe datos ya procesados y los convierte en HTML.
 *
 * Regla de sección:
 *   - Tab "todos"         → orden global por tasa, SIN separadores de sección
 *   - Tabs específicos    → separadores de sección visibles
 */

const Renderer = (() => {

  const SECTION_ICONS = {
    'Rendimiento garantizado':    '✅',
    'Con condiciones especiales': '⚡',
    'FCI':                        '📊',
  };

  // ── Helpers de construcción de HTML ──────────────────────────────────

  function _bancoBadge(banco) {
    return `<span class="banco-badge ${Utils.bancoCss(banco)}">${banco}</span>`;
  }

  function _tipoBadge(tipo) {
    return `<span class="tipo-badge ${Utils.tipoCss(tipo)}">${tipo}</span>`;
  }

  function _pondBar(ponderacion, maxP) {
    const pct = ((ponderacion / maxP) * 100).toFixed(1);
    return `
      <div class="pbwrap">
        <div class="pbbg"><div class="pbfill" style="width:${pct}%"></div></div>
        <span class="eival" style="color:var(--muted);font-size:.74rem">${Utils.fmt(ponderacion)}</span>
      </div>`;
  }

  function _pondBarTable(ponderacion, maxP) {
    const pct = ((ponderacion / maxP) * 100).toFixed(1);
    return `
      <div class="pwrap">
        <div class="pbg"><div class="pfl" style="width:${pct}%"></div></div>
        <span class="pnum">${Utils.fmt(ponderacion)}</span>
      </div>`;
  }

  // ── Cards (mobile) ────────────────────────────────────────────────────

  /**
   * Renderiza la lista de cards en el contenedor mobile.
   * @param {Array}  rows   Filas ya filtradas y ordenadas
   * @param {string} tab    Tab activo
   * @param {number} maxP   Máximo de ponderación para la barra
   */
  function renderCards(rows, tab, maxP) {
    const container = document.getElementById('cards-list');
    if (!container) return;

    if (rows.length === 0) {
      container.innerHTML = '<div style="text-align:center;padding:50px 20px;color:var(--muted);font-size:.87rem">No se encontraron resultados.</div>';
      return;
    }

    let html = '';
    let lastSection = null;

    rows.forEach(d => {
      // En "todos": orden global por tasa, sin separadores de sección
      // En tabs específicos: mostrar separador cuando cambia la sección
      if (tab !== 'todos' && d.section !== lastSection) {
        lastSection = d.section;
        const icon = SECTION_ICONS[d.section] || '📂';
        html += `<div class="sec-hdr">${icon} ${d.section}</div>`;
      }

      const col = Utils.rendColor(d.rendimiento);

      html += `
        <div class="card">
          <div class="card-top">
            <div>
              <div class="card-name">${d.fondo}</div>
              ${d.nota  ? `<div class="card-sub">${d.nota}</div>`           : ''}
              ${d.limite? `<div class="card-sub">Límite: ${d.limite}</div>` : ''}
            </div>
            <div class="card-rate" style="background:${col.bg};color:${col.c};border:1px solid ${col.c}44">
              ${Utils.fmt(d.rendimiento)}
            </div>
          </div>
          <div class="card-meta">
            ${_bancoBadge(d.banco)}
            ${_tipoBadge(d.tipo)}
          </div>
          ${(d.varianza != null || d.ponderacion != null) ? `
            <div class="card-extra">
              ${d.varianza != null ? `
                <div class="ei">
                  <span class="eilabel">Varianza</span>
                  <span class="eival ${d.varianza > 1 ? 'varhi' : 'varlo'}">${Utils.fmt(d.varianza, 3)}</span>
                </div>` : ''}
              ${d.ponderacion != null ? `
                <div class="ei">
                  <span class="eilabel">Ponderación</span>
                  ${_pondBar(d.ponderacion, maxP)}
                </div>` : ''}
            </div>` : ''}
        </div>`;
    });

    container.innerHTML = html;
  }

  // ── Table (desktop) ───────────────────────────────────────────────────

  /**
   * Renderiza las filas de la tabla desktop.
   * @param {Array}  rows
   * @param {string} tab
   * @param {number} maxP
   */
  function renderTable(rows, tab, maxP) {
    const tbody = document.getElementById('tbody');
    if (!tbody) return;

    if (rows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="empty">No se encontraron resultados.</td></tr>`;
      return;
    }

    let html = '';
    let lastSection = null;

    rows.forEach(d => {
      // Misma lógica: separadores solo en tabs específicos
      if (tab !== 'todos' && d.section !== lastSection) {
        lastSection = d.section;
        const icon = SECTION_ICONS[d.section] || '📂';
        html += `<tr class="sec-tr"><td colspan="6">${icon} ${d.section}</td></tr>`;
      }

      const col   = Utils.rendColor(d.rendimiento);
      const varHi = d.varianza != null && d.varianza > 1;

      html += `
        <tr>
          <td class="tdname">
            ${d.fondo}
            ${d.nota  ? `<small>${d.nota}</small>`           : ''}
            ${d.limite? `<small>Límite: ${d.limite}</small>` : ''}
          </td>
          <td>${_bancoBadge(d.banco)}</td>
          <td>${_tipoBadge(d.tipo)}</td>
          <td>
            <span class="rcell" style="background:${col.bg};color:${col.c};border:1px solid ${col.c}33">
              ${Utils.fmt(d.rendimiento)}
            </span>
          </td>
          <td>
            ${d.varianza != null
              ? `<span class="vcell ${varHi ? 'var-hi' : 'var-lo'}">${Utils.fmt(d.varianza, 3)}</span>`
              : '<span class="mono">—</span>'}
          </td>
          <td>
            ${d.ponderacion != null
              ? _pondBarTable(d.ponderacion, maxP)
              : '<span class="mono">—</span>'}
          </td>
        </tr>`;
    });

    tbody.innerHTML = html;
  }

  // ── Encabezados de tabla (indicadores de sort) ────────────────────────

  /**
   * Actualiza las clases sorted-asc / sorted-desc en los <th>.
   * @param {string} sortCol
   * @param {number} sortDir  1 asc | -1 desc
   */
  function updateTableHeaders(sortCol, sortDir) {
    const COL_ORDER = ['fondo', 'banco', 'tipo', 'rendimiento', 'varianza', 'ponderacion'];
    document.querySelectorAll('thead th').forEach((th, i) => {
      th.classList.remove('sorted-asc', 'sorted-desc');
      if (COL_ORDER[i] === sortCol) {
        th.classList.add(sortDir === -1 ? 'sorted-desc' : 'sorted-asc');
      }
    });
  }

  // ── Contador de resultados ────────────────────────────────────────────

  function updateResultsCount(count) {
    const el = document.getElementById('results-count');
    if (el) el.textContent = `${count} resultado${count !== 1 ? 's' : ''}`;
  }

  // ── Header date ───────────────────────────────────────────────────────

  function renderHeaderDate() {
    const el = document.getElementById('header-date');
    if (el) el.textContent = Utils.today();
  }

  // ── Populate banco select ─────────────────────────────────────────────

  function populateBancoSelect(bancos) {
    const sel = document.getElementById('filterBanco');
    if (!sel) return;
    bancos.forEach(b => {
      const opt = document.createElement('option');
      opt.value = b;
      opt.textContent = b;
      sel.appendChild(opt);
    });
  }

  // API pública
  return {
    renderCards,
    renderTable,
    updateTableHeaders,
    updateResultsCount,
    renderHeaderDate,
    populateBancoSelect,
  };

})();
