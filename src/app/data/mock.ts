export const EVENT_CATEGORIES = [
  'Todos',
  'Conciertos',
  'Música Electrónica',
  'Música en Vivo',
  'Festivales',
  'Teatro',
  'Musicales',
  'Comedia',
  'Deportes',
  'Arte y Cultura',
  'Conferencias',
  'Familiar',
] as const;

export type EventCategory = typeof EVENT_CATEGORIES[number];

// ── ARTISTAS ─────────────────────────────────────────────────
// Cada artista puede tener múltiples eventos (gira)
export const mockArtists = [
  {
    id: "a1",
    name: "Bad Bunny",
    genre: "Reggaeton / Trap Latino",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "El conejo malo más famoso del mundo. Sus giras agotan estadios en minutos.",
    isOnTour: true,
  },
  {
    id: "a2",
    name: "The Midnight",
    genre: "Synthwave / Dreampop",
    image: "https://images.unsplash.com/photo-1607313029691-fa108ddf807d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Dúo americano de synthwave con sonido retrofuturista de los 80s.",
    isOnTour: true,
  },
  {
    id: "a3",
    name: "DJs Varios",
    genre: "Música Electrónica",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Lineup internacional de los mejores DJs del circuito underground.",
    isOnTour: false,
  },
  {
    id: "a4",
    name: "Compañía Teatral Elite",
    genre: "Teatro / Musicales",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "La compañía teatral más reconocida de México con 20 años de trayectoria.",
    isOnTour: true,
  },
];

