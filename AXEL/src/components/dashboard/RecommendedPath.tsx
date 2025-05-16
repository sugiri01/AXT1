
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/layout/Card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Clock, Layers } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface RecommendedPathProps {
  title: string;
  description: string;
  progress: number;
  hours: number;
  modules: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const RecommendedPath: React.FC<RecommendedPathProps> = ({
  title,
  description,
  progress,
  hours,
  modules,
  level,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getLevelColor = () => {
    if (isDark) {
      switch (level) {
        case 'Beginner':
          return 'bg-green-900/30 text-green-400 border-green-500/30';
        case 'Intermediate':
          return 'bg-blue-900/30 text-blue-400 border-blue-500/30';
        case 'Advanced':
          return 'bg-purple-900/30 text-purple-400 border-purple-500/30';
      }
    } else {
      switch (level) {
        case 'Beginner':
          return 'bg-green-100 text-green-700 border-green-300';
        case 'Intermediate':
          return 'bg-blue-100 text-blue-700 border-blue-300';
        case 'Advanced':
          return 'bg-purple-100 text-purple-700 border-purple-300';
      }
    }
  };

  return (
    <Card className={`h-full ${isDark ? 'bg-axelari-navy-light' : 'bg-white border-gray-200'}`}>
      <div className="absolute top-4 right-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor()}`}>
          {level}
        </span>
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-improved-visibility text-sm mb-6">{description}</p>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-improved-visibility">Progress</span>
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{progress}%</span>
          </div>
          <ProgressBar value={progress} />
        </div>
        
        <div className="flex items-center justify-between gap-2 text-sm text-improved-visibility">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{hours} hours</span>
          </div>
          <div className="flex items-center gap-1">
            <Layers className="h-4 w-4" />
            <span>{modules} Modules</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <button className={`w-full py-2 rounded-md ${
          isDark 
            ? 'bg-gradient-to-r from-axelari-teal to-axelari-purple text-white' 
            : 'bg-axelari-teal text-white'
        } font-medium hover:opacity-90 transition-opacity`}>
          {progress > 0 ? 'Continue Learning' : 'Start Learning'}
        </button>
      </CardFooter>
    </Card>
  );
};
