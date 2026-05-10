/**
 * data.js
 * Capa de datos — Page Object Model
 *
 * Responsabilidad única: proveer los datos crudos de fondos.
 * No contiene lógica de presentación ni de negocio.
 *
 * Cada entrada:
 *   fondo        {string}  Nombre completo del fondo
 *   banco        {string}  Entidad / billetera
 *   tipo         {string}  Categoría según columna Horizonte de la planilla:
 *                          "FCI Flexible" | "FCI Mediano Plazo" | "FCI Corto Plazo"
 *                          "FCI Largo Plazo" | "Cuenta Remunerada" | "Billetera"
 *   rendimiento  {number}  TNA en porcentaje
 *   varianza     {number|null}
 *   ponderacion  {number|null}
 *   limite       {string|undefined}  Tope de inversión
 *   nota         {string|undefined}  Condición especial
 *   section      {string}  "Rendimiento garantizado" | "Con condiciones especiales" | "FCI"
 *
 * ──────────────────────────────────────────────────────────────
 * Última actualización de datos: 17-04-2026
 * Fuente: Planilla Excel — Rendim promedio TNA ult 30 días
 * Validación manual confirmada: 07-05-2026
 * ──────────────────────────────────────────────────────────────
 */

const DATA = [

  /* ── Rendimiento garantizado ── */
  { fondo: "Carrefour Banco", banco: "Carrefour",    tipo: "Cuenta Remunerada", rendimiento: 30.00, varianza: null, ponderacion: null, limite: "$4.228.800/mes", section: "Rendimiento garantizado" },
  { fondo: "NaranjaX",        banco: "NaranjaX",     tipo: "Cuenta Remunerada", rendimiento: 25.00, varianza: null, ponderacion: null, limite: "$1M",            section: "Rendimiento garantizado" },
  { fondo: "Fiwind",           banco: "Fiwind",       tipo: "Billetera",          rendimiento: 24.00, varianza: null, ponderacion: null, limite: "$750K",          section: "Rendimiento garantizado" },
  { fondo: "Ualá",             banco: "Ualá",         tipo: "Cuenta Remunerada", rendimiento: 23.00, varianza: null, ponderacion: null, limite: "$1M",            section: "Rendimiento garantizado" },

  /* ── Con condiciones especiales ── */
  { fondo: "Ualá Plus 2",  banco: "Ualá",         tipo: "Cuenta Remunerada", rendimiento: 29.00, varianza: null, ponderacion: null, limite: "$1M",        nota: "Acumulá $500.000 entre inversiones, consumos y cobros.", section: "Con condiciones especiales" },
  { fondo: "Ualá Plus 1",  banco: "Ualá",         tipo: "Cuenta Remunerada", rendimiento: 26.00, varianza: null, ponderacion: null, limite: "$1M",        nota: "Acumulá $250.000 entre inversiones, consumos y cobros.", section: "Con condiciones especiales" },
  { fondo: "Cresium",      banco: "Cresium",      tipo: "Cuenta Remunerada", rendimiento: 22.53, varianza: null, ponderacion: null, limite: "Sin límite", nota: "Solo Personas Jurídicas.",                                section: "Con condiciones especiales" },
  { fondo: "Banco Nación", banco: "Banco Nación", tipo: "Cuenta Remunerada", rendimiento: 20.00, varianza: null, ponderacion: null, limite: "$2M",        nota: "Exclusivo para clientes de cartera consumo.",             section: "Con condiciones especiales" },
  { fondo: "Supervielle",  banco: "Supervielle",  tipo: "Cuenta Remunerada", rendimiento: 19.50, varianza: null, ponderacion: null, limite: "$1M",        nota: "Solo Clientes Plan Sueldo.",                              section: "Con condiciones especiales" },

  /* ── FCI — datos al 17-04-2026
     Tipo según columna Horizonte de la planilla:
       Flex → FCI Flexible
       Med  → FCI Mediano Plazo
       Cor  → FCI Corto Plazo
       Lar  → FCI Largo Plazo                                    ── */
  { fondo: "Pellegrini Crecimiento - Clase A",           banco: "Banco Nación",      tipo: "FCI Flexible",      rendimiento: 76.63, varianza: 0.670, ponderacion: 73.28, section: "FCI" },
  { fondo: "Balanz Long Pesos - Clase A",                banco: "Balanz",            tipo: "FCI Mediano Plazo", rendimiento: 65.98, varianza: 0.603, ponderacion: 62.97, section: "FCI" },
  { fondo: "Pellegrini Renta Fija Plus - Clase A",       banco: "Banco Nación",      tipo: "FCI Mediano Plazo", rendimiento: 65.33, varianza: 0.567, ponderacion: 62.49, section: "FCI" },
  { fondo: "Balanz Institucional - Clase A",             banco: "Balanz",            tipo: "FCI Largo Plazo",   rendimiento: 73.75, varianza: 2.675, ponderacion: 60.37, section: "FCI" },
  { fondo: "Champaquí Renta Pesos - Clase A",            banco: "Bancor",            tipo: "FCI Corto Plazo",   rendimiento: 57.40, varianza: 0.389, ponderacion: 55.45, section: "FCI" },
  { fondo: "Pellegrini Renta Fija II - Clase A",         banco: "Banco Nación",      tipo: "FCI Mediano Plazo", rendimiento: 56.13, varianza: 0.521, ponderacion: 53.52, section: "FCI" },
  { fondo: "Pellegrini Renta Fija Ahorro - Clase A",     banco: "Banco Nación",      tipo: "FCI Corto Plazo",   rendimiento: 52.74, varianza: 0.472, ponderacion: 50.38, section: "FCI" },
  { fondo: "Balanz Retorno Total - Clase A",             banco: "Balanz",            tipo: "FCI Largo Plazo",   rendimiento: 49.55, varianza: 1.028, ponderacion: 44.41, section: "FCI" },
  { fondo: "Balanz Renta Fija Estrategica - Clase A",    banco: "Balanz",            tipo: "FCI Mediano Plazo", rendimiento: 44.73, varianza: 0.291, ponderacion: 43.27, section: "FCI" },
  { fondo: "Toronto Trust Renta Fija - Clase A",         banco: "Banco Hipotecario", tipo: "FCI Corto Plazo",   rendimiento: 42.05, varianza: 0.288, ponderacion: 40.61, section: "FCI" },
  { fondo: "Balanz Capital Ahorro - Clase A",            banco: "Balanz",            tipo: "FCI Corto Plazo",   rendimiento: 41.96, varianza: 0.303, ponderacion: 40.44, section: "FCI" },
  { fondo: "Toronto Trust Renta Fija Plus - Clase A",    banco: "Banco Hipotecario", tipo: "FCI Mediano Plazo", rendimiento: 38.86, varianza: 0.469, ponderacion: 36.52, section: "FCI" },
  { fondo: "Balanz Lecaps - Clase A",                    banco: "Balanz",            tipo: "FCI Mediano Plazo", rendimiento: 37.99, varianza: 0.390, ponderacion: 36.04, section: "FCI" },
  { fondo: "Pionero FF",                                 banco: "Banco Macro",       tipo: "FCI Corto Plazo",   rendimiento: 32.59, varianza: 0.220, ponderacion: 31.49, section: "FCI" },
  { fondo: "Cocos Pesos Plus - Clase A",                 banco: "Cocos",             tipo: "FCI Largo Plazo",   rendimiento: 29.32, varianza: 0.157, ponderacion: 28.53, section: "FCI" },
  { fondo: "Champaquí Ahorro Pesos - Clase A",           banco: "Bancor",            tipo: "FCI Corto Plazo",   rendimiento: 28.96, varianza: 0.113, ponderacion: 28.39, section: "FCI" },
  { fondo: "Pionero Renta Ahorro - Clase A",             banco: "Banco Macro",       tipo: "FCI Corto Plazo",   rendimiento: 29.43, varianza: 0.327, ponderacion: 27.79, section: "FCI" },
  { fondo: "Balanz Capital Abierto Pymes FCI - Clase A", banco: "Balanz",            tipo: "FCI Largo Plazo",   rendimiento: 28.29, varianza: 0.159, ponderacion: 27.50, section: "FCI" },
  { fondo: "Balanz Infraestructura - Clase A",           banco: "Balanz",            tipo: "FCI Largo Plazo",   rendimiento: 28.55, varianza: 1.047, ponderacion: 23.31, section: "FCI" },
  { fondo: "Cocos Rendimiento - Clase A",                banco: "Cocos",             tipo: "FCI Corto Plazo",   rendimiento: 23.47, varianza: 0.065, ponderacion: 23.15, section: "FCI" },
  { fondo: "Pellegrini Renta Pesos - Clase A",           banco: "Banco Nación",      tipo: "FCI Mediano Plazo", rendimiento: 22.56, varianza: 0.076, ponderacion: 22.18, section: "FCI" },
  { fondo: "Champaquí Fondo Inmediato Plus - Clase A",   banco: "Bancor",            tipo: "FCI Corto Plazo",   rendimiento: 21.76, varianza: 0.070, ponderacion: 21.41, section: "FCI" },
  { fondo: "Toronto Trust Ahorro - Clase A",             banco: "Banco Hipotecario", tipo: "FCI Corto Plazo",   rendimiento: 21.47, varianza: 0.068, ponderacion: 21.13, section: "FCI" },
  { fondo: "Delta Pesos - Clase X",                      banco: "Personal Pay",      tipo: "FCI Corto Plazo",   rendimiento: 21.12, varianza: 0.059, ponderacion: 20.83, section: "FCI" },
  { fondo: "Delta Pesos - Clase X",                      banco: "Fiwind",            tipo: "FCI Corto Plazo",   rendimiento: 21.12, varianza: 0.059, ponderacion: 20.83, section: "FCI" },
  { fondo: "SBS Ahorro Pesos - Clase A",                 banco: "Ualá",              tipo: "FCI Corto Plazo",   rendimiento: 20.89, varianza: 0.058, ponderacion: 20.60, section: "FCI" },
  { fondo: "Mercado Fondo - Clase A",                    banco: "Mercado Pago",      tipo: "FCI Corto Plazo",   rendimiento: 20.75, varianza: 0.069, ponderacion: 20.40, section: "FCI" },
  { fondo: "Balanz Capital Money Market - Clase A",      banco: "Balanz",            tipo: "FCI Mediano Plazo", rendimiento: 20.60, varianza: 0.068, ponderacion: 20.25, section: "FCI" },
  { fondo: "Ualintec Ahorro Pesos - Clase A",            banco: "NaranjaX",          tipo: "FCI Mediano Plazo", rendimiento: 20.58, varianza: 0.077, ponderacion: 20.20, section: "FCI" },
  { fondo: "Pionero Pesos - Clase A",                    banco: "Banco Macro",       tipo: "FCI Mediano Plazo", rendimiento: 20.51, varianza: 0.073, ponderacion: 20.14, section: "FCI" },
  { fondo: "Champaquí Fondo Inmediato - Clase A",        banco: "Bancor",            tipo: "FCI Corto Plazo",   rendimiento: 20.40, varianza: 0.069, ponderacion: 20.06, section: "FCI" },
  { fondo: "Fima Premium - Clase P",                     banco: "Lemon",             tipo: "FCI Corto Plazo",   rendimiento: 20.47, varianza: 0.102, ponderacion: 19.96, section: "FCI" },
  { fondo: "Cocos Ahorro - Clase A",                     banco: "Cocos",             tipo: "FCI Corto Plazo",   rendimiento: 20.09, varianza: 0.071, ponderacion: 19.74, section: "FCI" },
  { fondo: "Pionero Pesos Plus - Clase A",               banco: "Banco Macro",       tipo: "FCI Corto Plazo",   rendimiento: 19.77, varianza: 0.075, ponderacion: 19.39, section: "FCI" },
  { fondo: "FBA Renta Pesos - Clase A",                  banco: "Banco BBVA",        tipo: "FCI Corto Plazo",   rendimiento: 19.27, varianza: 0.068, ponderacion: 18.93, section: "FCI" },
  { fondo: "ST Zero - Clase D",                          banco: "Let's Bit",         tipo: "FCI Corto Plazo",   rendimiento: 16.69, varianza: 0.067, ponderacion: 16.35, section: "FCI" },

];

/*
 * ──────────────────────────────────────────────────────────────
 * REGISTRO DE VALIDACIONES
 *
 * v3 — 07-05-2026
 *   · Corrección de campo "tipo" en todos los FCI:
 *     se reemplaza el valor genérico "Money Market" por la
 *     categoría real según columna Horizonte de la planilla
 *     (Flex / Med / Cor / Lar → FCI Flexible / Mediano Plazo /
 *     Corto Plazo / Largo Plazo)
 *
 * v2 — 07-05-2026
 *   · Datos actualizados con planilla Excel al 17-04-2026
 *   · Columna de referencia: "Rendim promedio TNA ult 30 días"
 *   · Fondos nuevos: Champaquí x4 (Bancor), Toronto Trust Renta
 *     Fija y Plus (Banco Hipotecario), Balanz Retorno Total,
 *     Balanz Infraestructura, FBA Renta Pesos (Banco BBVA)
 *   · Fondos removidos: Allaria Ahorro, Alpha Pesos, Adcap
 *   · Validación manual confirmada: 07-05-2026
 *
 * v1 — datos originales (pre 17-04-2026)
 *   · Validación manual confirmada: 07-05-2026
 * ──────────────────────────────────────────────────────────────
 */
