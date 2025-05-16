
import React from 'react';
import { Card, CardContent } from '@/components/layout/Card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const ProfileCard: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <Card gradient className="relative mb-8">
      <CardContent className="p-0">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-axelari-navy rounded-full flex items-center justify-center text-2xl font-bold border-2 border-axelari-teal light:bg-gray-100">
            A
          </div>
          <div>
            <h2 className="text-2xl font-bold">Alex Johnson</h2>
            <p className="text-improved-visibility">Data Science Enthusiast</p>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm font-medium text-improved-visibility">Profile Completeness</div>
            <div className="text-sm font-medium">68%</div>
          </div>
          <ProgressBar value={68} />
        </div>

        <div className="flex gap-4 mt-5">
          <div className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 profile-highlight ${
            isDark 
              ? 'bg-axelari-navy-light/50 text-axelari-teal border-axelari-teal/30' 
              : 'bg-gray-100 text-axelari-teal border-axelari-teal/30'
          }`}>
            <span className="font-medium">12</span>
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Courses</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 profile-highlight ${
            isDark 
              ? 'bg-axelari-navy-light/50 text-axelari-purple border-axelari-purple/30' 
              : 'bg-gray-100 text-axelari-purple border-axelari-purple/30'
          }`}>
            <span className="font-medium">3</span>
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Certifications</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 profile-highlight ${
            isDark 
              ? 'bg-axelari-navy-light/50 text-blue-400 border-blue-400/30' 
              : 'bg-gray-100 text-blue-400 border-blue-400/30'
          }`}>
            <span className="font-medium">8</span>
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Badges</span>
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <button className="flex items-center gap-1 text-sm text-axelari-teal hover:text-axelari-teal/80 transition-colors">
            View Profile
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {isDark && (
          <div className="absolute -top-2 -right-2 flex items-center gap-2 bg-gradient-to-r from-axelari-teal to-axelari-purple px-3 py-1 rounded text-xs font-medium text-white profile-advanced-badge">
            <span className="bg-white rounded-full h-2 w-2"></span>
            Advanced
          </div>
        )}
      </CardContent>
    </Card>
  );
};
