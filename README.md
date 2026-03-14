# Mike — Análisis de Tasas 🇦🇷

Comparador de tasas de rendimiento de fondos comunes de inversión (FCI), cuentas remuneradas y billeteras digitales de Argentina.

## 🚀 Demo

Abrí `index.html` directamente en el navegador, o publicalo en GitHub Pages.

## ✨ Features

- 📊 Datos de FCI, cuentas remuneradas y billeteras digitales
- 🎨 Gradiente automático de color por tasa (gris → azul → verde)
- 🔽 Ordenar por tasa, banco, ponderación o varianza
- 🔎 Filtro por entidad, tipo y búsqueda de texto libre
- 📱 Versión mobile con cards (sin scroll horizontal)
- 🖥️ Versión desktop con tabla completa
- ✅ Sin dependencias externas (solo Google Fonts)

## 📁 Estructura

```
mike-tasas/
├── index.html      # App completa (single file)
└── README.md
```

## 🌐 Publicar en GitHub Pages

1. Subí este repositorio a GitHub
2. Andá a **Settings → Pages**
3. En *Source* elegí `main` branch y carpeta `/ (root)`
4. ¡Listo! Tu sitio va a estar en `https://tu-usuario.github.io/mike-tasas`

## 📝 Actualizar los datos

Los datos están en el array `DATA` dentro del `<script>` en `index.html`. Cada entrada tiene esta estructura:

```js
{
  fondo: "Nombre del fondo",
  banco: "Nombre del banco o billetera",
  tipo: "Money Market" | "Cuenta Remunerada" | "Billetera",
  rendimiento: 25.00,        // TNA en porcentaje
  varianza: 0.045,           // null si no aplica
  ponderacion: 25.29,        // null si no aplica
  limite: "$1M",             // opcional
  nota: "Condición especial", // opcional
  section: "FCI" | "Rendimiento garantizado" | "Con condiciones especiales"
}
```

## 🛠️ Tecnologías

- HTML5 / CSS3 / JavaScript vanilla
- Google Fonts: Syne + DM Mono
