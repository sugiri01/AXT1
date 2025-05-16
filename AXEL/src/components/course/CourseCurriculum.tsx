
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CourseChapter from './CourseChapter';
import { Chapter, Section } from '@/types/course';

interface CourseCurriculumProps {
  curriculum: Section[];
  onViewLesson: (chapter: Chapter) => void;
  activeChapterId?: string;
}

const CourseCurriculum: React.FC<CourseCurriculumProps> = ({ curriculum, onViewLesson, activeChapterId }) => {
  // Calculate which sections should be open by default based on the active chapter
  const defaultOpenSections = React.useMemo(() => {
    if (!activeChapterId) return [];
    
    const sectionWithActiveChapter = curriculum.find(section => 
      section.chapters.some(chapter => chapter.id === activeChapterId)
    );
    
    return sectionWithActiveChapter ? [sectionWithActiveChapter.id] : [];
  }, [curriculum, activeChapterId]);

  return (
    <div className="border-t border-axelari-navy-light pt-6">
      <h3 className="text-xl font-semibold mb-4">Curriculum</h3>
      
      <Accordion type="multiple" defaultValue={defaultOpenSections} className="w-full">
        {curriculum.map((section, idx) => {
          // Calculate completion status for this section
          const completedChapters = section.chapters.filter(chapter => chapter.completed).length;
          const completionPercentage = Math.round((completedChapters / section.chapters.length) * 100);
          
          return (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2 w-full">
                  <div className="h-6 w-6 rounded-full bg-axelari-navy-light flex items-center justify-center text-xs">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-left">{section.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1 flex-1 bg-axelari-navy-light/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-axelari-teal rounded-full" 
                          style={{ width: `${completionPercentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">{completedChapters}/{section.chapters.length} lessons</span>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="ml-3 border-l border-axelari-navy-light pl-6 space-y-4">
                  {section.chapters.map((chapter) => (
                    <CourseChapter 
                      key={chapter.id}
                      chapter={chapter} 
                      onViewLesson={onViewLesson}
                      isCompleted={chapter.completed}
                      isActive={chapter.id === activeChapterId}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default CourseCurriculum;
