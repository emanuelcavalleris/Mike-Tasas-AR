/**
 * utils.js
 * Utilidades puras — Page Object Model
 *
 * Responsabilidad única: funciones de cálculo y formateo
 * sin acceso al DOM ni dependencia del estado global.
 */

const Utils = (() => {

  /**
   * Mapeo de banco → clase CSS de badge
   * @param {string} banco
   * @returns {string}
   */
  function bancoCss(banco) {
    const map = {
      'Balanz':        'banco-balanz',
      'Banco Nación':  'banco-banco-nacion',
      'Banco Macro':   'banco-banco-macro',
      'Cocos':         'banco-cocos',
      'NaranjaX':      'banco-naranjax',
      'Mercado Pago':  'banco-mercadopago',
      'Personal Pay':  'banco-personalpay',
      'Fiwind':        'banco-fiwind',
      'Ualá':          'banco-ual',
      'Lemon':         'banco-lemon',
      "Let's Bit":     'banco-letsbit',
      'Prex':          'banco-prex',
      'ICBC':          'banco-icbc',
      'Adcap':         'banco-adcap',
      'Toronto Trust': 'banco-toronto',
      'Cresium':       'banco-cresium',
      'Supervielle':   'banco-supervielle',
      'Carrefour':     'banco-carrefour',
    };
    return map[banco] || 'banco-default';
  }

  /**
   * Mapeo de tipo → clase CSS de badge
   * @param {string} tipo
   * @returns {string}
   */
  function tipoCss(tipo) {
    if (tipo === 'Cuenta Remunerada') return 'tipo-cuenta';
    if (tipo === 'Billetera')         return 'tipo-billetera';
    return 'tipo-fci';
  }

  /**
   * Calcula el color de fondo e ícono para un valor de rendimiento.
   * Escala: 19% (gris-muted) → 37% (azul) → 55% (verde acento)
   *
   * @param {number} v  Valor de rendimiento en %
   * @returns {{ bg: string, c: string }}
   */
  function rendColor(v) {
    const lo = 19, hi = 55;
    const t = Math.min(Math.max((v - lo) / (hi - lo), 0), 1);

    if (t < 0.5) {
      const tt = t * 2;
      const r = Math.round(107 + tt * (59  - 107));
      const g = Math.round(122 + tt * (130 - 122));
      const b = Math.round(149 + tt * (246 - 149));
      return { bg: `rgba(${r},${g},${b},0.14)`, c: `rgb(${r},${g},${b})` };
    }

    const tt = (t - 0.5) * 2;
    const r = Math.round(59  + tt * (0   - 59));
    const g = Math.round(130 + tt * (229 - 130));
    const b = Math.round(246 + tt * (176 - 246));
    return { bg: `rgba(${r},${g},${b},0.12)`, c: `rgb(${r},${g},${b})` };
  }

  /**
   * Formatea un número como porcentaje en locale es-AR.
   * @param {number|null} v
   * @param {number} [decimals=2]
   * @returns {string}
   */
  function fmt(v, decimals = 2) {
    if (v == null) return '—';
    return v.toLocaleString('es-AR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + '%';
  }

  /**
   * Devuelve la fecha actual formateada para el header.
   * @returns {string}
   */
  function today() {
    return new Date().toLocaleDateString('es-AR', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  }

  /**
   * Extrae los bancos únicos del dataset, ordenados alfabéticamente.
   * @param {Array} data
   * @returns {string[]}
   */
  function uniqueBancos(data) {
    return [...new Set(data.map(d => d.banco))].sort();
  }

  /**
   * Calcula el valor máximo de ponderacion del dataset completo.
   * @param {Array} data
   * @returns {number}
   */
  function maxPonderacion(data) {
    return Math.max(...data.filter(d => d.ponderacion != null).map(d => d.ponderacion));
  }

  // API pública
  return { bancoCss, tipoCss, rendColor, fmt, today, uniqueBancos, maxPonderacion };

})();
