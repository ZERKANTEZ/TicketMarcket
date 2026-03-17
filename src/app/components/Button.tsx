import React from 'react';
import { cn } from '../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-full font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A0A0A] disabled:opacity-50 disabled:pointer-events-none hover:scale-105 active:scale-95";
    
    // Gradientes requeridos: Azul Claro (#87CEEB), Rosa Brillante (#FF69B4), Morado Eléctrico (#8A2BE2)
    const variants = {
      primary: "bg-gradient-to-r from-[#87CEEB] to-[#FF69B4] text-white hover:shadow-[0_0_15px_rgba(135,206,235,0.5)] focus:ring-[#87CEEB]", // Azul a Rosa
      secondary: "bg-gradient-to-r from-[#FF69B4] to-[#8A2BE2] text-white hover:shadow-[0_0_15px_rgba(255,105,180,0.5)] focus:ring-[#FF69B4]", // Rosa a Morado
      tertiary: "bg-gradient-to-r from-[#87CEEB] via-[#FF69B4] to-[#8A2BE2] text-white hover:shadow-[0_0_15px_rgba(138,43,226,0.5)] focus:ring-[#8A2BE2]", // Azul a Rosa a Morado
      outline: "border-2 border-[#FF69B4] text-[#FF69B4] bg-transparent hover:bg-[#FF69B4]/10",
      ghost: "text-white hover:bg-white/10"
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg"
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
