import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Ticket, Lock } from 'lucide-react';
import { mockEvents } from '../data/mock';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router';

export const MyTickets = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const navigate = useNavigate();
  const userName = sessionStorage.getItem('userName');

  useEffect(() => {
    if (!userName) return;
    const myTickets = mockEvents.slice(0, 2).map((event) => ({
      id: Math.random().toString(36).substring(2, 10).toUpperCase(),
      event,
      zone: 'VIP',
      seat: `A-${Math.floor(Math.random() * 100)}`,
      qrData: `TICKETMARKET-${Math.random().toString(36).substring(2, 15).toUpperCase()}`
    }));
    setTickets(myTickets);
  }, [userName]);

  // Pantalla de acceso requerido
  if (!userName) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] pt-28 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#87CEEB]/20 to-[#8A2BE2]/20 border border-white/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-[#FF69B4]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Acceso Requerido</h1>
          <p className="text-gray-400 mb-8">
            Necesitas iniciar sesión para ver tus boletos. Crea una cuenta o ingresa con tus datos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.dispatchEvent(new Event('open-auth-modal'))}
            >
              Iniciar Sesión
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/')}>
              Ir al inicio
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <h1 className="text-3xl font-bold text-white mb-2">Mis Boletos</h1>
        <p className="text-gray-400 mb-10">Presenta el código QR en la entrada del evento.</p>

        {tickets.length === 0 ? (
          <div className="text-center py-20 bg-[#111] rounded-3xl border border-white/5 shadow-2xl">
            <Ticket className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No tienes boletos</h2>
            <p className="text-gray-400">Aún no has comprado ningún boleto.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {tickets.map((ticket, idx) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative overflow-hidden rounded-3xl bg-[#111] border border-white/10 shadow-2xl group flex flex-col md:flex-row"
              >
                {/* Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#87CEEB]/10 via-[#FF69B4]/5 to-[#8A2BE2]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Info Lateral */}
                <div className="p-6 flex-1 border-b md:border-b-0 md:border-r border-white/10 border-dashed relative z-10">
                  <div className="text-xs uppercase font-bold text-[#87CEEB] tracking-widest mb-1">{ticket.event.category}</div>
                  <h3 className="text-2xl font-bold text-white mb-1 line-clamp-1">{ticket.event.title}</h3>
                  <p className="text-gray-400 text-sm mb-6">{ticket.event.artist}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-300">
                      <Calendar size={16} className="mr-3 text-[#FF69B4]" />
                      {new Date(ticket.event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Clock size={16} className="mr-3 text-[#FF69B4]" />
                      20:00 hrs
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <MapPin size={16} className="mr-3 text-[#FF69B4]" />
                      {ticket.event.city}
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <div className="bg-white/5 rounded-lg px-4 py-2 flex-1 text-center border border-white/5">
                      <div className="text-xs text-gray-500 uppercase">Zona</div>
                      <div className="font-bold text-white">{ticket.zone}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg px-4 py-2 flex-1 text-center border border-white/5">
                      <div className="text-xs text-gray-500 uppercase">Asiento</div>
                      <div className="font-bold text-white">{ticket.seat}</div>
                    </div>
                  </div>
                </div>

                {/* QR Section */}
                <div className="p-6 flex flex-col items-center justify-center bg-white/5 relative z-10 md:w-48">
                  <div className="bg-white p-3 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] mb-4">
                    <QRCodeSVG 
                      value={ticket.qrData} 
                      size={120} 
                      fgColor="#000"
                      level="H"
                    />
                  </div>
                  <div className="text-xs text-gray-500 font-mono text-center tracking-widest uppercase">
                    ID: {ticket.id}
                  </div>
                  {/* Corte circular de ticket */}
                  <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0A0A0A] border-r border-white/10"></div>
                  <div className="md:hidden absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0A0A0A] border-b border-white/10"></div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};