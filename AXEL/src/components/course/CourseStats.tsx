
import React from 'react';
import { Clock, Layers, Book } from 'lucide-react';

interface CourseStatsProps {
  hours: number;
  modules: number;
}

const CourseStats: React.FC<CourseStatsProps> = ({ hours, modules }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="flex items-center gap-3 p-4 bg-axelari-navy-light rounded-md">
        <Clock className="h-5 w-5 text-axelari-teal" />
        <div>
          <p className="text-sm font-medium">{hours} hours</p>
          <p className="text-xs text-gray-400">Total Duration</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-4 bg-axelari-navy-light rounded-md">
        <Layers className="h-5 w-5 text-axelari-teal" />
        <div>
          <p className="text-sm font-medium">{modules} modules</p>
          <p className="text-xs text-gray-400">Total Modules</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-4 bg-axelari-navy-light rounded-md">
        <Book className="h-5 w-5 text-axelari-teal" />
        <div>
          <p className="text-sm font-medium">Lifetime</p>
          <p className="text-xs text-gray-400">Full Access</p>
        </div>
      </div>
    </div>
  );
};

export default CourseStats;
