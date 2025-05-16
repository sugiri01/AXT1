
import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Check } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Chapter } from '@/types/course';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';

interface LessonContentProps {
  selectedLesson: Chapter;
  pathTitle: string;
  onClose: () => void;
  onComplete?: () => void;
}

const formatContent = (content: string) => {
  // Replace ** text ** with bold text
  let formatted = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Replace line breaks with <br /> tags
  formatted = formatted.replace(/\n/g, '<br />');
  
  // Format bullet points
  formatted = formatted.replace(/\* (.*?)(<br \/>|$)/g, '<div class="flex gap-2 mb-1"><span class="flex-shrink-0">•</span><span>$1</span></div>$2');
  
  return formatted;
};

const LessonContent: React.FC<LessonContentProps> = ({ 
  selectedLesson, 
  pathTitle,
  onClose,
  onComplete
}) => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = () => {
    if (!onComplete) return;
    
    setIsCompleting(true);
    setTimeout(() => {
      onComplete();
      setIsCompleting(false);
      
      toast({
        title: "Lesson completed!",
        description: "Great job! Your progress has been saved.",
      });
    }, 600);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex justify-between items-center">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-gray-400 hover:text-foreground transition-colors group"
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-background/20 group-hover:bg-background/30 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </div>
          <span>Back to Course</span>
        </button>
        <h2 className="text-xl font-semibold">{pathTitle}</h2>
      </div>

      <Card className="mb-6 border-axelari-navy-light/30 shadow-lg overflow-hidden">
        <CardHeader className="border-b border-axelari-navy-light/20">
          <CardTitle>{selectedLesson.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {selectedLesson.content ? (
            <>
              <div 
                className={`max-w-none mb-6 prose prose-invert ${theme === 'light' ? 'light-content prose-neutral' : ''}`}
                dangerouslySetInnerHTML={{ __html: selectedLesson.content.includes('**') 
                  ? formatContent(selectedLesson.content) 
                  : selectedLesson.content 
                }}
              />
              
              {selectedLesson.description && (
                <div className="mb-4 bg-axelari-navy-light/20 p-4 rounded-md">
                  <h3 className="font-semibold mb-2 text-lg">Description</h3>
                  <p className="text-muted-foreground">{selectedLesson.description}</p>
                </div>
              )}
              
              {selectedLesson.materials && selectedLesson.materials.length > 0 && (
                <div className="mb-4 bg-axelari-navy-light/20 p-4 rounded-md">
                  <h3 className="font-semibold mb-2 text-lg">Materials</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedLesson.materials.map((material, index) => (
                      <li key={index} className="text-muted-foreground">{material}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedLesson.assignment && (
                <div className="mb-4 bg-axelari-navy-light/20 p-4 rounded-md">
                  <h3 className="font-semibold mb-2 text-lg">Assignment</h3>
                  <p className="text-muted-foreground">{selectedLesson.assignment}</p>
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={handleComplete}
                  disabled={isCompleting}
                  className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 transition-all hover:scale-105"
                >
                  {isCompleting ? (
                    <>
                      <span className="animate-pulse">Completing...</span>
                    </>
                  ) : (
                    <>
                      Complete and Continue
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-24 h-24 mb-6 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">No material available!</h3>
              <p className="text-center text-gray-400 max-w-md">
                The trainer has not added any training content or tests to this lesson yet. 
                Once the trainer adds content or tests, they will be displayed here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonContent;
