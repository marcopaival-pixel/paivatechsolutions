import React from 'react';

interface LogoProps {
  variant?: 'icon' | 'horizontal' | 'vertical';
  className?: string;
  theme?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'horizontal', 
  className = "h-10", 
  theme = 'dark' 
}) => {
  const isDark = theme === 'dark';
  
  // Icon SVG Component
  const Icon = () => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
      <style>
        {`
          @keyframes logo-pulse {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          @keyframes logo-dash {
            to { stroke-dashoffset: -20; }
          }
          .node { animation: logo-pulse 3s infinite ease-in-out; transform-origin: center; }
          .connection { animation: logo-pulse 4s infinite ease-in-out; }
          .outer-ring { animation: logo-dash 10s linear infinite; }
        `}
      </style>
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      
      {/* Outer Ring */}
      <circle cx="100" cy="100" r="80" stroke="url(#logo-gradient)" strokeWidth="2" strokeDasharray="10 5" opacity="0.3" className="outer-ring" />
      
      {/* Neural Network Nodes & Connections */}
      <g stroke="url(#logo-gradient)" strokeWidth="1.5">
        <circle cx="100" cy="100" r="12" fill="url(#logo-gradient)" className="node" style={{ animationDelay: '0s' }} />
        <circle cx="100" cy="100" r="18" stroke="url(#logo-gradient)" strokeOpacity="0.4" />
        
        <circle cx="100" cy="45" r="5" fill="url(#logo-gradient)" className="node" style={{ animationDelay: '0.5s' }} />
        <circle cx="155" cy="100" r="5" fill="url(#logo-gradient)" className="node" style={{ animationDelay: '1s' }} />
        <circle cx="100" cy="155" r="5" fill="url(#logo-gradient)" className="node" style={{ animationDelay: '1.5s' }} />
        <circle cx="45" cy="100" r="5" fill="url(#logo-gradient)" className="node" style={{ animationDelay: '2s' }} />
        
        <circle cx="138" cy="62" r="4" fill="url(#logo-gradient)" className="node" style={{ animationDelay: '0.7s' }} />
        <circle cx="138" cy="138" r="4" fill="url(#logo-gradient)" className="node" style={{ animationDelay: '1.2s' }} />
        <circle cx="62" cy="138" r="4" fill="url(#logo-gradient)" className="node" style={{ animationDelay: '1.7s' }} />
        <circle cx="62" cy="62" r="4" fill="url(#logo-gradient)" className="node" style={{ animationDelay: '2.2s' }} />
        
        <line x1="100" y1="100" x2="100" y2="45" opacity="0.6" className="connection" />
        <line x1="100" y1="100" x2="155" y2="100" opacity="0.6" className="connection" />
        <line x1="100" y1="100" x2="100" y2="155" opacity="0.6" className="connection" />
        <line x1="100" y1="100" x2="45" y2="100" opacity="0.6" className="connection" />
        
        <line x1="100" y1="100" x2="138" y2="62" opacity="0.4" className="connection" />
        <line x1="100" y1="100" x2="138" y2="138" opacity="0.4" className="connection" />
        <line x1="100" y1="100" x2="62" y2="138" opacity="0.4" className="connection" />
        <line x1="100" y1="100" x2="62" y2="62" opacity="0.4" className="connection" />
        
        <path d="M100 45 L138 62 L155 100 L138 138 L100 155 L62 138 L45 100 L62 62 Z" fill="none" opacity="0.2" />
      </g>
    </svg>
  );

  if (variant === 'icon') {
    return <div className={className}><Icon /></div>;
  }

  return (
    <div className={`flex ${variant === 'vertical' ? 'flex-col items-center gap-2' : 'flex-row items-center gap-3'} ${className}`}>
      <div className={variant === 'vertical' ? 'h-20 w-20' : 'h-full'}>
        <Icon />
      </div>
      <div className={`flex flex-col ${variant === 'vertical' ? 'items-center' : ''}`}>
        <span className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          PaivaTech
        </span>
        <span className={`text-[10px] uppercase tracking-[0.2em] font-medium ${isDark ? 'text-cyan-400' : 'text-blue-600'} -mt-1`}>
          Solutions
        </span>
      </div>
    </div>
  );
};
