import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Users, AlertTriangle, Check, X as XIcon, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Admin = () => {
  const [requests, setRequests] = useState([
    { id: 'REQ-01', organizer: 'Prod. En Vivo', type: 'Nuevo Evento', description: 'Creación de "Festival Sunset 2026"', status: 'pending' },
    { id: 'REQ-02', organizer: 'Teatro Local', type: 'Cambio de Precio', description: 'Aumento de 10% en boletos VIP para "El Cisne"', status: 'pending' },
    { id: 'REQ-03', organizer: 'Deportes Mx', type: 'Actualización Imagen', description: 'Nuevo banner para "Final de Campeonato"', status: 'pending' },
  ]);

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: action } : req));
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header y Supervisión Global */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Centro de Control</h1>
          <p className="text-gray-500">Supervisión global y gestión de aprobaciones.</p>
        </div>
        <div className="px-4 py-2 bg-[#8A2BE2]/10 text-[#8A2BE2] rounded-lg font-bold flex items-center gap-2">
          <ShieldCheck size={20} />
          Nivel de Acceso: Máximo
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
            <Users size={28} />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Usuarios Registrados</div>
            <div className="text-3xl font-bold text-gray-900">45,231</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-pink-50 flex items-center justify-center text-pink-500">
            <AlertTriangle size={28} />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Alertas del Sistema</div>
            <div className="text-3xl font-bold text-gray-900">2</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="text-sm text-gray-500 font-medium mb-2">Estado de la Plataforma</div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-bold text-green-600">Operativa al 100%</span>
          </div>
        </div>
      </div>

      {/* Lista de Aprobaciones */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Solicitudes Pendientes de Organizadores</h2>
          <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
            {requests.filter(r => r.status === 'pending').length} Pendientes
          </span>
        </div>
        <div className="p-4 grid gap-4">
          {requests.map((request) => (
            <div key={request.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-xs text-gray-400 bg-white px-2 py-1 rounded border border-gray-200">{request.id}</span>
                  <span className="text-sm font-bold text-[#8A2BE2]">{request.type}</span>
                </div>
                <h3 className="font-bold text-gray-900">{request.description}</h3>
                <p className="text-sm text-gray-500">Solicitado por: <span className="font-medium text-gray-700">{request.organizer}</span></p>
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                {request.status === 'pending' ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleAction(request.id, 'rejected')} className="flex-1 md:flex-none border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300">
                      <XIcon size={16} className="mr-1" /> Rechazar
                    </Button>
                    <Button variant="tertiary" size="sm" onClick={() => handleAction(request.id, 'approved')} className="flex-1 md:flex-none">
                      <Check size={16} className="mr-1" /> Aprobar
                    </Button>
                  </>
                ) : (
                  <span className={cn(
                    "px-4 py-2 rounded-lg text-sm font-bold w-full text-center md:w-auto",
                    request.status === 'approved' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  )}>
                    {request.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};