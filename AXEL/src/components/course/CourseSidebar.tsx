
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Book, Layers } from 'lucide-react';

interface CourseSidebarProps {
  progress: number;
  hours: number;
  modules: number;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({ progress, hours, modules }) => {
  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <div className="mb-6">
          {progress > 0 ? (
            <>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">Progress</span>
                <span className="text-xs font-medium">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-axelari-navy-light rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-axelari-teal to-axelari-purple rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-400 mb-2">You haven't started this course yet.</p>
          )}
        </div>
        
        <button className="w-full py-3 rounded-md bg-gradient-to-r from-axelari-teal to-axelari-purple text-white font-medium hover:opacity-90 transition-opacity mb-4">
          {progress > 0 ? 'Continue Learning' : 'Start Learning'}
        </button>
        
        <div className="bg-axelari-navy-light/50 p-4 rounded-md">
          <h4 className="font-medium mb-2">This course includes:</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="h-4 w-4" />
              <span>{hours} hours of video content</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <Book className="h-4 w-4" />
              <span>{Math.floor(modules * 1.5)} downloadable resources</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <Layers className="h-4 w-4" />
              <span>{modules} practical exercises</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseSidebar;
