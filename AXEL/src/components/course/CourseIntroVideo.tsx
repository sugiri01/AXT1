
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Play } from 'lucide-react';

const CourseIntroVideo: React.FC = () => {
  return (
    <div className="mb-6">
      <AspectRatio ratio={16/9} className="bg-axelari-navy rounded-md overflow-hidden">
        <div className="w-full h-full flex items-center justify-center bg-axelari-navy-light">
          <div className="flex flex-col items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-axelari-teal/20 flex items-center justify-center mb-3">
              <Play className="h-8 w-8 text-axelari-teal" />
            </div>
            <span className="text-sm font-medium">Watch Introduction</span>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
};

export default CourseIntroVideo;
