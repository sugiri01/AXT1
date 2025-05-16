
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CourseHeaderProps {
  title: string;
  description: string;
  level: string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ title, description, level }) => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-6">
      <button 
        onClick={() => navigate('/learning-paths')}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Learning Paths
      </button>
      
      <div className="flex justify-between items-center mt-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
          level === 'Beginner' 
            ? 'bg-green-900/30 text-green-400 border-green-500/30'
            : level === 'Intermediate'
            ? 'bg-blue-900/30 text-blue-400 border-blue-500/30'
            : 'bg-purple-900/30 text-purple-400 border-purple-500/30'
        }`}>
          {level}
        </span>
      </div>
    </div>
  );
};

export default CourseHeader;
