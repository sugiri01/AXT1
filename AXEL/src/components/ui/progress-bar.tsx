
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  className?: string;
  color?: 'default' | 'success' | 'warning' | 'error';
  showPercentage?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  className,
  color = 'default',
  showPercentage = false,
  height = 'md'
}) => {
  const cappedValue = Math.min(Math.max(value, 0), 100);
  
  const getColorClass = () => {
    switch (color) {
      case 'success':
        return 'bg-axelari-success';
      case 'warning':
        return 'bg-axelari-warning';
      case 'error':
        return 'bg-axelari-error';
      default:
        return 'progress-gradient';
    }
  };
  
  const getHeightClass = () => {
    switch (height) {
      case 'sm':
        return 'h-1';
      case 'lg':
        return 'h-3';
      default:
        return 'h-2';
    }
  };

  return (
    <div className={cn("w-full flex items-center gap-2", className)}>
      <div className={cn("w-full bg-axelari-navy-light rounded-full overflow-hidden", getHeightClass())}>
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", getColorClass())}
          style={{ width: `${cappedValue}%` }}
        />
      </div>
      {showPercentage && (
        <span className="text-sm font-medium w-10 text-right">{cappedValue}%</span>
      )}
    </div>
  );
};
