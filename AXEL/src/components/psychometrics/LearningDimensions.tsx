
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/layout/Card';
import { Button } from '@/components/ui/button';
import { ChevronRight, BarChart3, LayoutGrid } from 'lucide-react';
import { ProgressBar } from '@/components/ui/progress-bar';
import { LearningDimensionType } from '@/types/psychometrics';
import { useTheme } from '@/context/ThemeContext';

interface LearningDimensionsProps {
  learningDimensions: LearningDimensionType[];
  showStats: boolean;
  setShowStats: (show: boolean) => void;
}

export const LearningDimensions: React.FC<LearningDimensionsProps> = ({
  learningDimensions,
  showStats,
  setShowStats
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Learning Style Dimensions</CardTitle>
            <CardDescription>Your preferences across different learning dimensions</CardDescription>
          </div>
          <div className="flex items-center">
            <button 
              className={`px-3 py-1 rounded-md mr-2 ${
                showStats 
                  ? isDark ? 'bg-axelari-navy-light' : 'bg-gray-200 text-gray-700'
                  : 'bg-axelari-teal text-white'
              }`}
              onClick={() => setShowStats(false)}
            >
              <BarChart3 className="h-4 w-4" />
            </button>
            <button 
              className={`px-3 py-1 rounded-md ${
                showStats 
                  ? 'bg-axelari-teal text-white'
                  : isDark ? 'bg-axelari-navy-light' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setShowStats(true)}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningDimensions.map((dimension, index) => (
            <div key={index} className="relative">
              <div className="flex justify-between items-center mb-2">
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{dimension.name}</span>
                <div className="flex items-center">
                  {showStats && (
                    <span className={`text-xs ${
                      isDark ? 'bg-axelari-navy-light' : 'bg-gray-100'
                    } px-2 py-1 rounded-full mr-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {dimension.percentile}th percentile
                    </span>
                  )}
                  <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{dimension.value}%</span>
                </div>
              </div>
              <ProgressBar 
                value={dimension.value} 
                color={dimension.color === 'default' ? 'default' : dimension.color === 'success' ? 'success' : 'warning'}
              />
              
              {showStats && (
                <div className="mt-1 flex justify-between text-xs text-gray-400">
                  <span>CI: {dimension.confidenceInterval[0]}%</span>
                  <span>{dimension.confidenceInterval[1]}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center mt-6">
        <Button variant="outline" className="flex items-center gap-2">
          View Detailed Analysis
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
