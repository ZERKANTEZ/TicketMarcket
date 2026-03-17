import React, { useState } from 'react';
import { mockEvents, EVENT_CATEGORIES } from '../../data/mock';
import { Button } from '../../components/Button';
import { Plus, Edit2, Clock, Trash2, TrendingUp, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Organizer = () => {
  const myEmail = sessionStorage.getItem('userEmail') || '';
  const [events, setEvents] = useState(mockEvents.filter(e => e.organizerId === myEmail));
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id: string) => {
    if(confirm('¿Estás seguro de eliminar este evento?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const handlePostpone = (id: string) => {
    alert(`Se abrirá el modal para posponer el evento con ID: ${id}`);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header y Métricas de Organizador */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Eventos</h1>
          <p className="text-gray-500">Gestiona y analiza el rendimiento en tiempo real.</p>
        </div>
        <Button variant="primary" onClick={() => setShowForm(!showForm)} className="flex items-center gap-2">
          <Plus size={18} /> {showForm ? 'Cerrar Formulario' : 'Crear Evento'}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Eventos Activos</div>
          <div className="text-3xl font-bold text-gray-900">4</div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Boletos Vendidos (Hoy)</div>
          <div className="text-3xl font-bold text-[#FF69B4] flex items-center gap-2">
            124 <TrendingUp size={20} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Ingresos Estimados</div>
          <div className="text-3xl font-bold text-[#87CEEB]">$45,200</div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Eventos Caducados</div>
          <div className="text-3xl font-bold text-gray-400">12</div>
        </div>
      </div>

      {/* Creador de Eventos */}
      {showForm && (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 animate-fade-in-up">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Detalles del Nuevo Evento</h2>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Evento creado (Simulación)"); setShowForm(false); }}>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Evento</label>
                  <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-[#8A2BE2] outline-none" placeholder="Ej. Most Wanted Tour" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Artista / Grupo</label>
                  <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-[#8A2BE2] outline-none" placeholder="Nombre del artista o banda" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de la Gira
                    <span className="text-gray-400 font-normal ml-2">— opcional, si es parte de una gira</span>
                  </label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-[#8A2BE2] outline-none" placeholder="Ej. Most Wanted Tour 2026" />
                  <p className="text-xs text-gray-400 mt-1">Si llenas este campo, los eventos del mismo artista con el mismo nombre de gira se agruparán y aparecerán como fechas múltiples.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-[#8A2BE2] outline-none text-gray-700">
                    <option value="">Selecciona una categoría...</option>
                    {EVENT_CATEGORIES.filter(c => c !== 'Todos').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                    <input type="date" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-[#8A2BE2] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                    <input type="time" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-[#8A2BE2] outline-none" defaultValue="20:00" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                    <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-[#8A2BE2] outline-none" placeholder="Ciudad" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recinto / Venue</label>
                    <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-[#8A2BE2] outline-none" placeholder="Ej. Foro Sol, Estadio Akron" />
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-[#8A2BE2] rounded border-gray-300 focus:ring-[#8A2BE2]" />
                  <span className="text-sm font-medium text-gray-700">Evento Solo para Adultos (+18)</span>
                </label>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imagen Promocional</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                    <ImageIcon size={32} className="mb-2 text-[#8A2BE2]" />
                    <span className="text-sm font-medium">Haz clic o arrastra una imagen aquí</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio VIP</label>
                    <input type="number" required min="0" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-[#8A2BE2] outline-none" placeholder="$0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio Oro</label>
                    <input type="number" required min="0" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-[#8A2BE2] outline-none" placeholder="$0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio Plata</label>
                    <input type="number" required min="0" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-[#8A2BE2] outline-none" placeholder="$0" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Límite de Boletos Total</label>
                  <input type="number" required min="1" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-[#8A2BE2] outline-none" placeholder="Ej. 5000" />
                </div>
              </div>
            </div>

            {/* Acerca del Evento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Acerca del Evento
                <span className="text-gray-400 font-normal ml-2">— aparece en la página del evento</span>
              </label>
              <textarea
                required
                rows={5}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-[#8A2BE2] outline-none resize-none"
                placeholder="Describe el evento: artistas invitados, formato del show, experiencia para el asistente, horarios, restricciones de acceso, etc."
              />
              <p className="text-xs text-gray-400 mt-1">Esta descripción se muestra en la página del evento y ayuda a los compradores a decidirse.</p>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)} className="text-gray-600 mr-2">Cancelar</Button>
              <Button type="submit" variant="secondary">Publicar Evento</Button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de Eventos */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Gestión de Eventos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-500">
                <th className="p-4">Evento</th>
                <th className="p-4">Fecha</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Ventas</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => {
                const isExpired = event.status === 'expired' || new Date(event.date) < new Date();
                
                return (
                  <tr key={event.id} className={cn("border-b border-gray-50 transition-colors", isExpired ? "bg-gray-50/50" : "hover:bg-gray-50")}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={event.image} alt={event.title} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                        <div>
                          <div className="font-bold text-gray-900 line-clamp-1">{event.title}</div>
                          <div className="text-xs text-gray-500">{event.city}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-700">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      {isExpired ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                          <AlertCircle size={12} /> Caducado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                          Activo
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#87CEEB] to-[#8A2BE2]" style={{ width: `${Math.random() * 100}%` }}></div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-[#87CEEB] transition-colors rounded-lg hover:bg-blue-50" title="Editar" disabled={isExpired}>
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handlePostpone(event.id)} className="p-2 text-gray-400 hover:text-[#FF69B4] transition-colors rounded-lg hover:bg-pink-50" title="Posponer" disabled={isExpired}>
                          <Clock size={18} />
                        </button>
                        <button onClick={() => handleDelete(event.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50" title="Eliminar">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};