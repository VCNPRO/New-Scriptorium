import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input, Card } from '../../components/ui';
import { Icons } from '../../components/Icons';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
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
      setError(err.message || 'Error de autenticación');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-wood-900/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <Card className="relative w-full max-w-md bg-parchment-100 p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-wood-800/50 hover:text-wood-800 transition-colors"
        >
          <Icons.Close className="w-6 h-6" />
        </button>

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
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
                required={mode === 'register'}
                disabled={isLoading}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-display font-bold text-wood-900 mb-2">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-display font-bold text-wood-900 mb-2">
              Contraseña
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              required
              disabled={isLoading}
              minLength={8}
            />
          </div>

          {error && (
            <div className="bg-red-50/70 border border-red-200 rounded p-3 flex items-start gap-2">
              <Icons.AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Procesando...</span>
              </div>
            ) : (
              mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'
            )}
          </Button>
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
      </Card>
    </div>
  );
};
