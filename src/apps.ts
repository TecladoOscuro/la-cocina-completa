export interface AppEntry {
  id: string
  name: string
  emoji: string
  label: string
  url: string
  color: string
}

export const apps: AppEntry[] = [
  {
    id: 'paella',
    name: 'Mi Paella',
    emoji: '🥘',
    label: 'Paella',
    url: 'https://tecladooscuro.github.io/mi-paella/',
    color: '#d97706',
  },
  {
    id: 'cenas',
    name: 'Últimas Cenas',
    emoji: '🔪',
    label: 'Cenas',
    url: 'https://tecladooscuro.github.io/last-supper/',
    color: '#dc2626',
  },
  {
    id: 'banquetes',
    name: 'Banquetes del Pasado',
    emoji: '🏛️',
    label: 'Banquetes',
    url: 'https://tecladooscuro.github.io/historical-recipes/',
    color: '#ca8a04',
  },
  {
    id: 'cine',
    name: 'Platos de Cine',
    emoji: '🎬',
    label: 'Cine',
    url: 'https://tecladooscuro.github.io/cinema-recipes/',
    color: '#7c3aed',
  },
  {
    id: 'alta',
    name: 'Alta Cocina',
    emoji: '⭐',
    label: 'Alta Cocina',
    url: 'https://tecladooscuro.github.io/cocinitas-avanzado/',
    color: '#d4af37',
  },
  {
    id: 'tm6',
    name: 'TM6 Recetas',
    emoji: '🤖',
    label: 'TM6',
    url: 'https://tecladooscuro.github.io/TM6/',
    color: '#059669',
  },
]
