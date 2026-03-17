import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { Menu, X, Ticket } from 'lucide-react';
import { Button } from './Button';
import { AuthModal } from './AuthModal';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escuchar evento global para abrir el modal de login desde cualquier página
  useEffect(() => {
    const handleOpenAuth = () => setIsAuthOpen(true);
    window.addEventListener('open-auth-modal', handleOpenAuth);
    return () => window.removeEventListener('open-auth-modal', handleOpenAuth);
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const role = sessionStorage.getItem('role');
  const userName = sessionStorage.getItem('userName');

  const navLinks = [
    { name: 'Inicio', path: '/' },
    ...(userName ? [{ name: 'Mis Boletos', path: '/my-tickets' }] : []),
  ];

  const handleLogout = () => {
    sessionStorage.clear();
    setIsMobileMenuOpen(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled 
            ? "bg-black/40 backdrop-blur-md border-b border-white/10 shadow-lg py-3" 
            : "bg-transparent py-3 md:py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-2 z-50">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#87CEEB] via-[#FF69B4] to-[#8A2BE2] flex items-center justify-center shadow-[0_0_15px_rgba(255,105,180,0.4)]">
                <Ticket className="text-white w-6 h-6" />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 tracking-tight">
                Ticket<span className="text-[#FF69B4]">Market</span>
              </span>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <nav className="flex items-center space-x-6">
                {navLinks.slice(1).map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      cn(
                        "text-sm font-medium transition-colors hover:text-[#FF69B4]",
                        isActive ? "text-[#FF69B4]" : "text-gray-300"
                      )
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                {/* Enlace al Dashboard si tiene el rol adecuado */}
                {role && role !== 'user' && (
                  <NavLink
                    to={`/dashboard/${role}`}
                    className="text-sm font-bold text-[#87CEEB] hover:text-white transition-colors"
                  >
                    Panel de Control
                  </NavLink>
                )}
              </nav>

              {userName ? (
                <Button variant="outline" size="sm" onClick={handleLogout} className="border-white/20 text-white">
                  Cerrar Sesión
                </Button>
              ) : (
                <Button variant="secondary" size="sm" onClick={() => setIsAuthOpen(true)}>
                  Iniciar Sesión
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white z-50 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/80 backdrop-blur-xl lg:hidden flex flex-col justify-center px-6 transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="absolute top-24 left-6 right-6">
          <nav className="flex flex-col space-y-6 text-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "text-xl font-medium transition-colors",
                    isActive ? "text-[#FF69B4]" : "text-white"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            {role && role !== 'user' && (
              <NavLink
                to={`/dashboard/${role}`}
                className="text-xl font-bold text-[#87CEEB] transition-colors"
              >
                Panel de Control
              </NavLink>
            )}

            <div className="pt-6 border-t border-white/10">
              {userName ? (
                <Button variant="outline" className="w-full border-white/20 text-white" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              ) : (
                <Button variant="primary" className="w-full" onClick={() => { setIsMobileMenuOpen(false); setIsAuthOpen(true); }}>
                  Iniciar Sesión
                </Button>
              )}
            </div>
          </nav>
        </div>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};