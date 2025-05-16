
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from 'lucide-react';
import { TestSection } from '@/components/psychometrics/TestSection';
import { LearningProfile } from '@/components/psychometrics/LearningProfile';
import { LearningDimensions } from '@/components/psychometrics/LearningDimensions';
import { TestHistory } from '@/components/psychometrics/TestHistory';
import { PathRecommendations } from '@/components/psychometrics/PathRecommendations';
import { TestQuestions } from '@/components/psychometrics/TestQuestions';
import { 
  testSections as initialTestSections,
  learningProfile as initialLearningProfile,
  learningDimensions as initialLearningDimensions,
  historicalResults as initialHistoricalResults
} from '@/components/psychometrics/TestData';
import { TestSectionType, HistoricalResultType, DimensionType, LearningProfileType, CompatibleLearningPathType } from '@/types/psychometrics';
import { useToast } from '@/hooks/use-toast';

const OriginalPsychometricTest: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tests' | 'results' | 'history' | 'recommendations'>('tests');
  const [expandedTest, setExpandedTest] = useState<number | null>(null);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [testSections, setTestSections] = useState<TestSectionType[]>(initialTestSections);
  const [activeTest, setActiveTest] = useState<TestSectionType | null>(null);
  const [historicalResults, setHistoricalResults] = useState<HistoricalResultType[]>(initialHistoricalResults);
  const [learningProfile, setLearningProfile] = useState<LearningProfileType>(initialLearningProfile);
  const [learningDimensions, setLearningDimensions] = useState(initialLearningDimensions);
  const { toast } = useToast();

  // Update learning profile and dimensions based on completed tests
  useEffect(() => {
    // Only update if there are completed tests
    const completedTests = testSections.filter(test => test.status === 'completed');
    if (completedTests.length === 0) return;
    
    // Extract all dimensions from completed tests
    const allDimensions: DimensionType[] = [];
    completedTests.forEach(test => {
      if (test.dimensions) {
        allDimensions.push(...test.dimensions);
      }
    });
    
    // Group and average dimensions by name
    const dimensionGroups: Record<string, number[]> = {};
    allDimensions.forEach(dim => {
      if (!dimensionGroups[dim.name]) {
        dimensionGroups[dim.name] = [];
      }
      dimensionGroups[dim.name].push(dim.score);
    });
    
    // Create updated dimensions with averaged scores
    const updatedDimensions = Object.entries(dimensionGroups).map(([name, scores]) => {
      const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      
      // Find the existing dimension to preserve color and percentile
      const existingDimension = learningDimensions.find(d => d.name === name);
      return {
        name,
        value: averageScore,
        color: existingDimension?.color || 'default',
        percentile: Math.min(99, Math.round(averageScore * 0.8 + Math.random() * 20)), // Generate realistic percentile
        confidenceInterval: [
          Math.max(0, averageScore - Math.round(Math.random() * 15)),
          Math.min(100, averageScore + Math.round(Math.random() * 15))
        ]
      };
    });
    
    if (updatedDimensions.length > 0) {
      setLearningDimensions(updatedDimensions);
    }
    
    // Update learning profile based on dominant dimensions
    if (updatedDimensions.length > 0) {
      // Find dominant dimension
      const dominantDimension = [...updatedDimensions].sort((a, b) => b.value - a.value)[0];
      
      // Create personalized paths based on test results
      const personalizedPaths: CompatibleLearningPathType[] = [
        {
          id: 1,
          name: `${dominantDimension.name}-Optimized Learning Path`,
          score: Math.round(70 + Math.random() * 20)
        },
        {
          id: 2,
          name: 'Balanced Cognitive Development',
          score: Math.round(65 + Math.random() * 15)
        },
        {
          id: 3,
          name: 'Advanced Problem-Solving Track',
          score: Math.round(60 + Math.random() * 25)
        }
      ];
      
      // Create profile type based on dominant dimensions
      const profileType = `${dominantDimension.name}-Dominant Learner`;
      
      // Update learning profile
      setLearningProfile({
        ...learningProfile,
        type: profileType,
        description: `Your learning style is predominantly characterized by strong ${dominantDimension.name} capabilities. This shapes how you process and retain information most effectively.`,
        confidenceScore: Math.round(70 + (completedTests.length * 5)),
        compatibleLearningPaths: personalizedPaths
      });
    }
  }, [testSections]);

  // Handle starting a test
  const handleStartTest = (sectionId: number) => {
    const section = testSections.find(s => s.id === sectionId);
    if (section) {
      setActiveTest(section);
    }
  };

  // Handle cancelling a test
  const handleCancelTest = () => {
    setActiveTest(null);
  };

  // Handle completing a test
  const handleCompleteTest = (sectionId: number, score: number, dimensions: DimensionType[]) => {
    // Update test section status
    setTestSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          status: 'completed' as const,
          score,
          dimensions,
          // Generate random reliability data for completed tests
          reliability: {
            cronbachAlpha: parseFloat((0.7 + Math.random() * 0.25).toFixed(2)),
            confidenceInterval: [
              Math.max(score - Math.floor(Math.random() * 15), 0), 
              Math.min(score + Math.floor(Math.random() * 15), 100)
            ]
          }
        };
      }
      return section;
    }));

    // Add to historical results
    const newHistoricalEntry: HistoricalResultType = {
      date: new Date().toISOString().split('T')[0],
      testName: testSections.find(s => s.id === sectionId)?.name || "Assessment",
      dimensions
    };

    setHistoricalResults(prev => [newHistoricalEntry, ...prev]);
    setActiveTest(null);
    
    // Show completion toast
    toast({
      title: "Assessment Completed!",
      description: "Your results are now available in the 'My Results' tab.",
    });

    // Switch to results tab
    setActiveTab('results');
  };

  // If user is taking a test, show the test questions
  if (activeTest) {
    return (
      <TestQuestions
        section={activeTest}
        onComplete={handleCompleteTest}
        onCancel={handleCancelTest}
      />
    );
  }

  return (
    <div className="w-full">
      {/* Enhanced Tab Navigation */}
      <Tabs defaultValue="tests" className="w-full">
        <TabsList className="grid grid-cols-4 max-w-xl mb-8">
          <TabsTrigger value="tests" onClick={() => setActiveTab('tests')}>Available Tests</TabsTrigger>
          <TabsTrigger value="results" onClick={() => setActiveTab('results')}>My Results</TabsTrigger>
          <TabsTrigger value="history" onClick={() => setActiveTab('history')}>History</TabsTrigger>
          <TabsTrigger value="recommendations" onClick={() => setActiveTab('recommendations')}>Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tests" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Assessment Categories</h2>
            <div className="flex items-center">
              <span className="text-sm mr-3 text-white">Show statistical details</span>
              <button 
                className={`px-2 py-1 rounded ${showStats ? 'bg-axelari-teal text-white' : 'bg-axelari-navy-light text-gray-300'}`}
                onClick={() => setShowStats(!showStats)}
              >
                {showStats ? 'On' : 'Off'}
              </button>
            </div>
          </div>
          
          {testSections.map((section) => (
            <TestSection 
              key={section.id}
              section={section}
              expandedTest={expandedTest}
              setExpandedTest={setExpandedTest}
              showStats={showStats}
              onStartTest={handleStartTest}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="results" className="space-y-8">
          {testSections.some(test => test.status === 'completed') ? (
            <>
              {/* Learning Profile Card */}
              <LearningProfile learningProfile={learningProfile} showStats={showStats} />
              
              {/* Learning Dimensions Card */}
              <LearningDimensions 
                learningDimensions={learningDimensions} 
                showStats={showStats} 
                setShowStats={setShowStats} 
              />
            </>
          ) : (
            <div className="text-center p-12 border border-dashed border-axelari-navy-light rounded-lg">
              <h3 className="text-xl font-medium mb-2">No Results Yet</h3>
              <p className="text-white mb-6">Complete at least one assessment to see your learning profile and dimensions.</p>
              <button 
                className="px-4 py-2 rounded bg-axelari-teal text-white"
                onClick={() => setActiveTab('tests')}
              >
                Go to Tests
              </button>
            </div>
          )}
        </TabsContent>
        
        {/* Historical Data Tab */}
        <TabsContent value="history" className="space-y-8">
          {historicalResults.length > 0 ? (
            <TestHistory historicalResults={historicalResults} />
          ) : (
            <div className="text-center p-12 border border-dashed border-axelari-navy-light rounded-lg">
              <h3 className="text-xl font-medium mb-2">No Test History</h3>
              <p className="text-white mb-6">Complete at least one assessment to track your progress over time.</p>
              <button 
                className="px-4 py-2 rounded bg-axelari-teal text-white"
                onClick={() => setActiveTab('tests')}
              >
                Go to Tests
              </button>
            </div>
          )}
        </TabsContent>
        
        {/* Path Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          {testSections.some(test => test.status === 'completed') ? (
            <PathRecommendations learningProfile={learningProfile} />
          ) : (
            <div className="text-center p-12 border border-dashed border-axelari-navy-light rounded-lg">
              <h3 className="text-xl font-medium mb-2">No Recommendations Yet</h3>
              <p className="text-white mb-6">Complete at least one assessment to receive personalized learning path recommendations.</p>
              <button 
                className="px-4 py-2 rounded bg-axelari-teal text-white"
                onClick={() => setActiveTab('tests')}
              >
                Go to Tests
              </button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OriginalPsychometricTest;
