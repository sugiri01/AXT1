
import React from 'react';
import { Chapter, Section } from '@/types/course';
import LessonContent from './LessonContent';
import LessonSidebar from './LessonSidebar';

interface ViewLessonProps {
  selectedLesson: Chapter;
  pathTitle: string;
  curriculum: Section[];
  progress: number;
  onClose: () => void;
  onComplete?: () => void;
  onSelectLesson: (chapter: Chapter) => void;
}

const ViewLesson: React.FC<ViewLessonProps> = ({
  selectedLesson,
  pathTitle,
  curriculum,
  progress,
  onClose,
  onComplete,
  onSelectLesson
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <LessonContent 
          selectedLesson={selectedLesson}
          pathTitle={pathTitle}
          onClose={onClose}
          onComplete={onComplete}
        />
      </div>
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <LessonSidebar 
            curriculum={curriculum}
            selectedLesson={selectedLesson}
            progress={progress}
            onSelectLesson={onSelectLesson}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewLesson;
