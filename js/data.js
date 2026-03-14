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
 *   tipo         {string}  "Money Market" | "Cuenta Remunerada" | "Billetera"
 *   rendimiento  {number}  TNA en porcentaje
 *   varianza     {number|null}
 *   ponderacion  {number|null}
 *   limite       {string|undefined}  Tope de inversión
 *   nota         {string|undefined}  Condición especial
 *   section      {string}  "Rendimiento garantizado" | "Con condiciones especiales" | "FCI"
 */

const DATA = [

  /* ── Rendimiento garantizado ── */
  { fondo: "Carrefour Banco",  banco: "Carrefour",   tipo: "Cuenta Remunerada", rendimiento: 30.00, varianza: null, ponderacion: null, limite: "$4.228.800/mes", section: "Rendimiento garantizado" },
  { fondo: "NaranjaX",         banco: "NaranjaX",    tipo: "Cuenta Remunerada", rendimiento: 25.00, varianza: null, ponderacion: null, limite: "$1M",           section: "Rendimiento garantizado" },
  { fondo: "Fiwind",            banco: "Fiwind",      tipo: "Billetera",          rendimiento: 24.00, varianza: null, ponderacion: null, limite: "$750K",         section: "Rendimiento garantizado" },
  { fondo: "Ualá",              banco: "Ualá",        tipo: "Cuenta Remunerada", rendimiento: 23.00, varianza: null, ponderacion: null, limite: "$1M",           section: "Rendimiento garantizado" },

  /* ── Con condiciones especiales ── */
  { fondo: "Ualá Plus 2",  banco: "Ualá",        tipo: "Cuenta Remunerada", rendimiento: 29.00, varianza: null, ponderacion: null, limite: "$1M", nota: "Acumulá $500.000 entre inversiones, consumos y cobros.", section: "Con condiciones especiales" },
  { fondo: "Ualá Plus 1",  banco: "Ualá",        tipo: "Cuenta Remunerada", rendimiento: 26.00, varianza: null, ponderacion: null, limite: "$1M", nota: "Acumulá $250.000 entre inversiones, consumos y cobros.", section: "Con condiciones especiales" },
  { fondo: "Cresium",      banco: "Cresium",     tipo: "Cuenta Remunerada", rendimiento: 22.53, varianza: null, ponderacion: null, limite: "Sin límite", nota: "Solo Personas Jurídicas.",                         section: "Con condiciones especiales" },
  { fondo: "Banco Nación", banco: "Banco Nación",tipo: "Cuenta Remunerada", rendimiento: 20.00, varianza: null, ponderacion: null, limite: "$2M",        nota: "Exclusivo para clientes de cartera consumo.",      section: "Con condiciones especiales" },
  { fondo: "Supervielle",  banco: "Supervielle", tipo: "Cuenta Remunerada", rendimiento: 19.50, varianza: null, ponderacion: null, limite: "$1M",        nota: "Solo Clientes Plan Sueldo.",                       section: "Con condiciones especiales" },

  /* ── FCI ── */
  { fondo: "Pellegrini Crecimiento - Clase A",            banco: "Banco Nación",  tipo: "Money Market", rendimiento: 53.72, varianza: 0.655, ponderacion: 50.44, section: "FCI" },
  { fondo: "Pellegrini Renta Fija II - Clase A",          banco: "Banco Nación",  tipo: "Money Market", rendimiento: 49.15, varianza: 0.581, ponderacion: 46.24, section: "FCI" },
  { fondo: "Balanz Institucional - Clase A",              banco: "Balanz",        tipo: "Money Market", rendimiento: 50.63, varianza: 3.486, ponderacion: 33.20, section: "FCI" },
  { fondo: "Pionero Renta Ahorro - Clase A",              banco: "Banco Macro",   tipo: "Money Market", rendimiento: 42.30, varianza: 0.344, ponderacion: 40.58, section: "FCI" },
  { fondo: "Balanz Capital Ahorro - Clase A",             banco: "Balanz",        tipo: "Money Market", rendimiento: 40.53, varianza: 0.328, ponderacion: 38.89, section: "FCI" },
  { fondo: "Balanz Long Pesos - Clase A",                 banco: "Balanz",        tipo: "Money Market", rendimiento: 40.35, varianza: 0.604, ponderacion: 37.33, section: "FCI" },
  { fondo: "Balanz Lecaps - Clase A",                     banco: "Balanz",        tipo: "Money Market", rendimiento: 36.98, varianza: 0.472, ponderacion: 34.62, section: "FCI" },
  { fondo: "Pionero FF",                                  banco: "Banco Macro",   tipo: "Money Market", rendimiento: 36.77, varianza: 0.227, ponderacion: 35.64, section: "FCI" },
  { fondo: "Balanz Renta Fija Estrategica - Clase A",     banco: "Balanz",        tipo: "Money Market", rendimiento: 35.62, varianza: 0.318, ponderacion: 34.03, section: "FCI" },
  { fondo: "Cocos Pesos Plus - Clase A",                  banco: "Cocos",         tipo: "Money Market", rendimiento: 29.52, varianza: 0.146, ponderacion: 28.79, section: "FCI" },
  { fondo: "Balanz Capital Abierto Pymes FCI - Clase A",  banco: "Balanz",        tipo: "Money Market", rendimiento: 29.42, varianza: 0.158, ponderacion: 28.63, section: "FCI" },
  { fondo: "Pellegrini Renta Fija Plus - Clase A",        banco: "Banco Nación",  tipo: "Money Market", rendimiento: 29.31, varianza: 0.480, ponderacion: 26.91, section: "FCI" },
  { fondo: "Pellegrini Renta Pesos - Clase A",            banco: "Banco Nación",  tipo: "Money Market", rendimiento: 28.27, varianza: 0.039, ponderacion: 28.07, section: "FCI" },
  { fondo: "Pellegrini Renta Fija Ahorro - Clase A",      banco: "Banco Nación",  tipo: "Money Market", rendimiento: 27.73, varianza: 0.468, ponderacion: 25.39, section: "FCI" },
  { fondo: "Cocos Rendimiento - Clase A",                 banco: "Cocos",         tipo: "Money Market", rendimiento: 26.87, varianza: 0.032, ponderacion: 26.71, section: "FCI" },
  { fondo: "Ualintec Ahorro Pesos - Clase A",             banco: "NaranjaX",      tipo: "Money Market", rendimiento: 25.51, varianza: 0.045, ponderacion: 25.29, section: "FCI" },
  { fondo: "Mercado Fondo - Clase A",                     banco: "Mercado Pago",  tipo: "Money Market", rendimiento: 25.48, varianza: 0.040, ponderacion: 25.28, section: "FCI" },
  { fondo: "Delta Pesos - Clase X",        banco: "Personal Pay",  tipo: "Money Market", rendimiento: 25.45, varianza: 0.037, ponderacion: 25.27, section: "FCI" },
  { fondo: "Delta Pesos - Clase X",              banco: "Fiwind",        tipo: "Money Market", rendimiento: 25.45, varianza: 0.037, ponderacion: 25.27, section: "FCI" },
  { fondo: "Balanz Capital Money Market - Clase A",       banco: "Balanz",        tipo: "Money Market", rendimiento: 25.06, varianza: 0.040, ponderacion: 24.87, section: "FCI" },
  { fondo: "Fima Premium - Clase P",                      banco: "Lemon",         tipo: "Money Market", rendimiento: 24.73, varianza: 0.093, ponderacion: 24.27, section: "FCI" },
  { fondo: "Pionero Pesos - Clase A",                     banco: "Banco Macro",   tipo: "Money Market", rendimiento: 24.67, varianza: 0.037, ponderacion: 24.49, section: "FCI" },
  { fondo: "Pionero Pesos Plus - Clase A",                banco: "Banco Macro",   tipo: "Money Market", rendimiento: 24.39, varianza: 0.052, ponderacion: 24.13, section: "FCI" },
  { fondo: "SBS Ahorro Pesos - Clase A",                  banco: "Ualá",          tipo: "Money Market", rendimiento: 24.09, varianza: 0.033, ponderacion: 23.92, section: "FCI" },
  { fondo: "Cocos Ahorro - Clase A",                      banco: "Cocos",         tipo: "Money Market", rendimiento: 23.00, varianza: 0.053, ponderacion: 22.74, section: "FCI" },
  { fondo: "Allaria Ahorro - Clase E",                    banco: "Prex",          tipo: "Money Market", rendimiento: 22.59, varianza: null,  ponderacion: null,  section: "FCI" },
  { fondo: "Alpha Pesos - Clase A",                       banco: "ICBC",          tipo: "Money Market", rendimiento: 22.50, varianza: null,  ponderacion: null,  section: "FCI" },
  { fondo: "Adcap Ahorro Pesos Fondo de Dinero - Clase A",banco: "Adcap",         tipo: "Money Market", rendimiento: 22.28, varianza: null,  ponderacion: null,  section: "FCI" },
  { fondo: "Toronto Trust Ahorro - Clase A",              banco: "Toronto Trust", tipo: "Money Market", rendimiento: 22.25, varianza: null,  ponderacion: null,  section: "FCI" },
  { fondo: "ST Zero - Clase D",                           banco: "Let's Bit",     tipo: "Money Market", rendimiento: 22.18, varianza: 0.029, ponderacion: 22.03, section: "FCI" },

];
