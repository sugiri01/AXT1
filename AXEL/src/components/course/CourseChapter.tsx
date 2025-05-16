
import React from 'react';
import { Play, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chapter } from '@/types/course';

interface CourseChapterProps {
  chapter: Chapter;
  onViewLesson: (chapter: Chapter) => void;
  isCompleted?: boolean;
  isActive?: boolean;
}

const CourseChapter: React.FC<CourseChapterProps> = ({ 
  chapter, 
  onViewLesson, 
  isCompleted = false,
  isActive = false 
}) => {
  return (
    <div key={chapter.id} className={`flex items-center justify-between p-2 rounded-md transition-colors hover:bg-muted/50 ${isActive ? 'bg-muted' : ''}`}>
      <div className="flex items-center gap-3">
        <div className={`h-5 w-5 rounded-full flex items-center justify-center border transition-colors ${
          isCompleted 
            ? 'bg-axelari-teal border-axelari-teal' 
            : 'border-muted-foreground'
        }`}>
          {isCompleted ? (
            <Check className="h-3 w-3 text-white" />
          ) : (
            <Play className="h-3 w-3 text-muted-foreground" />
          )}
        </div>
        <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>{chapter.title}</span>
        {chapter.hasPreview && (
          <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded">
            Free Preview
          </span>
        )}
      </div>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-xs text-axelari-teal hover:text-axelari-teal/80 hover:bg-axelari-teal/10 transition-all"
        onClick={() => onViewLesson(chapter)}
      >
        View Lesson
      </Button>
    </div>
  );
};

export default CourseChapter;
