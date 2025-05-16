
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  gradient?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  className, 
  children, 
  gradient = false,
  onClick 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div 
      className={cn(
        "rounded-lg p-6 animate-scale-in h-full",
        gradient ? "gradient-border" : 
          isDark ? "border border-axelari-navy-light bg-axelari-navy-light/90 backdrop-blur-sm" 
                : "border border-gray-200 bg-white shadow-sm",
        onClick ? "cursor-pointer hover:shadow-lg hover:border-axelari-teal/50 transition-all duration-200" : "",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  const { theme } = useTheme();
  
  return (
    <h3 className={cn(
      "text-xl font-semibold", 
      theme === 'light' ? "text-gray-900" : "",
      className
    )}>
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  const { theme } = useTheme();
  
  return (
    <p className={cn(
      "text-sm mt-1", 
      theme === 'light' ? "text-gray-500" : "text-gray-400",
      className
    )}>
      {children}
    </p>
  );
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn("mt-6", className)}>
      {children}
    </div>
  );
};
