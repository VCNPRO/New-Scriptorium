import React from 'react';

// A styled button resembling a copper/bronze plate or a classic button
export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }> = ({ 
  className = '', 
  variant = 'primary', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 font-serif text-sm font-bold tracking-wide transition-all duration-200 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-copper-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-copper-600 text-parchment-100 border-copper-800 hover:bg-copper-500 hover:shadow-md active:bg-copper-700 shadow-lg shadow-black/20",
    secondary: "bg-parchment-200 text-wood-900 border-wood-800/30 hover:bg-parchment-100 hover:border-wood-800 active:bg-parchment-300",
    ghost: "bg-transparent text-copper-600 hover:bg-copper-600/10 border-transparent"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-parchment-100 border border-wood-800/20 shadow-xl shadow-wood-900/10 rounded-sm relative overflow-hidden ${className}`}>
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-copper-600/40"></div>
      
      {title && (
        <div className="px-6 py-4 border-b border-wood-800/10 bg-parchment-200/50">
          <h3 className="font-display text-lg font-bold text-wood-900 tracking-wider flex items-center gap-2">
            {title}
          </h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

const ConfidenceDot = ({ confidence }: { confidence: number }) => {
  const color = confidence > 0.9 ? 'bg-green-500' : confidence > 0.75 ? 'bg-yellow-500' : 'bg-red-500';
  return <div className={`w-2 h-2 rounded-full ${color}`} title={`Confianza: ${(confidence * 100).toFixed(0)}%`}></div>;
};

export const Badge: React.FC<{ children?: React.ReactNode; color?: 'copper' | 'wood' | 'green'; item?: { value: string; confidence: number } }> = ({ children, color = 'copper', item }) => {
  const colors = {
    copper: "bg-copper-100 text-copper-800 border-copper-200",
    wood: "bg-wood-800/10 text-wood-900 border-wood-800/20",
    green: "bg-green-100 text-green-900 border-green-200"
  };

  if (item) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-serif font-semibold border rounded-full ${colors[color]}`}>
        <ConfidenceDot confidence={item.confidence} />
        {item.value}
      </span>
    );
  }

  return (
    <span className={`px-2 py-0.5 text-xs font-serif font-semibold border rounded-full ${colors[color]}`}>
      {children}
    </span>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input 
    {...props}
    className={`w-full bg-parchment-100 border border-wood-800/30 text-wood-900 placeholder-wood-800/40 px-3 py-2 rounded-sm focus:outline-none focus:border-copper-500 focus:ring-1 focus:ring-copper-500 transition-all font-serif ${props.className}`}
  />
);
