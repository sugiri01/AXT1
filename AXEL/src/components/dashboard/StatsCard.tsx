
import React from 'react';
import { Card, CardContent } from '@/components/layout/Card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  progress?: number;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  progress,
  trend,
  className
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-0">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-improved-visibility text-sm mb-1 flex items-center gap-2">
              {icon}
              {title}
            </div>
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</div>
            {subtitle && (
              <div className="text-improved-visibility text-xs mt-1">{subtitle}</div>
            )}
          </div>
          
          {trend && (
            <div className={cn(
              "text-sm font-medium rounded-full px-2 py-0.5",
              trend.positive 
                ? isDark ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700" 
                : isDark ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-700"
            )}>
              {trend.positive ? '+' : ''}{trend.value}
            </div>
          )}
        </div>
        
        {typeof progress === 'number' && (
          <div className="mt-4">
            <ProgressBar value={progress} height="sm" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
