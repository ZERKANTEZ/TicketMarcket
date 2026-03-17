import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockSalesData, mockRefunds } from '../../data/mock';
import { Button } from '../../components/Button';
import { Calendar, DollarSign, Ticket, Activity, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Treasurer = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [refunds, setRefunds] = useState(mockRefunds);

  const approveRefund = (id: string) => {
    setRefunds(refunds.map(r => r.id === id ? { ...r, status: 'approved' } : r));
  };

  const distributePayments = () => {
    alert("¡Pagos repartidos exitosamente a los organizadores correspondientes!");
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Financiero</h1>
          <p className="text-gray-500">Vista general de ingresos y boletos vendidos.</p>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-xl border border-gray-200">
          <button onClick={() => setDateRange('7days')} className={cn("px-4 py-2 text-sm font-semibold rounded-lg transition-colors", dateRange === '7days' ? "bg-white text-[#8A2BE2] shadow-sm" : "text-gray-500 hover:text-gray-700")}>Últimos 7 Días</button>
          <button onClick={() => setDateRange('30days')} className={cn("px-4 py-2 text-sm font-semibold rounded-lg transition-colors", dateRange === '30days' ? "bg-white text-[#8A2BE2] shadow-sm" : "text-gray-500 hover:text-gray-700")}>30 Días</button>
          <button onClick={() => setDateRange('all')} className={cn("px-4 py-2 text-sm font-semibold rounded-lg transition-colors", dateRange === 'all' ? "bg-white text-[#8A2BE2] shadow-sm" : "text-gray-500 hover:text-gray-700")}>Histórico</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-[#87CEEB]">
          <div className="w-12 h-12 rounded-full bg-[#87CEEB]/10 flex items-center justify-center text-[#87CEEB]">
            <DollarSign size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Ingresos Totales</div>
            <div className="text-2xl font-bold text-gray-900">$204,500</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-[#FF69B4]">
          <div className="w-12 h-12 rounded-full bg-[#FF69B4]/10 flex items-center justify-center text-[#FF69B4]">
            <Ticket size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Boletos Vendidos</div>
            <div className="text-2xl font-bold text-gray-900">12,400</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-[#8A2BE2]">
          <div className="w-12 h-12 rounded-full bg-[#8A2BE2]/10 flex items-center justify-center text-[#8A2BE2]">
            <Activity size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Eventos Activos</div>
            <div className="text-2xl font-bold text-gray-900">45</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Dinero Generado Total vs Evento</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Legend />
                <Line type="monotone" dataKey="generados" stroke="#87CEEB" strokeWidth={3} dot={{r: 4}} activeDot={{r: 8}} name="Generados ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Boletos Vendidos Total vs Evento</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#000', color: '#fff'}} 
                />
                <Legend />
                <Bar dataKey="boletos" fill="url(#colorBoletos)" radius={[4, 4, 0, 0]} name="Boletos" />
                <defs>
                  <linearGradient id="colorBoletos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF69B4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8A2BE2" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Solicitudes de Reembolso</h2>
          <Button variant="primary" onClick={distributePayments} className="mt-4 md:mt-0 shadow-lg shadow-purple-200">
            Repartir Pagos a Organizadores
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-500">
                <th className="p-4 rounded-tl-xl">ID Reembolso</th>
                <th className="p-4">Usuario</th>
                <th className="p-4">Evento</th>
                <th className="p-4">Monto</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right rounded-tr-xl">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {refunds.map(refund => (
                <tr key={refund.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-mono text-sm">{refund.id}</td>
                  <td className="p-4">{refund.user}</td>
                  <td className="p-4 font-medium text-gray-700">{refund.event}</td>
                  <td className="p-4 font-bold text-gray-900">${refund.amount}</td>
                  <td className="p-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold",
                      refund.status === 'approved' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    )}>
                      {refund.status === 'approved' ? 'Aprobado' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {refund.status === 'pending' && (
                      <Button variant="secondary" size="sm" onClick={() => approveRefund(refund.id)} className="shadow-none py-1 h-8">
                        Aprobar
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};