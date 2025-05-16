
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface TestNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit?: () => void;
}

export const TestNavigation: React.FC<TestNavigationProps> = ({
  currentQuestion,
  totalQuestions,
  onNext,
  onPrev,
  onSubmit,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="flex justify-between mt-6">
      {currentQuestion > 0 ? (
        <button
          onClick={onPrev}
          className={`px-4 py-2 rounded-md ${
            isDark 
              ? 'bg-axelari-navy-light text-white' 
              : 'bg-gray-200 text-gray-800'
          } hover:opacity-90 transition-opacity`}
        >
          Previous
        </button>
      ) : (
        <div></div>
      )}
      
      <button
        onClick={isLastQuestion && onSubmit ? onSubmit : onNext}
        className={`px-4 py-2 rounded-md ${
          isDark 
            ? 'bg-axelari-teal text-white' 
            : 'bg-axelari-teal text-white'
        } hover:opacity-90 transition-opacity`}
      >
        {isLastQuestion ? 'Submit' : 'Next'}
      </button>
    </div>
  );
};
