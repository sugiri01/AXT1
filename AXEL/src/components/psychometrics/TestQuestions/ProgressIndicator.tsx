
import React from 'react';
import { ProgressBar } from '@/components/ui/progress-bar';
import { useTheme } from '@/context/ThemeContext';

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentQuestion,
  totalQuestions,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Question {currentQuestion + 1} of {totalQuestions}</span>
        <span className={isDark ? 'text-white' : 'text-gray-800 font-medium'}>{Math.round(progress)}% Complete</span>
      </div>
      <ProgressBar value={progress} />
    </div>
  );
};
