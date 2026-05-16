# La Cocina Completa

Todas tus apps de recetas culinarias en un solo lugar. PWA optimizada para iPhone con navegación por tabs inferior.

**[la-cocina-completa.pages.dev](https://tecladooscuro.github.io/la-cocina-completa/)**

## Apps incluidas

| Tab | App | URL independiente |
|-----|-----|------------------|
| 🥘 Paella | Mi Paella | [mi-paella](https://tecladooscuro.github.io/mi-paella/) |
| 🔪 Cenas | Últimas Cenas | [last-supper](https://tecladooscuro.github.io/last-supper/) |
| 🏛️ Banquetes | Banquetes del Pasado | [historical-recipes](https://tecladooscuro.github.io/historical-recipes/) |
| 🎬 Cine | Platos de Cine | [cinema-recipes](https://tecladooscuro.github.io/cinema-recipes/) |
| ⭐ Alta Cocina | Alta Cocina | [cocinitas-avanzado](https://tecladooscuro.github.io/cocinitas-avanzado/) |
| 🤖 TM6 | TM6 Recetas | [TM6](https://tecladooscuro.github.io/TM6/) |

## Instalar en iPhone

1. Abre la [app](https://tecladooscuro.github.io/la-cocina-completa/) en **Safari**
2. Toca **Compartir** → **Añadir a pantalla de inicio**
3. Se abrirá sin barra de navegación, como una app nativa

## Stack

React 19 · Vite 8 · TypeScript 6 · TailwindCSS 4 · vite-plugin-pwa

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
npm run preview  # previsualiza el build
```

El deploy a GitHub Pages es automático al pushear a `main`.
