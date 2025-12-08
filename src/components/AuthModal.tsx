import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Icons } from '../../components/Icons';

interface AuthModalProps {
  onClose: () => void;
  required?: boolean; // Si es true, no se puede cerrar (login obligatorio)
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, required = false }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validaciones básicas
      if (!email.trim()) {
        throw new Error('El email es requerido');
      }
      if (!password.trim()) {
        throw new Error('La contraseña es requerida');
      }
      if (password.length < 8) {
        throw new Error('La contraseña debe tener al menos 8 caracteres');
      }

      if (mode === 'login') {
        await login(email, password);
      } else {
        if (!name.trim()) {
          throw new Error('El nombre es requerido');
        }
        await register(email, password, name);
      }
      onClose();
    } catch (err: any) {
      console.error('Error en auth:', err);
      // Mejorar el mensaje de error
      let errorMessage = 'Error de autenticación';
      if (err.message) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-wood-900/80 backdrop-blur-sm"
        onClick={required ? undefined : onClose}
      ></div>

      <div className="relative w-96 max-w-[90vw] bg-parchment-100 p-8 shadow-2xl rounded-lg border-2 border-wood-800/20">
        {!required && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-wood-800/50 hover:text-wood-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="mb-6">
          <div className="w-16 h-16 bg-copper-500/10 border border-copper-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icons.Quill className="w-8 h-8 text-copper-500" />
          </div>
          <h2 className="font-display font-bold text-2xl text-center text-wood-900 mb-2">
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <p className="text-center text-wood-800/70 text-sm">
            Accede al Scriptorium Digital
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-display font-bold text-wood-900 mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
                required={mode === 'register'}
                disabled={isLoading}
                className="w-full px-4 py-2 border-2 border-wood-800/20 rounded-sm bg-parchment-50 text-wood-900 placeholder-wood-800/40 focus:border-copper-500 focus:outline-none focus:ring-2 focus:ring-copper-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-display font-bold text-wood-900 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
              disabled={isLoading}
              className="w-full px-4 py-2 border-2 border-wood-800/20 rounded-sm bg-parchment-50 text-wood-900 placeholder-wood-800/40 focus:border-copper-500 focus:outline-none focus:ring-2 focus:ring-copper-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-display font-bold text-wood-900 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              required
              disabled={isLoading}
              minLength={8}
              className="w-full px-4 py-2 border-2 border-wood-800/20 rounded-sm bg-parchment-50 text-wood-900 placeholder-wood-800/40 focus:border-copper-500 focus:outline-none focus:ring-2 focus:ring-copper-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {error && (
            <div className="bg-red-50/70 border border-red-200 rounded p-3 flex items-start gap-2">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-copper-600 hover:bg-copper-700 text-parchment-100 font-display font-bold rounded-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Procesando...</span>
              </div>
            ) : (
              mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setError('');
            }}
            className="text-sm text-copper-600 hover:text-copper-500 font-display"
            disabled={isLoading}
          >
            {mode === 'login'
              ? '¿No tienes cuenta? Regístrate'
              : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};
