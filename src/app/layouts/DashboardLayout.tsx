import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router';
import { Menu, X, Wallet, CalendarRange, Shield, LogOut, Ticket, Home } from 'lucide-react';
import { cn } from '../lib/utils';

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const role = sessionStorage.getItem('role');
  const userName = sessionStorage.getItem('userName') || 'Usuario';
  const userEmail = sessionStorage.getItem('userEmail') || 'usuario@correo.com';

  // Redirigir a inicio si no es un rol con acceso al dashboard
  useEffect(() => {
    if (!role || role === 'user') {
      navigate('/');
    }
  }, [role, navigate]);

  // Lista de enlaces según el rol
  const allLinks = [
    { name: 'Tesorero', path: '/dashboard/treasurer', icon: <Wallet size={20} />, roles: ['treasurer'] },
    { name: 'Mis Eventos', path: '/dashboard/organizer', icon: <CalendarRange size={20} />, roles: ['organizer'] },
    { name: 'Administrador', path: '/dashboard/admin', icon: <Shield size={20} />, roles: ['admin'] },
  ];

  const links = allLinks.filter(link => link.roles.includes(role || ''));

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      
      {/* Overlay Móvil */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden",
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar Oscura */}
      <aside 
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-950 border-r border-white/10 text-white flex flex-col transition-transform duration-300 transform",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#87CEEB] via-[#FF69B4] to-[#8A2BE2] flex items-center justify-center shadow-[0_0_15px_rgba(255,105,180,0.4)]">
              <Ticket className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Ticket<span className="text-[#FF69B4]">Market</span>
            </span>
          </NavLink>
          <button className="lg:hidden text-gray-400" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 px-2">Panel de Control</div>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                isActive 
                  ? "bg-gradient-to-r from-[#87CEEB]/20 to-[#FF69B4]/20 text-white border border-white/10 shadow-lg" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <span className={cn(location.pathname === link.path ? "text-[#FF69B4]" : "")}>
                {link.icon}
              </span>
              {link.name}
            </NavLink>
          ))}

          <div className="my-6 border-t border-white/5 pt-6">
             <NavLink
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <Home size={20} />
              Volver al Sitio
            </NavLink>
          </div>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#87CEEB] to-[#8A2BE2] flex items-center justify-center font-bold">
              {userName.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{userName}</div>
              <div className="text-xs text-gray-400 truncate">{userEmail}</div>
            </div>
            <button className="text-gray-500 hover:text-white" onClick={() => {
              sessionStorage.clear();
              navigate('/');
            }}>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Área de Trabajo Clara */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8FAFC]">
        {/* Header móvil */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600">
            <Menu size={24} />
          </button>
          <span className="ml-4 font-bold text-gray-800">Panel de Control</span>
        </div>
        
        {/* Contenido Principal */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 text-slate-800">
          <Outlet />
        </div>
      </main>
    </div>
  );
};