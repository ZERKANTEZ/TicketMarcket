import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { Ticket, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube, Send, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/8 text-white mt-20">

      {/* ── Newsletter banner ── */}
      <div className="bg-gradient-to-r from-[#87CEEB]/10 via-[#FF69B4]/10 to-[#8A2BE2]/10 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-10 max-w-6xl py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">No te pierdas ningún evento</h3>
            <p className="text-gray-400 text-sm">Recibe las mejores preventas y novedades directo en tu correo.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-3 w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 text-green-400 font-semibold text-sm">
                <CheckCircle2 size={18} />
                ¡Suscrito correctamente!
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="flex-1 min-w-0 md:w-72 bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#87CEEB] focus:ring-1 focus:ring-[#87CEEB] transition-all"
                  required
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-gradient-to-r from-[#FF69B4] to-[#8A2BE2] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all flex-shrink-0"
                >
                  <Send size={15} /> Suscribirse
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="container mx-auto px-6 md:px-10 max-w-6xl py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Columna 1 — Brand */}
          <div className="lg:col-span-1">
            <NavLink to="/" className="flex items-center gap-2.5 mb-5 w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#87CEEB] via-[#FF69B4] to-[#8A2BE2] flex items-center justify-center shadow-[0_0_15px_rgba(255,105,180,0.3)]">
                <Ticket className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Ticket<span className="text-[#FF69B4]">Market</span>
              </span>
            </NavLink>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              La plataforma líder en México para comprar y vender boletos a los mejores eventos de música, teatro, deporte y cultura.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Instagram size={16} />, label: 'Instagram', href: '#' },
                { icon: <Twitter size={16} />, label: 'Twitter / X', href: '#' },
                { icon: <Facebook size={16} />, label: 'Facebook', href: '#' },
                { icon: <Youtube size={16} />, label: 'YouTube', href: '#' },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-[#FF69B4]/40 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2 — Nosotros */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300 mb-5">Nosotros</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {[
                { label: '¿Quiénes somos?', anchor: '#nosotros' },
                { label: 'Misión y visión', anchor: '#mision' },
                { label: 'Nuestro equipo', anchor: '#equipo' },
                { label: 'Blog y noticias', anchor: '#blog' },
                { label: 'Trabaja con nosotros', anchor: '#empleo' },
                { label: 'Prensa', anchor: '#prensa' },
              ].map(({ label, anchor }) => (
                <li key={label}>
                  <a href={anchor} className="hover:text-[#FF69B4] transition-colors hover:translate-x-1 inline-block">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 — Ayuda */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300 mb-5">Ayuda</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {[
                { label: 'Centro de ayuda', anchor: '#ayuda' },
                { label: 'Preguntas frecuentes', anchor: '#faq' },
                { label: 'Política de reembolsos', anchor: '#reembolsos' },
                { label: 'Términos y condiciones', anchor: '#terminos' },
                { label: 'Aviso de privacidad', anchor: '#privacidad' },
                { label: 'Organizadores', anchor: '#organizadores' },
              ].map(({ label, anchor }) => (
                <li key={label}>
                  <a href={anchor} className="hover:text-[#87CEEB] transition-colors hover:translate-x-1 inline-block">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4 — Contáctanos */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300 mb-5">Contáctanos</h4>
            <ul className="space-y-4 text-sm text-gray-400 mb-6">
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-[#FF69B4] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">Correo</p>
                  <a href="mailto:hola@ticketmarket.mx" className="hover:text-[#FF69B4] transition-colors">
                    hola@ticketmarket.mx
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-[#87CEEB] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">Teléfono</p>
                  <a href="tel:+528001234567" className="hover:text-[#87CEEB] transition-colors">
                    800 123 4567
                  </a>
                  <p className="text-xs text-gray-600 mt-0.5">Lun–Vie 9:00 – 18:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#8A2BE2] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">Oficinas</p>
                  <p>Av. Paseo de la Reforma 250</p>
                  <p>Ciudad de México, CDMX</p>
                </div>
              </li>
            </ul>

            {/* Badge de seguridad */}
            <div className="flex items-center gap-2 bg-white/4 border border-white/8 rounded-xl px-3 py-2.5 w-fit">
              <span className="text-green-400 text-base">🔒</span>
              <div>
                <p className="text-xs font-semibold text-gray-300">Compra 100% segura</p>
                <p className="text-xs text-gray-600">Pago encriptado SSL</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 md:px-10 max-w-6xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} TicketMarket. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#terminos" className="hover:text-gray-400 transition-colors">Términos</a>
            <a href="#privacidad" className="hover:text-gray-400 transition-colors">Privacidad</a>
            <a href="#cookies" className="hover:text-gray-400 transition-colors">Cookies</a>
          </div>
          <p className="flex items-center gap-1">
            Hecho con <span className="text-[#FF69B4]">♥</span> en México
          </p>
        </div>
      </div>
    </footer>
  );
};
