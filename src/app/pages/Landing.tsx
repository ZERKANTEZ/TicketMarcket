import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Star, TrendingUp, Search, X, SlidersHorizontal, Route } from 'lucide-react';
import { mockEvents, mockArtists, EVENT_CATEGORIES, TOUR_CITIES } from '../data/mock';
import { Button } from '../components/Button';
import { cn } from '../lib/utils';

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    title: "Vive la Música al Máximo",
    subtitle: "Consigue tus boletos para los mejores festivales del año.",
    eventId: "e1",
    cta: "Ver Bad Bunny Tour",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    title: "El Arte en su Esplendor",
    subtitle: "Descubre musicales y obras de teatro exclusivas.",
    eventId: "e4",
    cta: "Ver El Fantasma",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1607313029691-fa108ddf807d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    title: "Synthwave Dreams Tour",
    subtitle: "The Midnight llega a México por primera vez.",
    eventId: "e2",
    cta: "Ver The Midnight",
  },
];

export const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filter, setFilter] = useState<'all' | 'bestSeller' | 'recommended'>('all');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [showCategoryBar, setShowCategoryBar] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % heroSlides.length), 7000);
    return () => clearInterval(timer);
  }, []);

  // Cerrar sugerencias al hacer click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!suggestionsRef.current?.contains(e.target as Node) &&
          !searchRef.current?.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const nextSlide = () => setCurrentSlide(p => (p + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide(p => p === 0 ? heroSlides.length - 1 : p - 1);

  // Sugerencias dinámicas basadas en lo que se escribe
  const suggestions = searchQuery.length >= 1 ? [
    ...mockArtists
      .filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(a => ({ type: 'artist' as const, label: a.name, sub: a.isOnTour ? `En gira · ${mockEvents.filter(e => e.artistId === a.id && e.status === 'active').length} fechas` : a.genre, id: a.id })),
    ...TOUR_CITIES
      .filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(c => ({ type: 'city' as const, label: c, sub: `${mockEvents.filter(e => e.city === c && e.status === 'active').length} eventos disponibles`, id: c })),
    ...mockEvents
      .filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()) && e.status === 'active')
      .slice(0, 3)
      .map(e => ({ type: 'event' as const, label: e.title, sub: `${e.city} · ${new Date(e.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}`, id: e.id })),
  ].slice(0, 6) : [];

  const handleSuggestionClick = (s: typeof suggestions[0]) => {
    if (s.type === 'event') {
      navigate(`/event/${s.id}`);
    } else {
      setSearchQuery(s.label);
    }
    setShowSuggestions(false);
  };

  const filteredEvents = mockEvents.filter(event => {
    const matchesFilter =
      filter === 'bestSeller' ? event.bestSeller :
      filter === 'recommended' ? event.recommended : true;
    const matchesCategory = selectedCategory === 'Todos' ? true : event.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' ? true : (
      event.title.toLowerCase().includes(query) ||
      event.artist.toLowerCase().includes(query) ||
      event.city.toLowerCase().includes(query) ||
      event.category.toLowerCase().includes(query) ||
      (event.venue || '').toLowerCase().includes(query) ||
      (event.tourName || '').toLowerCase().includes(query)
    );
    return matchesFilter && matchesCategory && matchesSearch;
  });

  // Artistas en gira para el banner
  const artistsOnTour = mockArtists.filter(a => a.isOnTour);

  const clearSearch = () => { setSearchQuery(''); searchRef.current?.focus(); };
  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'Todos' || filter !== 'all';

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">

      {/* ── HERO CAROUSEL FULL SCREEN ── */}
      <section className="relative w-full h-[100svh] min-h-[500px] max-h-[900px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.9 }} className="absolute inset-0">
            <img src={heroSlides[currentSlide].image} alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/50 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-24">
          <div className="container mx-auto px-5 md:px-10">
            <AnimatePresence mode="wait">
              <motion.div key={currentSlide} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.6 }} className="max-w-xl">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FF69B4] mb-3 bg-[#FF69B4]/10 border border-[#FF69B4]/20 px-3 py-1 rounded-full">
                  Evento Destacado
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 leading-none tracking-tight">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-base md:text-xl text-gray-300 mb-6 leading-relaxed">
                  {heroSlides[currentSlide].subtitle}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" size="lg"
                    onClick={() => navigate(`/buy/${heroSlides[currentSlide].eventId}`)}>
                    Comprar Boletos
                  </Button>
                  <Button variant="outline" size="lg"
                    onClick={() => navigate(`/event/${heroSlides[currentSlide].eventId}`)}
                    className="border-white/30 text-white hover:bg-white/10">
                    {heroSlides[currentSlide].cta}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button onClick={prevSlide}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all">
          <ChevronLeft size={20} />
        </button>
        <button onClick={nextSlide}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all">
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {heroSlides.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSlide(idx)}
              className={cn("h-1.5 rounded-full transition-all duration-500",
                idx === currentSlide ? "bg-[#FF69B4] w-8" : "bg-white/30 hover:bg-white/60 w-1.5")} />
          ))}
        </div>
      </section>

      {/* ── ARTISTAS EN GIRA ── */}
      {artistsOnTour.length > 0 && (
        <section className="border-y border-white/5 bg-[#0d0d0d] py-4 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-3">
              <Route size={15} className="text-[#FF69B4] flex-shrink-0" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF69B4]">Artistas en gira</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
              {artistsOnTour.map(artist => {
                const tourDates = mockEvents.filter(e => e.artistId === artist.id && e.status === 'active');
                return (
                  <button key={artist.id}
                    onClick={() => { setSearchQuery(artist.name); setShowSuggestions(false); }}
                    className="flex-shrink-0 flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-[#FF69B4]/40 rounded-2xl px-4 py-2.5 transition-all">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF69B4]/30 to-[#8A2BE2]/30 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                      {artist.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-white whitespace-nowrap">{artist.name}</div>
                      <div className="text-xs text-[#FF69B4]">{tourDates.length} fecha{tourDates.length !== 1 ? 's' : ''}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── BARRA DE BÚSQUEDA STICKY ── */}
      <section className="sticky top-[60px] z-30 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/5 py-3 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row gap-2 items-stretch">

            {/* Search con sugerencias */}
            <div className="relative flex-1">
              <Search size={16} className={cn("absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors",
                searchFocused ? "text-[#87CEEB]" : "text-gray-500")} />
              <input ref={searchRef} type="text" value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setShowSuggestions(e.target.value.length >= 1); }}
                onFocus={() => { setSearchFocused(true); if (searchQuery.length >= 1) setShowSuggestions(true); }}
                onBlur={() => setSearchFocused(false)}
                placeholder="Buscar artistas, ciudades, eventos..."
                className={cn("w-full bg-white/5 border rounded-xl py-2.5 pl-10 pr-9 text-sm text-white placeholder-gray-500 outline-none transition-all",
                  searchFocused ? "border-[#87CEEB]/50 ring-1 ring-[#87CEEB]/20" : "border-white/10 hover:border-white/20")}
              />
              {searchQuery && (
                <button onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  <X size={14} />
                </button>
              )}

              {/* Dropdown de sugerencias */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div ref={suggestionsRef}
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-1.5 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                    {suggestions.map((s, i) => (
                      <button key={i} onMouseDown={() => handleSuggestionClick(s)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors text-left">
                        <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0",
                          s.type === 'artist' ? "bg-[#FF69B4]/15 text-[#FF69B4]" :
                          s.type === 'city'   ? "bg-[#87CEEB]/15 text-[#87CEEB]" :
                                                "bg-[#8A2BE2]/15 text-[#8A2BE2]")}>
                          {s.type === 'artist' ? '🎤' : s.type === 'city' ? '📍' : '🎟'}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-white truncate">{s.label}</div>
                          <div className="text-xs text-gray-500 truncate">{s.sub}</div>
                        </div>
                        <span className={cn("text-xs px-2 py-0.5 rounded-full ml-auto flex-shrink-0",
                          s.type === 'artist' ? "bg-[#FF69B4]/10 text-[#FF69B4]" :
                          s.type === 'city'   ? "bg-[#87CEEB]/10 text-[#87CEEB]" :
                                                "bg-[#8A2BE2]/10 text-[#8A2BE2]")}>
                          {s.type === 'artist' ? 'Artista' : s.type === 'city' ? 'Ciudad' : 'Evento'}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filtros — scroll horizontal en móvil */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-shrink-0">
              {(['all', 'bestSeller', 'recommended'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={cn("px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 border",
                    filter === f
                      ? f === 'all' ? "bg-white/15 text-white border-white/20"
                        : f === 'bestSeller' ? "bg-[#FF69B4]/20 text-[#FF69B4] border-[#FF69B4]/30"
                        : "bg-[#87CEEB]/20 text-[#87CEEB] border-[#87CEEB]/30"
                      : "bg-white/5 text-gray-400 border-white/5 hover:border-white/15 hover:text-white")}>
                  {f === 'bestSeller' && <TrendingUp size={12} />}
                  {f === 'recommended' && <Star size={12} />}
                  {f === 'all' ? 'Todos' : f === 'bestSeller' ? 'Top Ventas' : 'Recomendados'}
                </button>
              ))}
              <button onClick={() => setShowCategoryBar(v => !v)}
                className={cn("px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border flex-shrink-0",
                  showCategoryBar || selectedCategory !== 'Todos'
                    ? "bg-[#8A2BE2]/20 text-[#8A2BE2] border-[#8A2BE2]/30"
                    : "bg-white/5 text-gray-400 border-white/5 hover:border-white/15 hover:text-white")}>
                <SlidersHorizontal size={12} />
                Categoría
                {selectedCategory !== 'Todos' && (
                  <span className="bg-[#8A2BE2] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">1</span>
                )}
              </button>
            </div>
          </div>

          {/* Pills de categorías */}
          <AnimatePresence>
            {showCategoryBar && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                <div className="flex gap-2 flex-wrap pt-3">
                  {EVENT_CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)}
                      className={cn("px-3 py-1.5 rounded-full text-xs font-semibold transition-all border",
                        selectedCategory === cat
                          ? "bg-[#8A2BE2] text-white border-[#8A2BE2]"
                          : "bg-white/5 text-gray-400 border-white/10 hover:border-white/25 hover:text-white")}>
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── GRILLA DE EVENTOS ── */}
      <section className="container mx-auto px-4 md:px-6 py-10 max-w-7xl">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">
              {hasActiveFilters ? 'Resultados' : 'Eventos Destacados'}
            </h2>
            <p className="text-gray-400 text-sm">
              {filteredEvents.length} evento{filteredEvents.length !== 1 ? 's' : ''} encontrado{filteredEvents.length !== 1 ? 's' : ''}
              {selectedCategory !== 'Todos' && <span> en <span className="text-[#8A2BE2] font-semibold">{selectedCategory}</span></span>}
              {searchQuery && <span> · "<span className="text-[#87CEEB] font-semibold">{searchQuery}</span>"</span>}
            </p>
          </div>
          {hasActiveFilters && (
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); setFilter('all'); }}
              className="text-sm text-gray-500 hover:text-[#FF69B4] transition-colors flex items-center gap-1">
              <X size={13} /> Limpiar
            </button>
          )}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-[#111] rounded-3xl border border-white/5">
            <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Sin resultados</h3>
            <p className="text-gray-400 mb-6 text-sm">No encontramos eventos con esos criterios.</p>
            <Button variant="ghost" onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); setFilter('all'); }}>
              Limpiar filtros
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {filteredEvents.map((event, i) => {
            // Detectar si es parte de una gira
            const isOnTour = event.tourName && mockEvents.filter(e => e.artistId === event.artistId && e.status === 'active').length > 1;
            const tourCount = isOnTour ? mockEvents.filter(e => e.artistId === event.artistId && e.status === 'active').length : 0;

            return (
              <motion.div key={event.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#8A2BE2]/50 transition-all hover:shadow-[0_0_20px_rgba(138,43,226,0.12)] group flex flex-col cursor-pointer"
                onClick={() => navigate(`/event/${event.id}`)}>
                <div className="relative h-44 overflow-hidden">
                  <img src={event.image} alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                    {event.bestSeller && (
                      <span className="bg-[#FF69B4] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">Top</span>
                    )}
                    {event.adultsOnly && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">+18</span>
                    )}
                  </div>
                  {/* Badge de gira */}
                  {isOnTour && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-[#FF69B4]/30 px-2.5 py-1 rounded-full">
                      <Route size={10} className="text-[#FF69B4]" />
                      <span className="text-xs text-[#FF69B4] font-semibold">{tourCount} ciudades</span>
                    </div>
                  )}
                  {event.status === 'expired' && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white font-bold text-lg tracking-widest uppercase border-2 border-white px-4 py-2 rounded">Caducado</span>
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="text-xs text-[#87CEEB] font-bold uppercase tracking-wider mb-1.5">{event.category}</div>
                  <h3 className="text-base font-bold text-white mb-0.5 line-clamp-1">{event.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-1">{event.artist}</p>

                  <div className="space-y-1.5 mt-auto mb-3 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="text-[#8A2BE2] flex-shrink-0" />
                      {new Date(event.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-[#8A2BE2] flex-shrink-0" />
                      {event.venue ? `${event.venue}, ${event.city}` : event.city}
                    </div>
                  </div>

                  {event.reviews && event.reviews.length > 0 && (
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => {
                        const avg = (event.reviews as any[]).reduce((a, r) => a + r.rating, 0) / event.reviews.length;
                        return <Star key={i} size={11} className={i < Math.round(avg) ? "text-yellow-400 fill-yellow-400" : "text-gray-700"} />;
                      })}
                      <span className="text-xs text-gray-500 ml-0.5">({event.reviews.length})</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-xs text-gray-500 block">Desde</span>
                      <span className="text-base font-bold text-white">${event.prices.plata.toLocaleString()}</span>
                    </div>
                    <Button variant="tertiary" size="sm" disabled={event.status === 'expired'}
                      onClick={e => { e.stopPropagation(); navigate(`/buy/${event.id}`); }}>
                      Comprar
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
