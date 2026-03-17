import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Star, ChevronLeft, Users, Clock, Share2, Heart, Tag, Route } from 'lucide-react';
import { mockEvents } from '../data/mock';
import { Button } from '../components/Button';
import { cn } from '../lib/utils';

export const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find(e => e.id === id);
  const [liked, setLiked] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '', hoverRating: 0 });
  const [reviews, setReviews] = useState((event as any)?.reviews || []);
  const userName = sessionStorage.getItem('userName');

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white text-2xl pt-24">
        Evento no encontrado
      </div>
    );
  }

  const avgRating = reviews.length
    ? (reviews.reduce((a: number, r: any) => a + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  // Otras fechas de la misma gira
  const tourDates = (event as any).tourName
    ? mockEvents.filter(e => e.id !== event.id && (e as any).artistId === (event as any).artistId && e.status !== 'expired')
    : [];

  // Related events: same category, different id
  const relatedEvents = mockEvents
    .filter(e => e.id !== event.id && e.category === event.category && e.status !== 'expired')
    .slice(0, 3);

  const suggestedEvents = relatedEvents.length >= 2
    ? relatedEvents
    : mockEvents.filter(e => e.id !== event.id && e.status !== 'expired').slice(0, 3);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.rating || !newReview.comment.trim()) return;
    const review = {
      user: userName || 'Anónimo',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews((prev: any[]) => [review, ...prev]);
    setNewReview({ rating: 0, comment: '', hoverRating: 0 });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-20">

      {/* ── HERO BANNER ── */}
      <div className="relative w-full h-[45vh] min-h-[280px] overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/50 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-4 md:left-8 flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors bg-black/30 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full"
        >
          <ChevronLeft size={16} /> Volver
        </button>

        {/* Badges top right */}
        <div className="absolute top-24 right-4 md:right-8 flex flex-col gap-2">
          {event.bestSeller && (
            <span className="bg-[#FF69B4] text-white text-xs font-bold px-3 py-1 rounded-full">Top Ventas</span>
          )}
          {event.adultsOnly && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">+18</span>
          )}
          {event.status === 'expired' && (
            <span className="bg-gray-700 text-gray-300 text-xs font-bold px-3 py-1 rounded-full">Caducado</span>
          )}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">

            {/* Title block */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-[#87CEEB] font-bold uppercase tracking-widest">{event.category}</span>
              </div>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <h1 className="text-3xl md:text-5xl font-black leading-tight max-w-xl">{event.title}</h1>
                <div className="flex gap-3 flex-shrink-0 pt-2">
                  <button
                    onClick={() => setLiked(v => !v)}
                    className={cn(
                      "w-10 h-10 rounded-full border flex items-center justify-center transition-all",
                      liked ? "bg-[#FF69B4]/20 border-[#FF69B4]/50 text-[#FF69B4]" : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                    )}
                  >
                    <Heart size={18} className={liked ? "fill-[#FF69B4]" : ""} />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-[#87CEEB] text-lg font-semibold mt-2">{event.artist}</p>

              {/* Meta row */}
              <div className="flex flex-wrap gap-4 mt-5 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-[#8A2BE2]" />
                  {new Date(event.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-[#8A2BE2]" />
                  20:00 hrs
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#8A2BE2]" />
                  {event.city}
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={15} className="text-[#8A2BE2]" />
                  {event.category}
                </div>
              </div>

              {/* Rating summary */}
              {avgRating && (
                <div className="flex items-center gap-3 mt-5 p-4 bg-white/5 rounded-2xl border border-white/8 w-fit">
                  <div className="text-4xl font-black text-yellow-400">{avgRating}</div>
                  <div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={16} className={i <= Math.round(Number(avgRating)) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} />
                      ))}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{reviews.length} reseña{reviews.length !== 1 ? 's' : ''}</div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* ── ACERCA DE ── */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#87CEEB] to-[#8A2BE2]" />
                Acerca del Evento
              </h2>
              <p className="text-gray-300 leading-relaxed text-base">
                {(event as any).about || 'Información del evento próximamente.'}
              </p>
            </motion.section>

            {/* ── FECHAS DE GIRA ── */}
            {tourDates.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#FF69B4] to-[#87CEEB]" />
                  Otras fechas de la gira
                  <span className="text-sm font-normal text-[#FF69B4] ml-1">{(event as any).tourName}</span>
                </h2>
                <div className="space-y-3">
                  {tourDates.map(e => (
                    <div key={e.id} onClick={() => navigate(`/event/${e.id}`)}
                      className="flex items-center justify-between p-4 bg-[#111] border border-white/5 rounded-2xl hover:border-[#FF69B4]/30 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF69B4]/20 to-[#8A2BE2]/20 border border-white/10 flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-[#FF69B4] leading-none">
                            {new Date(e.date).toLocaleDateString('es-ES', { day: 'numeric' })}
                          </span>
                          <span className="text-xs text-gray-400 leading-none mt-0.5">
                            {new Date(e.date).toLocaleDateString('es-ES', { month: 'short' })}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <MapPin size={13} className="text-[#8A2BE2]" />
                            <span className="text-sm font-semibold text-white">{e.city}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{(e as any).venue}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-xs text-gray-500 block">Desde</span>
                          <span className="text-sm font-bold text-white">${e.prices.plata.toLocaleString()}</span>
                        </div>
                        <Button variant="outline" size="sm"
                          onClick={ev => { ev.stopPropagation(); navigate(`/buy/${e.id}`); }}
                          className="border-white/20 text-white hover:bg-white/10 text-xs">
                          Boletos
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* ── RESEÑAS ── */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#FF69B4] to-[#8A2BE2]" />
                Reseñas
                {reviews.length > 0 && (
                  <span className="text-sm font-normal text-gray-400 ml-2">({reviews.length})</span>
                )}
              </h2>

              {/* Form para nueva reseña */}
              {userName ? (
                <form onSubmit={handleSubmitReview} className="bg-[#111] rounded-2xl p-5 border border-white/8 mb-6">
                  <p className="text-sm font-semibold text-gray-300 mb-3">Escribe tu reseña</p>

                  {/* Star picker */}
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(i => (
                      <button
                        key={i}
                        type="button"
                        onMouseEnter={() => setNewReview(r => ({ ...r, hoverRating: i }))}
                        onMouseLeave={() => setNewReview(r => ({ ...r, hoverRating: 0 }))}
                        onClick={() => setNewReview(r => ({ ...r, rating: i }))}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          size={24}
                          className={cn(
                            "transition-colors",
                            i <= (newReview.hoverRating || newReview.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-600"
                          )}
                        />
                      </button>
                    ))}
                  </div>

                  <textarea
                    value={newReview.comment}
                    onChange={e => setNewReview(r => ({ ...r, comment: e.target.value }))}
                    placeholder="Comparte tu experiencia..."
                    rows={3}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm placeholder-gray-600 focus:border-[#87CEEB] focus:ring-1 focus:ring-[#87CEEB] outline-none resize-none"
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    size="sm"
                    className="mt-3"
                    disabled={!newReview.rating || !newReview.comment.trim()}
                  >
                    Publicar Reseña
                  </Button>
                </form>
              ) : (
                <div className="bg-white/5 rounded-xl p-4 border border-white/8 mb-6 text-sm text-gray-400">
                  <button onClick={() => navigate('/')} className="text-[#FF69B4] font-semibold hover:underline">
                    Inicia sesión
                  </button>
                  {' '}para dejar tu reseña.
                </div>
              )}

              {/* Lista reseñas */}
              {reviews.length === 0 ? (
                <p className="text-gray-500 text-sm">Sé el primero en dejar una reseña.</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-[#111] rounded-xl p-4 border border-white/5"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#87CEEB] to-[#8A2BE2] flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {review.user.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">{review.user}</div>
                            <div className="text-xs text-gray-500">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex gap-0.5 flex-shrink-0">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} size={13} className={i <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-700"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed pl-12">{review.comment}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.section>

            {/* ── LOS FANS TAMBIÉN VIERON ── */}
            {suggestedEvents.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#87CEEB] to-[#FF69B4]" />
                  Los fans también vieron
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {suggestedEvents.map(e => (
                    <div
                      key={e.id}
                      onClick={() => navigate(`/event/${e.id}`)}
                      className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#8A2BE2]/40 transition-all cursor-pointer group"
                    >
                      <div className="relative h-36 overflow-hidden">
                        <img src={e.image} alt={e.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-3">
                        <div className="text-xs text-[#87CEEB] font-bold uppercase tracking-wider mb-1">{e.category}</div>
                        <h3 className="text-sm font-bold text-white line-clamp-1">{e.title}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{e.city} · Desde ${e.prices.plata.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* RIGHT COLUMN — STICKY BUY CARD */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-[#111] border border-white/10 rounded-3xl p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <span className="text-xs text-gray-500 block mb-0.5">Precio desde</span>
                    <span className="text-3xl font-black text-white">${event.prices.plata.toLocaleString()}</span>
                    <span className="text-gray-500 text-sm ml-1">MXN</span>
                  </div>
                  {avgRating && (
                    <div className="flex items-center gap-1 bg-yellow-400/10 px-3 py-1.5 rounded-full border border-yellow-400/20">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-400 font-bold text-sm">{avgRating}</span>
                    </div>
                  )}
                </div>

                {/* Zonas */}
                <div className="space-y-2 mb-5">
                  {(['plata', 'oro', 'vip'] as const).map(zone => (
                    <div key={zone} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          zone === 'vip' ? "bg-yellow-400" : zone === 'oro' ? "bg-orange-400" : "bg-[#87CEEB]"
                        )} />
                        <span className="text-sm font-medium text-gray-300 uppercase">{zone}</span>
                      </div>
                      <span className="text-sm font-bold text-white">${event.prices[zone].toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="tertiary"
                  className="w-full"
                  size="lg"
                  disabled={event.status === 'expired'}
                  onClick={() => navigate(`/buy/${event.id}`)}
                >
                  {event.status === 'expired' ? 'Evento Caducado' : 'Comprar Boletos'}
                </Button>

                <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 justify-center">
                  <Users size={13} />
                  <span>Más de 1,200 personas ya compraron</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
