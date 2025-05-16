
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { Chapter, Section } from '@/types/course';
import { ProgressBar } from '@/components/ui/progress-bar';

interface LessonSidebarProps {
  curriculum: Section[];
  selectedLesson?: Chapter;
  progress: number;
  onSelectLesson: (chapter: Chapter) => void;
}

const LessonSidebar: React.FC<LessonSidebarProps> = ({ 
  curriculum, 
  selectedLesson, 
  progress,
  onSelectLesson 
}) => {
  return (
    <div className="h-full bg-axelari-navy-light/20 rounded-md p-4 flex flex-col">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-muted-foreground">Course Progress</span>
          <span className="text-xs font-medium">{progress}%</span>
        </div>
        <ProgressBar value={progress} height="sm" showPercentage={false} />
      </div>
      
      <div className="text-sm font-medium mb-3">Lessons</div>
      
      <div className="overflow-y-auto flex-1 pr-2 -mr-2">
        {curriculum.map((section) => (
          <div key={section.id} className="mb-4">
            <div className="text-xs font-medium text-muted-foreground mb-2">{section.title}</div>
            <div className="space-y-2">
              {section.chapters.map((chapter) => {
                const isActive = selectedLesson?.id === chapter.id;
                return (
                  <button
                    key={chapter.id}
                    className={`w-full text-left p-2 text-xs rounded-md flex items-center gap-2 transition-colors ${
                      isActive 
                        ? 'bg-axelari-navy-light/80 text-white' 
                        : 'hover:bg-axelari-navy-light/40 text-muted-foreground'
                    }`}
                    onClick={() => onSelectLesson(chapter)}
                  >
                    <div className="flex-shrink-0">
                      {chapter.completed ? (
                        <CheckCircle size={14} className="text-axelari-teal" />
                      ) : (
                        <Circle size={14} className={isActive ? "text-axelari-teal" : "text-muted-foreground"} />
                      )}
                    </div>
                    <span className="truncate flex-1">{chapter.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonSidebar;
