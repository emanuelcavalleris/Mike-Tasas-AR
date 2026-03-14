# Mike — Análisis de Tasas 🇦🇷

Comparador de tasas de FCI, cuentas remuneradas y billeteras digitales de Argentina.

## 🗂️ Arquitectura — Page Object Model

```
mike-tasas/
├── index.html          ← Estructura HTML pura (sin lógica ni estilos inline)
├── css/
│   └── styles.css      ← Todos los estilos, variables CSS y responsive
└── js/
    ├── data.js         ← [DATOS]     Array DATA con todos los fondos
    ├── utils.js        ← [UTILS]     Funciones puras: colores, formato, helpers
    ├── renderer.js     ← [PAGE OBJ] Construye y actualiza el DOM
    ├── filterPage.js   ← [PAGE OBJ] Estado de filtros, sort y lógica de negocio
    └── app.js          ← [ENTRADA]  Inicialización y event listeners
```

### Responsabilidades por archivo

| Archivo | Responsabilidad | Accede al DOM |
|---|---|---|
| `data.js` | Datos crudos únicamente | ✗ |
| `utils.js` | Cálculos y formateo puros | ✗ |
| `renderer.js` | Construir HTML / actualizar DOM | ✓ |
| `filterPage.js` | Estado, filtros, sort, acciones | ✓ (solo lee inputs) |
| `app.js` | Wiring de eventos, inicialización | ✓ |

### Flujo de datos

```
DATA (data.js)
  └─► FilterPage.getFilteredRows()   ← aplica filtros + sort
        └─► Renderer.renderCards()   ← pinta cards (mobile)
        └─► Renderer.renderTable()   ← pinta tabla (desktop)
        └─► Renderer.updateResultsCount()
        └─► Renderer.updateTableHeaders()
```

## ✨ Features

- 📊 FCI, cuentas remuneradas y billeteras digitales
- 🎨 Gradiente automático de color por tasa
- 🔽 Ordenar por tasa, banco, ponderación o varianza
- 🔎 Filtro por entidad, tipo y búsqueda libre
- 📱 Cards en mobile (sin scroll horizontal)
- 🖥️ Tabla completa en desktop
- ✅ Vanilla JS — sin frameworks ni dependencias

## 🌐 Publicar en GitHub Pages

1. Subí el repo a GitHub
2. Settings → Pages → Source: `main` / `/ (root)`
3. Tu sitio queda en `https://TU-USUARIO.github.io/mike-tasas`

## 📝 Agregar un nuevo fondo

Editá `js/data.js` y agregá un objeto al array `DATA`:

```js
{
  fondo:       "Nombre del fondo",
  banco:       "Nombre de la entidad",
  tipo:        "Money Market",          // o "Cuenta Remunerada" / "Billetera"
  rendimiento: 25.00,                   // TNA en %
  varianza:    0.045,                   // null si no aplica
  ponderacion: 25.29,                   // null si no aplica
  limite:      "$1M",                   // opcional
  nota:        "Condición especial",    // opcional
  section:     "FCI",                   // "FCI" | "Rendimiento garantizado" | "Con condiciones especiales"
}
```
