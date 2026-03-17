import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, CheckCircle2, ChevronRight, AlertCircle, Info, Lock } from 'lucide-react';
import { mockEvents } from '../data/mock';
import { Button } from '../components/Button';
import { cn } from '../lib/utils';

export const PurchaseFlow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find(e => e.id === id);
  const userName = sessionStorage.getItem('userName');

  const [step, setStep] = useState(1);
  const [ticketType, setTicketType] = useState<'vip' | 'oro' | 'plata' | null>(null);
  const [quantities, setQuantities] = useState({ adult: 1, child: 0 });
  const [formData, setFormData] = useState({ name: '', email: '', card: '', exp: '', cvc: '' });

  if (!event) {
    return <div className="min-h-screen flex items-center justify-center text-white text-2xl">Evento no encontrado</div>;
  }

  // Guard: require login to purchase
  if (!userName) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] pt-28 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF69B4]/20 to-[#8A2BE2]/20 border border-white/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-[#FF69B4]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Inicia Sesión para Comprar</h1>
          <p className="text-gray-400 mb-2">Necesitas una cuenta para adquirir boletos para:</p>
          <p className="text-[#87CEEB] font-semibold text-lg mb-8">"{event.title}"</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.dispatchEvent(new Event('open-auth-modal'))}
            >
              Iniciar Sesión
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/')}>
              Volver
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const steps = [
    { num: 1, title: 'Selección' },
    { num: 2, title: 'Datos' },
    { num: 3, title: 'Pago' }
  ];

  const totalTickets = quantities.adult + quantities.child;
  
  // Cálculo de precio (Los niños podrían tener descuento, pero usaremos el mismo precio base por zona para simplificar, o 50% para niños)
  const calculateTotal = () => {
    if (!ticketType) return 0;
    const basePrice = event.prices[ticketType];
    const childPrice = basePrice * 0.5; // Niños pagan mitad
    return (quantities.adult * basePrice) + (quantities.child * childPrice);
  };

  const nextStep = () => {
    if (step === 1 && !ticketType) return;
    setStep(s => Math.min(s + 1, 3));
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular procesamiento
    setTimeout(() => {
      navigate('/my-tickets');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-4xl px-4">
        
        {/* Cabecera del Evento */}
        <div className="bg-[#111] rounded-2xl p-6 mb-8 flex items-center gap-6 border border-white/10 shadow-2xl">
          <img src={event.image} alt={event.title} className="w-24 h-24 rounded-xl object-cover shadow-lg" />
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
            <p className="text-gray-400">{event.city} • {new Date(event.date).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Barra de Progreso */}
        <div className="flex justify-between items-center mb-10 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 rounded-full z-0"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#87CEEB] via-[#FF69B4] to-[#8A2BE2] -translate-y-1/2 rounded-full z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
          
          {steps.map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-colors duration-300",
                step >= s.num ? "bg-gradient-to-br from-[#87CEEB] to-[#8A2BE2] text-white shadow-[0_0_15px_rgba(138,43,226,0.5)]" : "bg-[#1A1A1A] border-2 border-white/20 text-gray-500"
              )}>
                {step > s.num ? <CheckCircle2 size={24} /> : s.num}
              </div>
              <span className={cn("mt-2 text-sm font-medium", step >= s.num ? "text-white" : "text-gray-500")}>{s.title}</span>
            </div>
          ))}
        </div>

        {/* Contenido de los Pasos */}
        <div className="bg-[#111] border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Adornos de Glassmorphism */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#8A2BE2] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#87CEEB] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 pointer-events-none"></div>

          <AnimatePresence mode="wait">
            
            {/* PASO 1: SELECCIÓN */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative z-10"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Selecciona tus Boletos</h2>
                
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {(['vip', 'oro', 'plata'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setTicketType(type)}
                      className={cn(
                        "p-5 rounded-2xl border-2 text-left transition-all",
                        ticketType === type 
                          ? "border-[#FF69B4] bg-[#FF69B4]/10 shadow-[0_0_20px_rgba(255,105,180,0.2)]" 
                          : "border-white/10 hover:border-white/30 bg-black/40"
                      )}
                    >
                      <div className="uppercase tracking-widest text-xs font-bold text-[#87CEEB] mb-1">{type}</div>
                      <div className="text-3xl font-bold text-white mb-2">${event.prices[type]}</div>
                      <div className="text-sm text-gray-400">Acceso a zona {type}</div>
                    </button>
                  ))}
                </div>

                {ticketType && (
                  <div className="bg-black/40 rounded-2xl p-6 border border-white/10 animate-fade-in-up">
                    <h3 className="text-lg font-semibold text-white mb-4">Cantidad</h3>
                    <div className="space-y-4">
                      {/* Adultos */}
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <div className="text-white font-medium">Adulto</div>
                          <div className="text-sm text-gray-400">${event.prices[ticketType]} c/u</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button onClick={() => setQuantities(q => ({...q, adult: Math.max(1, q.adult - 1)}))} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">-</button>
                          <span className="text-xl font-bold text-white w-4 text-center">{quantities.adult}</span>
                          <button onClick={() => setQuantities(q => ({...q, adult: Math.min(10, q.adult + 1)}))} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">+</button>
                        </div>
                      </div>

                      {/* Niños - Lógica de Ocultar si es Solo Adultos */}
                      {!event.adultsOnly ? (
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                          <div>
                            <div className="text-white font-medium">Niño (Menor de 12)</div>
                            <div className="text-sm text-gray-400">50% descuento • ${(event.prices[ticketType] * 0.5)} c/u</div>
                          </div>
                          <div className="flex items-center gap-4">
                            <button onClick={() => setQuantities(q => ({...q, child: Math.max(0, q.child - 1)}))} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">-</button>
                            <span className="text-xl font-bold text-white w-4 text-center">{quantities.child}</span>
                            <button onClick={() => setQuantities(q => ({...q, child: Math.min(10, q.child + 1)}))} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">+</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                          <AlertCircle size={18} />
                          Este evento es exclusivo para mayores de edad. No se admiten boletos para niños.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* PASO 2: DATOS */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative z-10"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Datos de Contacto</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Nombre Completo</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#87CEEB] focus:ring-1 focus:ring-[#87CEEB] outline-none transition-all"
                      placeholder="Juan Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Correo Electrónico (Para recibir tus boletos)</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#87CEEB] focus:ring-1 focus:ring-[#87CEEB] outline-none transition-all"
                      placeholder="juan@ejemplo.com"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-4 p-4 bg-white/5 rounded-xl">
                    <Info size={18} className="text-[#8A2BE2]" />
                    Tus boletos se enviarán a este correo con un código QR único para el acceso.
                  </div>
                </div>
              </motion.div>
            )}

            {/* PASO 3: PAGO (Estilo Stripe) */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative z-10"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Pago Seguro</h2>
                    <form id="payment-form" onSubmit={handlePayment} className="space-y-4">
                      <div className="bg-black/40 border border-white/10 rounded-xl p-4 space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Tarjeta de Crédito / Débito</label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              type="text" 
                              required
                              maxLength={19}
                              value={formData.card}
                              onChange={e => setFormData({...formData, card: e.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim()})}
                              className="w-full bg-transparent border-b border-white/10 py-2 pl-10 text-white placeholder-gray-600 focus:border-[#FF69B4] outline-none font-mono tracking-widest"
                              placeholder="0000 0000 0000 0000"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Vencimiento</label>
                            <input 
                              type="text" 
                              required
                              maxLength={5}
                              value={formData.exp}
                              onChange={e => setFormData({...formData, exp: e.target.value})}
                              className="w-full bg-transparent border-b border-white/10 py-2 text-white placeholder-gray-600 focus:border-[#FF69B4] outline-none font-mono"
                              placeholder="MM/AA"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">CVC</label>
                            <input 
                              type="text" 
                              required
                              maxLength={4}
                              value={formData.cvc}
                              onChange={e => setFormData({...formData, cvc: e.target.value})}
                              className="w-full bg-transparent border-b border-white/10 py-2 text-white placeholder-gray-600 focus:border-[#FF69B4] outline-none font-mono"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] p-6 rounded-2xl border border-white/5 shadow-2xl h-fit">
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-4">Resumen de Compra</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-gray-300">
                        <span>Boletos {ticketType?.toUpperCase()} x{totalTickets}</span>
                        <span className="font-mono">${calculateTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-400 text-sm">
                        <span>Cargos por servicio</span>
                        <span className="font-mono">${(calculateTotal() * 0.1).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-white text-xl font-bold border-t border-white/10 pt-4">
                      <span>Total a Pagar</span>
                      <span className="text-[#87CEEB] font-mono">${(calculateTotal() * 1.1).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botones de Navegación del Stepper */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/10 relative z-10">
            {step > 1 ? (
              <Button variant="ghost" onClick={prevStep}>Atrás</Button>
            ) : <div></div>}
            
            {step < 3 ? (
              <Button 
                variant="primary" 
                onClick={nextStep} 
                disabled={step === 1 && !ticketType}
                className="flex items-center"
              >
                Continuar <ChevronRight size={18} className="ml-1" />
              </Button>
            ) : (
              <Button 
                form="payment-form" 
                type="submit" 
                variant="secondary" 
                className="flex items-center w-full md:w-auto"
              >
                Pagar ${ (calculateTotal() * 1.1).toLocaleString() } <CheckCircle2 size={18} className="ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};