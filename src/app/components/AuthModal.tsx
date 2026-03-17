import React, { useState } from 'react';
import { X, Mail, Lock, AlertCircle, CheckCircle2, Circle, User, CalendarRange, Check, Eye, EyeOff } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type RegisterStep = 'form' | 'role' | 'plan' | 'payment';

const PLANS = [
  {
    id: 'monthly',
    name: 'Mensual',
    price: '$299',
    period: 'mes',
    features: ['Hasta 5 eventos activos', 'Panel de analíticas básico', 'Soporte por correo', 'Comisión 5% por venta'],
  },
  {
    id: 'annual',
    name: 'Anual',
    price: '$2,490',
    period: 'año',
    badge: 'Ahorra 30%',
    features: ['Eventos ilimitados', 'Analíticas avanzadas + reportes', 'Soporte prioritario 24/7', 'Comisión 3% por venta'],
  },
];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [registerStep, setRegisterStep] = useState<RegisterStep>('form');
  const [selectedRole, setSelectedRole] = useState<'client' | 'organizer' | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordReg, setShowPasswordReg] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const reqs = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const isValidPassword = Object.values(reqs).every(Boolean);

  const handleClose = () => {
    setIsLogin(true);
    setRegisterStep('form');
    setSelectedRole(null);
    setSelectedPlan(null);
    setEmail('');
    setPassword('');
    setFullName('');
    setError('');
    onClose();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValidDomain = /@(gmail|hotmail|outlook)\.com$/.test(email.toLowerCase());
    if (!isValidDomain) { setError('Solo se permiten correos: @gmail.com, @hotmail.com, @outlook.com'); return; }
    if (!isValidPassword) { setError('La contraseña no cumple con los requisitos.'); return; }
    setError('');
    const emailLower = email.toLowerCase();
    if (emailLower === 'ricardo.mtz.g20@outlook.com' && password === 'Ricardo21+') {
      sessionStorage.setItem('role', 'admin'); sessionStorage.setItem('userName', 'Ricardo Martinez'); sessionStorage.setItem('userEmail', email);
      handleClose(); navigate('/dashboard/admin'); return;
    }
    if (emailLower === 'eber.higuera@gmail.com' && password === 'Higuera19+') {
      sessionStorage.setItem('role', 'organizer'); sessionStorage.setItem('userName', 'Eber Higuera'); sessionStorage.setItem('userEmail', email);
      handleClose(); navigate('/dashboard/organizer'); return;
    }
    if (emailLower === 'harvey.morenazo@hotmail.com' && password === 'Harvey20+') {
      sessionStorage.setItem('role', 'treasurer'); sessionStorage.setItem('userName', 'Harvey Morenazo'); sessionStorage.setItem('userEmail', email);
      handleClose(); navigate('/dashboard/treasurer'); return;
    }
    sessionStorage.setItem('role', 'user'); sessionStorage.setItem('userName', fullName || 'Usuario'); sessionStorage.setItem('userEmail', email);
    handleClose(); window.location.reload();
  };

  const handleRegisterFormNext = (e: React.FormEvent) => {
    e.preventDefault();
    const isValidDomain = /@(gmail|hotmail|outlook)\.com$/.test(email.toLowerCase());
    if (!isValidDomain) { setError('Solo se permiten correos: @gmail.com, @hotmail.com, @outlook.com'); return; }
    if (!isValidPassword) { setError('La contraseña no cumple con los requisitos.'); return; }
    if (!fullName.trim()) { setError('Por favor ingresa tu nombre completo.'); return; }
    setError('');
    setRegisterStep('role');
  };

  const handleRoleSelect = (role: 'client' | 'organizer') => {
    setSelectedRole(role);
    if (role === 'organizer') {
      setRegisterStep('plan');
    } else {
      sessionStorage.setItem('role', 'user'); sessionStorage.setItem('userName', fullName); sessionStorage.setItem('userEmail', email);
      handleClose(); window.location.reload();
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem('role', 'organizer'); sessionStorage.setItem('userName', fullName);
    sessionStorage.setItem('userEmail', email); sessionStorage.setItem('organizerPlan', selectedPlan || 'monthly');
    handleClose(); navigate('/dashboard/organizer');
  };

  const formatCard = (val: string) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExp = (val: string) => { const c = val.replace(/\D/g, '').slice(0, 4); return c.length >= 3 ? c.slice(0,2)+'/'+c.slice(2) : c; };

  const ReqItem = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center text-xs mt-1.5">
      {met ? <CheckCircle2 size={14} className="text-green-500 mr-2 flex-shrink-0" /> : <Circle size={14} className="text-gray-600 mr-2 flex-shrink-0" />}
      <span className={met ? 'text-gray-300 font-medium' : 'text-gray-500'}>{text}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden" style={{maxHeight:'90vh',overflowY:'auto'}}>
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#FF69B4] rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#87CEEB] rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />

        <div className="p-6 relative z-10">
          <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"><X size={24} /></button>

          {/* LOGIN */}
          {isLogin && (
            <>
              <h2 className="text-2xl font-bold text-white mb-1">Inicia Sesión</h2>
              <p className="text-gray-400 text-sm mb-6">Accede a los mejores eventos en TicketMarket.</p>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Correo Electrónico</label>
                  <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="ejemplo@gmail.com"
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#87CEEB] focus:ring-1 focus:ring-[#87CEEB]" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e=>setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-[#87CEEB] focus:ring-1 focus:ring-[#87CEEB]"
                      required
                    />
                    <button
                      type="button"
                      onMouseDown={() => setShowPassword(true)}
                      onMouseUp={() => setShowPassword(false)}
                      onMouseLeave={() => setShowPassword(false)}
                      onTouchStart={() => setShowPassword(true)}
                      onTouchEnd={() => setShowPassword(false)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors select-none"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="mt-3 bg-black/30 p-3 rounded-xl border border-white/5">
                    <div className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Requisitos de Seguridad</div>
                    <div className="grid grid-cols-2 gap-y-1 gap-x-2">
                      <ReqItem met={reqs.upper} text="1 Mayúscula" /><ReqItem met={reqs.lower} text="1 Minúscula" />
                      <ReqItem met={reqs.number} text="1 Número" /><ReqItem met={reqs.special} text="1 Carácter especial" />
                      <ReqItem met={reqs.length} text="Mín. 8 caracteres" />
                    </div>
                  </div>
                </div>
                {error && <p className="flex items-center text-xs text-red-400"><AlertCircle size={14} className="mr-1" />{error}</p>}
                <Button type="submit" variant="primary" className="w-full mt-2">Ingresar</Button>
                <div className="relative flex items-center py-1"><div className="flex-grow border-t border-white/10" /><span className="mx-4 text-gray-500 text-xs uppercase tracking-widest">o</span><div className="flex-grow border-t border-white/10" /></div>
                <Button type="button" variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white" onClick={()=>{sessionStorage.setItem('role','user');sessionStorage.setItem('userName','Usuario Google');handleClose();window.location.reload();}}>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Continuar con Google
                </Button>
                <p className="text-center text-sm text-gray-400">¿No tienes cuenta?{' '}
                  <button type="button" onClick={()=>{setIsLogin(false);setRegisterStep('form');setError('');}} className="text-[#FF69B4] hover:text-[#87CEEB] font-medium transition-colors">Regístrate aquí</button>
                </p>
              </form>
            </>
          )}

          {/* REGISTER STEP 1: FORM */}
          {!isLogin && registerStep === 'form' && (
            <>
              <h2 className="text-2xl font-bold text-white mb-1">Crea tu Cuenta</h2>
              <p className="text-gray-400 text-sm mb-6">Únete a TicketMarket hoy.</p>
              <form onSubmit={handleRegisterFormNext} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nombre Completo</label>
                  <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input type="text" value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Tu nombre completo"
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#87CEEB] focus:ring-1 focus:ring-[#87CEEB]" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Correo Electrónico</label>
                  <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="ejemplo@gmail.com"
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#87CEEB] focus:ring-1 focus:ring-[#87CEEB]" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      type={showPasswordReg ? 'text' : 'password'}
                      value={password}
                      onChange={e=>setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-[#87CEEB] focus:ring-1 focus:ring-[#87CEEB]"
                      required
                    />
                    <button
                      type="button"
                      onMouseDown={() => setShowPasswordReg(true)}
                      onMouseUp={() => setShowPasswordReg(false)}
                      onMouseLeave={() => setShowPasswordReg(false)}
                      onTouchStart={() => setShowPasswordReg(true)}
                      onTouchEnd={() => setShowPasswordReg(false)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors select-none"
                      tabIndex={-1}
                    >
                      {showPasswordReg ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="mt-3 bg-black/30 p-3 rounded-xl border border-white/5">
                    <div className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Requisitos de Seguridad</div>
                    <div className="grid grid-cols-2 gap-y-1 gap-x-2">
                      <ReqItem met={reqs.upper} text="1 Mayúscula" /><ReqItem met={reqs.lower} text="1 Minúscula" />
                      <ReqItem met={reqs.number} text="1 Número" /><ReqItem met={reqs.special} text="1 Carácter especial" />
                      <ReqItem met={reqs.length} text="Mín. 8 caracteres" />
                    </div>
                  </div>
                </div>
                {error && <p className="flex items-center text-xs text-red-400"><AlertCircle size={14} className="mr-1" />{error}</p>}
                <Button type="submit" variant="primary" className="w-full mt-2">Continuar →</Button>
                <p className="text-center text-sm text-gray-400">¿Ya tienes cuenta?{' '}
                  <button type="button" onClick={()=>{setIsLogin(true);setError('');}} className="text-[#FF69B4] hover:text-[#87CEEB] font-medium transition-colors">Inicia Sesión</button>
                </p>
              </form>
            </>
          )}

          {/* REGISTER STEP 2: ROLE */}
          {!isLogin && registerStep === 'role' && (
            <>
              <button onClick={()=>setRegisterStep('form')} className="text-gray-500 hover:text-white text-sm mb-4 flex items-center gap-1 transition-colors">← Volver</button>
              <h2 className="text-2xl font-bold text-white mb-1">¿Cómo usarás TicketMarket?</h2>
              <p className="text-gray-400 text-sm mb-6">Elige el tipo de cuenta que mejor se adapte a ti.</p>
              <div className="space-y-4">
                <button onClick={()=>handleRoleSelect('client')}
                  className="w-full text-left p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#87CEEB]/50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#87CEEB]/10 flex items-center justify-center text-[#87CEEB] group-hover:bg-[#87CEEB]/20 transition-colors"><User size={24} /></div>
                    <div><div className="font-bold text-white text-base">Cliente</div><div className="text-sm text-gray-400">Compra boletos para eventos — gratis</div></div>
                  </div>
                  <ul className="mt-4 space-y-1.5 pl-16">
                    {['Acceso a todos los eventos','Historial de compras con QR','Sin costo'].map(f=>(
                      <li key={f} className="flex items-center text-xs text-gray-400 gap-2"><Check size={12} className="text-[#87CEEB]" />{f}</li>))}
                  </ul>
                </button>
                <button onClick={()=>handleRoleSelect('organizer')}
                  className="w-full text-left p-5 rounded-2xl border border-[#FF69B4]/30 bg-[#FF69B4]/5 hover:bg-[#FF69B4]/10 hover:border-[#FF69B4]/60 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FF69B4]/10 flex items-center justify-center text-[#FF69B4] group-hover:bg-[#FF69B4]/20 transition-colors"><CalendarRange size={24} /></div>
                    <div><div className="font-bold text-white text-base">Organizador de Eventos</div><div className="text-sm text-gray-400">Crea y gestiona tus propios eventos</div></div>
                  </div>
                  <ul className="mt-4 space-y-1.5 pl-16">
                    {['Panel de gestión de eventos','Analíticas de ventas en tiempo real','Requiere plan de pago'].map(f=>(
                      <li key={f} className="flex items-center text-xs text-gray-400 gap-2"><Check size={12} className="text-[#FF69B4]" />{f}</li>))}
                  </ul>
                </button>
              </div>
            </>
          )}

          {/* REGISTER STEP 3: PLAN */}
          {!isLogin && registerStep === 'plan' && (
            <>
              <button onClick={()=>setRegisterStep('role')} className="text-gray-500 hover:text-white text-sm mb-4 flex items-center gap-1 transition-colors">← Volver</button>
              <h2 className="text-2xl font-bold text-white mb-1">Elige tu Plan</h2>
              <p className="text-gray-400 text-sm mb-6">Selecciona el plan que mejor se adapte a tu operación.</p>
              <div className="space-y-4 mb-6">
                {PLANS.map(plan=>(
                  <button key={plan.id} onClick={()=>setSelectedPlan(plan.id as 'monthly'|'annual')}
                    className={cn('w-full text-left p-5 rounded-2xl border transition-all',
                      selectedPlan===plan.id ? 'border-[#FF69B4] bg-[#FF69B4]/10 ring-1 ring-[#FF69B4]/50' : 'border-white/10 bg-white/5 hover:border-white/20')}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-base">{plan.name}</span>
                          {plan.badge && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#8A2BE2]/30 text-[#87CEEB] border border-[#8A2BE2]/30">{plan.badge}</span>}
                        </div>
                        <span className="text-xs text-gray-500">por {plan.period}</span>
                      </div>
                      <div className="text-right"><span className="text-2xl font-bold text-white">{plan.price}</span><span className="text-xs text-gray-500 block">MXN</span></div>
                    </div>
                    <ul className="space-y-1.5">
                      {plan.features.map(f=>(
                        <li key={f} className="flex items-center text-xs text-gray-400 gap-2">
                          <Check size={12} className={selectedPlan===plan.id ? 'text-[#FF69B4]' : 'text-gray-600'} />{f}
                        </li>))}
                    </ul>
                  </button>
                ))}
              </div>
              <Button variant="secondary" className="w-full" disabled={!selectedPlan} onClick={()=>setRegisterStep('payment')}>
                Continuar al Pago →
              </Button>
            </>
          )}

          {/* REGISTER STEP 4: PAYMENT */}
          {!isLogin && registerStep === 'payment' && (
            <>
              <button onClick={()=>setRegisterStep('plan')} className="text-gray-500 hover:text-white text-sm mb-4 flex items-center gap-1 transition-colors">← Volver</button>
              <h2 className="text-2xl font-bold text-white mb-1">Datos de Pago</h2>
              <p className="text-gray-400 text-sm mb-1">
                Plan <span className="text-[#FF69B4] font-semibold">{selectedPlan==='annual'?'Anual':'Mensual'}</span> —{' '}
                <span className="text-white font-semibold">{selectedPlan==='annual'?'$2,490':'$299'} MXN</span>
              </p>
              <p className="text-xs text-gray-500 mb-6">Tu suscripción se renueva automáticamente. Cancela cuando quieras.</p>
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Número de Tarjeta</label>
                  <input type="text" value={cardNumber} onChange={e=>setCardNumber(formatCard(e.target.value))} placeholder="0000 0000 0000 0000" maxLength={19}
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#87CEEB] focus:ring-1 focus:ring-[#87CEEB] font-mono tracking-widest" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Vencimiento</label>
                    <input type="text" value={cardExp} onChange={e=>setCardExp(formatExp(e.target.value))} placeholder="MM/AA" maxLength={5}
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#87CEEB] focus:ring-1 focus:ring-[#87CEEB] font-mono" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">CVC</label>
                    <input type="text" value={cardCvc} onChange={e=>setCardCvc(e.target.value.replace(/\D/g,'').slice(0,4))} placeholder="•••" maxLength={4}
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#87CEEB] focus:ring-1 focus:ring-[#87CEEB] font-mono" required />
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-start gap-2">
                  <span className="text-sm mt-0.5">🔒</span>
                  <p className="text-xs text-gray-400">Pago seguro con encriptación SSL. No almacenamos datos de tarjeta.</p>
                </div>
                <Button type="submit" variant="secondary" className="w-full">Pagar y Activar Cuenta</Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
