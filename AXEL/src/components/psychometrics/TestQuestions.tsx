
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/layout/Card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TestSectionType } from '@/types/psychometrics';
import { useTheme } from '@/context/ThemeContext';

interface TestQuestionsProps {
  section: TestSectionType;
  onComplete: (sectionId: number, score: number, dimensions: { name: string; score: number }[]) => void;
  onCancel: () => void;
}

interface Question {
  id: number;
  text: string;
  dimension: string;
  options: {
    text: string;
    value: number;
  }[];
}

export const TestQuestions: React.FC<TestQuestionsProps> = ({ section, onComplete, onCancel }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Get questions based on section ID
  const questions = getQuestionsBySection(section.id);
  
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(getTimeInSeconds(section.duration));
  const [isTimeWarning, setIsTimeWarning] = useState<boolean>(false);
  const [testCompleted, setTestCompleted] = useState<boolean>(false);
  
  // Calculate progress percentage
  const progressPercentage = (currentQuestion / questions.length) * 100;
  
  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        // Set warning when 20% time remains
        if (prev === Math.floor(getTimeInSeconds(section.duration) * 0.2)) {
          setIsTimeWarning(true);
          toast({
            title: "Time is running out!",
            description: "You have 20% of your time remaining.",
            variant: "destructive"
          });
        }
        
        // Auto-submit when time runs out
        if (prev <= 1) {
          clearInterval(timer);
          handleCompleteTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [section.duration]);
  
  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Convert "15 min" to seconds
  function getTimeInSeconds(duration: string): number {
    const match = duration.match(/(\d+)/);
    if (match && match[1]) {
      return parseInt(match[1]) * 60;
    }
    return 900; // Default 15 minutes
  }
  
  // Handle answering a question
  const handleAnswer = (questionId: number, value: number) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };
  
  // Move to next question
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  // Move to previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  // Complete the test and calculate scores
  const handleCompleteTest = () => {
    if (!testCompleted) {
      setTestCompleted(true);
      
      // Calculate overall score
      const answeredQuestions = Object.keys(answers).length;
      const totalScore = Math.round((answeredQuestions / questions.length) * 100);
      
      // Calculate dimension scores
      const dimensions = calculateDimensionScores(answers, questions);
      
      // Delay to show completion message
      setTimeout(() => {
        onComplete(section.id, totalScore, dimensions);
      }, 1500);
      
      toast({
        title: "Test Completed!",
        description: "Your results are being processed.",
      });
    }
  };
  
  // Calculate scores for each dimension
  const calculateDimensionScores = (
    answers: Record<number, number>,
    questions: Question[]
  ): { name: string; score: number }[] => {
    // Get unique dimensions
    const dimensions = Array.from(new Set(questions.map(q => q.dimension)));
    
    // Calculate scores per dimension
    return dimensions.map(dimension => {
      const dimensionQuestions = questions.filter(q => q.dimension === dimension);
      const dimensionAnswers = dimensionQuestions.filter(q => answers[q.id] !== undefined);
      
      if (dimensionAnswers.length === 0) {
        return { name: dimension, score: 0 };
      }
      
      const totalPossible = dimensionQuestions.length * 100;
      const totalScore = dimensionAnswers.reduce((total, q) => {
        return total + answers[q.id];
      }, 0);
      
      return {
        name: dimension,
        score: Math.round((totalScore / totalPossible) * 100)
      };
    });
  };

  // Current question data
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const hasAnswered = answers[question?.id] !== undefined;
  
  // Helper function to determine option styling based on selection state and theme
  const getOptionStyle = (questionId: number, optionValue: number) => {
    const isSelected = answers[questionId] === optionValue;
    
    if (isDark) {
      return isSelected 
        ? 'bg-axelari-navy-light border-axelari-teal' 
        : 'hover:bg-axelari-navy-light/50';
    } else {
      return isSelected 
        ? 'bg-gray-200 border-axelari-teal text-gray-900' 
        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100';
    }
  };
  
  return (
    <PageContainer
      title={section.name}
      description="Complete this assessment to discover more about your learning style."
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{section.name}</CardTitle>
          <CardDescription>{section.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className={`flex items-center ${isTimeWarning ? 'text-red-500 animate-pulse' : ''}`}>
              <Clock className="h-4 w-4 mr-1" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
          
          {testCompleted ? (
            <div className="py-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Test Completed</h3>
              <p>Processing your results...</p>
            </div>
          ) : (
            <div className="py-6">
              <h3 className="text-lg font-medium mb-6">{question.text}</h3>
              
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg cursor-pointer border transition-colors ${
                      getOptionStyle(question.id, option.value)
                    }`}
                    onClick={() => handleAnswer(question.id, option.value)}
                  >
                    {option.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={currentQuestion === 0 ? onCancel : handlePrevious}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentQuestion === 0 ? 'Exit' : 'Previous'}
          </Button>
          
          <div className="flex gap-2">
            {isLastQuestion ? (
              <Button 
                onClick={handleCompleteTest}
                disabled={!hasAnswered || testCompleted}
                className="bg-axelari-teal hover:bg-axelari-teal/80"
              >
                Complete Test
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                disabled={!hasAnswered}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </PageContainer>
  );
};

// Helper function to get questions based on section ID
function getQuestionsBySection(sectionId: number): Question[] {
  // Return test questions from our data store
  return testQuestionsData[sectionId] || [];
}

// Test question data (sample)
const testQuestionsData: Record<number, Question[]> = {
  1: [ // Learning Style Assessment
    {
      id: 1,
      text: "When learning something new, I prefer to:",
      dimension: "Visual",
      options: [
        { text: "See diagrams, charts, or demonstrations", value: 100 },
        { text: "Hear a detailed explanation", value: 25 },
        { text: "Read detailed instructions", value: 50 },
        { text: "Try it out myself through hands-on practice", value: 75 }
      ]
    },
    {
      id: 2,
      text: "I remember information best when:",
      dimension: "Auditory",
      options: [
        { text: "I listen to someone explain it", value: 100 },
        { text: "I see it written or illustrated", value: 25 },
        { text: "I discuss it with others", value: 75 },
        { text: "I practice doing it", value: 50 }
      ]
    },
    {
      id: 3,
      text: "When solving a problem, I tend to:",
      dimension: "Reading/Writing",
      options: [
        { text: "Write down the key points and process", value: 100 },
        { text: "Talk through the problem out loud", value: 50 },
        { text: "Create a mental image or diagram", value: 25 },
        { text: "Use trial and error", value: 75 }
      ]
    },
    {
      id: 4,
      text: "I find it easiest to follow:",
      dimension: "Kinesthetic",
      options: [
        { text: "Step-by-step demonstrations I can follow along with", value: 100 },
        { text: "Verbal instructions and explanations", value: 25 },
        { text: "Written instructions with diagrams", value: 50 },
        { text: "My intuition after seeing an example", value: 75 }
      ]
    },
    {
      id: 5,
      text: "When recalling a past event, I most easily remember:",
      dimension: "Visual",
      options: [
        { text: "The visual details and how things looked", value: 100 },
        { text: "The conversations and sounds", value: 25 },
        { text: "The emotions and feelings I experienced", value: 75 },
        { text: "What I read about it later", value: 50 }
      ]
    },
    // Add more questions as needed
  ],
  2: [ // Cognitive Processing
    {
      id: 1,
      text: "When faced with a complex problem, I typically:",
      dimension: "Working Memory",
      options: [
        { text: "Break it down into smaller, manageable parts", value: 100 },
        { text: "Tackle the whole problem at once", value: 25 },
        { text: "Look for patterns or similarities to problems I've solved before", value: 75 },
        { text: "Discuss it with someone else to clarify my thinking", value: 50 }
      ]
    },
    {
      id: 2,
      text: "When working through a multi-step process, I:",
      dimension: "Processing Speed",
      options: [
        { text: "Complete steps quickly once I understand them", value: 100 },
        { text: "Take my time to ensure accuracy at each step", value: 50 },
        { text: "Often skip ahead if I see the pattern", value: 75 },
        { text: "Prefer to work slowly and methodically", value: 25 }
      ]
    },
    // Add more questions as needed
  ],
  3: [ // Focus & Attention Span
    {
      id: 1,
      text: "When studying or working, I typically:",
      dimension: "Sustained Attention",
      options: [
        { text: "Can focus intensely for long periods without breaks", value: 100 },
        { text: "Need frequent short breaks to maintain productivity", value: 50 },
        { text: "Start strong but find my attention drifting after 20-30 minutes", value: 75 },
        { text: "Work best in short bursts with frequent changes in activity", value: 25 }
      ]
    },
    {
      id: 2,
      text: "When there are distractions around me, I:",
      dimension: "Distraction Sensitivity",
      options: [
        { text: "Barely notice them and maintain focus easily", value: 100 },
        { text: "Am highly aware of them but can usually ignore them", value: 75 },
        { text: "Find my attention pulled away but can redirect myself", value: 50 },
        { text: "Find it very difficult to maintain concentration", value: 25 }
      ]
    },
    // Add more questions as needed
  ],
  4: [ // Information Retention
    {
      id: 1,
      text: "After learning something new, I typically:",
      dimension: "Short-term Memory",
      options: [
        { text: "Can recall specific details immediately after learning", value: 100 },
        { text: "Remember the general concept but not all details", value: 75 },
        { text: "Need to review it once or twice to solidify it", value: 50 },
        { text: "Need multiple reviews before I feel confident", value: 25 }
      ]
    },
    {
      id: 2,
      text: "When recalling information I learned months ago, I:",
      dimension: "Long-term Memory",
      options: [
        { text: "Can recall it in detail with little effort", value: 100 },
        { text: "Remember the main points but not specific details", value: 75 },
        { text: "Need some prompts to fully recall", value: 50 },
        { text: "Often need to relearn significant portions", value: 25 }
      ]
    },
    // Add more questions as needed
  ]
};
