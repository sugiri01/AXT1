
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export interface TestQuestionProps {
  question: string;
  options: string[];
  selected: number | null;
  onSelect: (index: number) => void;
}

export const TestQuestion: React.FC<TestQuestionProps> = ({
  question,
  options,
  selected,
  onSelect,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-4">{question}</h3>
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              selected === index
                ? isDark
                  ? 'bg-axelari-teal/10 border-axelari-teal'
                  : 'assessment-option selected'
                : isDark
                ? 'bg-axelari-navy-light border-axelari-navy'
                : 'assessment-option'
            }`}
          >
            <div className="flex items-center gap-3">
              <div 
                className={`w-5 h-5 rounded-full flex-shrink-0 border ${
                  selected === index
                    ? isDark 
                      ? 'bg-axelari-teal border-axelari-teal' 
                      : 'bg-axelari-teal border-axelari-teal'
                    : isDark
                    ? 'border-gray-500' 
                    : 'border-gray-400'
                }`}
              >
                {selected === index && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              <span className={isDark ? 'text-white' : 'text-gray-800'}>{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