// ── EVENTOS ───────────────────────────────────────────────────
// artistId vincula con mockArtists — un artista puede tener N eventos (gira)
export const mockEvents = [
  // Bad Bunny — Gira 3 ciudades
  {
    id: "e1",
    artistId: "a1",
    title: "Bad Bunny — Most Wanted Tour",
    artist: "Bad Bunny",
    date: "2026-05-10",
    city: "Ciudad de México",
    venue: "Foro Sol",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2R8ZW58MXx8fHwxNzczNDk1MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Conciertos",
    recommended: true,
    bestSeller: true,
    adultsOnly: false,
    prices: { vip: 3500, oro: 2000, plata: 1200 },
    status: "active",
    organizerId: "eber.higuera@gmail.com",
    tourName: "Most Wanted Tour 2026",
    about: "Bad Bunny llega a México con su espectacular Most Wanted Tour. Un show de producción mundial con más de 2 horas de música, efectos visuales únicos y los éxitos que lo convirtieron en el artista más escuchado del planeta.",
    reviews: [
      { user: "Carlos M.", rating: 5, comment: "El mejor concierto de mi vida. Bad Bunny lo dio todo.", date: "2025-06-10" },
      { user: "Sofía R.", rating: 5, comment: "Increíble producción, valió cada peso.", date: "2025-06-11" },
    ]
  },
  {
    id: "e1b",
    artistId: "a1",
    title: "Bad Bunny — Most Wanted Tour",
    artist: "Bad Bunny",
    date: "2026-05-13",
    city: "Guadalajara",
    venue: "Estadio Akron",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2R8ZW58MXx8fHwxNzczNDk1MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Conciertos",
    recommended: true,
    bestSeller: true,
    adultsOnly: false,
    prices: { vip: 3200, oro: 1800, plata: 1000 },
    status: "active",
    organizerId: "eber.higuera@gmail.com",
    tourName: "Most Wanted Tour 2026",
    about: "La segunda parada de Bad Bunny en México. El Estadio Akron recibirá al conejo malo con el show completo del Most Wanted Tour.",
    reviews: []
  },
  {
    id: "e1c",
    artistId: "a1",
    title: "Bad Bunny — Most Wanted Tour",
    artist: "Bad Bunny",
    date: "2026-05-16",
    city: "Monterrey",
    venue: "Estadio BBVA",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2R8ZW58MXx8fHwxNzczNDk1MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Conciertos",
    recommended: false,
    bestSeller: true,
    adultsOnly: false,
    prices: { vip: 3200, oro: 1800, plata: 1000 },
    status: "active",
    organizerId: "eber.higuera@gmail.com",
    tourName: "Most Wanted Tour 2026",
    about: "Monterrey cierra la gira mexicana de Bad Bunny en el imponente Estadio BBVA. Última oportunidad para verlo en México.",
    reviews: []
  },
  // The Midnight — 2 ciudades
  {
    id: "e2",
    artistId: "a2",
    title: "Synthwave Dreams",
    artist: "The Midnight",
    date: "2026-06-20",
    city: "Guadalajara",
    venue: "Teatro Diana",
    image: "https://images.unsplash.com/photo-1607313029691-fa108ddf807d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NzM1MjQ4NDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Música en Vivo",
    recommended: true,
    bestSeller: false,
    adultsOnly: false,
    prices: { vip: 2000, oro: 1200, plata: 800 },
    status: "active",
    organizerId: "eber.higuera@gmail.com",
    tourName: "Synthwave Dreams Tour",
    about: "The Midnight trae su icónico sonido retrofuturista a México por primera vez. Una noche de synthwave, dreampop y nostalgia de los 80s.",
    reviews: [
      { user: "Ana L.", rating: 5, comment: "The Midnight en vivo es una experiencia que no tiene igual.", date: "2025-07-05" },
      { user: "Marco P.", rating: 5, comment: "Sonido increíble, producción muy cuidada.", date: "2025-07-06" },
    ]
  },
  {
    id: "e2b",
    artistId: "a2",
    title: "Synthwave Dreams",
    artist: "The Midnight",
    date: "2026-06-22",
    city: "Ciudad de México",
    venue: "Pepsi Center WTC",
    image: "https://images.unsplash.com/photo-1607313029691-fa108ddf807d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NzM1MjQ4NDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Música en Vivo",
    recommended: true,
    bestSeller: false,
    adultsOnly: false,
    prices: { vip: 2200, oro: 1400, plata: 900 },
    status: "active",
    organizerId: "eber.higuera@gmail.com",
    tourName: "Synthwave Dreams Tour",
    about: "La segunda parada de The Midnight en México. Ciudad de México recibe el Synthwave Dreams Tour en el Pepsi Center.",
    reviews: []
  },
  // Evento único — Comedia
  {
    id: "e3",
    artistId: "a3",
    title: "Neon Nights Festival",
    artist: "DJs Varios",
    date: "2026-07-05",
    city: "Ciudad de México",
    venue: "Parque Bicentenario",
    image: "https://images.unsplash.com/photo-1762537132884-cc6bbde0667a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFuZHVwJTIwY29tZWR5JTIwc3RhZ2V8ZW58MXx8fHwxNzczNTI0ODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Música Electrónica",
    recommended: false,
    bestSeller: true,
    adultsOnly: true,
    prices: { vip: 800, oro: 500, plata: 300 },
    status: "active",
    organizerId: "eber.higuera@gmail.com",
    tourName: null,
    about: "El festival de música electrónica más esperado del año. 12 horas de música non-stop con los mejores DJs del circuito internacional.",
    reviews: [
      { user: "Lupita G.", rating: 4, comment: "Increíble ambiente, lo mejor del año.", date: "2025-05-20" },
      { user: "Roberto S.", rating: 5, comment: "Producción de primer nivel.", date: "2025-05-21" },
    ]
  },
  // Compañía Teatral — gira musical
  {
    id: "e4",
    artistId: "a4",
    title: "El Fantasma de la Ópera",
    artist: "Compañía Teatral Elite",
    date: "2026-07-10",
    city: "Ciudad de México",
    venue: "Palacio de Bellas Artes",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwcGxheXxlbnwxfHx8fDE3NzM1MjQ4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Musicales",
    recommended: true,
    bestSeller: true,
    adultsOnly: false,
    prices: { vip: 2500, oro: 1500, plata: 900 },
    status: "active",
    organizerId: "other.organizer@gmail.com",
    tourName: "Gira Nacional 2026",
    about: "La producción más aclamada regresa al Palacio de Bellas Artes con elenco renovado y efectos especiales de última generación.",
    reviews: [
      { user: "Patricia H.", rating: 5, comment: "Una obra majestuosa.", date: "2025-08-15" },
      { user: "Fernando T.", rating: 5, comment: "La escenografía es impresionante.", date: "2025-08-16" },
    ]
  },
  {
    id: "e4b",
    artistId: "a4",
    title: "El Fantasma de la Ópera",
    artist: "Compañía Teatral Elite",
    date: "2026-07-18",
    city: "Guadalajara",
    venue: "Teatro Degollado",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwcGxheXxlbnwxfHx8fDE3NzM1MjQ4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Musicales",
    recommended: true,
    bestSeller: false,
    adultsOnly: false,
    prices: { vip: 2200, oro: 1300, plata: 800 },
    status: "active",
    organizerId: "other.organizer@gmail.com",
    tourName: "Gira Nacional 2026",
    about: "El Fantasma de la Ópera llega al histórico Teatro Degollado de Guadalajara.",
    reviews: []
  },
  {
    id: "e5",
    artistId: "a3",
    title: "Clásico de Leyendas",
    artist: "Equipos All-Star",
    date: "2026-08-12",
    city: "Guadalajara",
    venue: "Estadio Akron",
    image: "https://images.unsplash.com/photo-1565483276060-e6730c0cc6a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtfGVufDF8fHx8MTc3MzQ3MTQyNHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Deportes",
    recommended: false,
    bestSeller: false,
    adultsOnly: false,
    prices: { vip: 3000, oro: 1800, plata: 1000 },
    status: "expired",
    organizerId: "other.organizer@gmail.com",
    tourName: null,
    about: "Un partido histórico que reunirá a las leyendas más grandes del fútbol mexicano.",
    reviews: [
      { user: "Jorge N.", rating: 5, comment: "Ver a mis ídolos juntos fue un sueño.", date: "2025-09-05" },
    ]
  }
];

// Ciudades únicas para sugerencias de búsqueda
export const TOUR_CITIES = [...new Set(mockEvents.map(e => e.city))].sort();

export const mockSalesData = [
  { name: 'Ene', generados: 4000, boletos: 2400 },
  { name: 'Feb', generados: 3000, boletos: 1398 },
  { name: 'Mar', generados: 2000, boletos: 9800 },
  { name: 'Abr', generados: 2780, boletos: 3908 },
  { name: 'May', generados: 1890, boletos: 4800 },
  { name: 'Jun', generados: 2390, boletos: 3800 },
  { name: 'Jul', generados: 3490, boletos: 4300 },
];

export const mockRefunds = [
  { id: "R-1001", user: "juan.perez@gmail.com", event: "Bad Bunny CDMX", amount: 1500, status: "pending" },
  { id: "R-1002", user: "maria.gomez@outlook.com", event: "Synthwave", amount: 2000, status: "approved" },
  { id: "R-1003", user: "luis.rdz@hotmail.com", event: "Neon Nights", amount: 800, status: "pending" },
];
