
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/layout/Card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, TestTube, ChevronRight, LightbulbOff, Lightbulb, Award, Book, Eye, Search, Clock } from 'lucide-react';
import { ProgressBar } from '@/components/ui/progress-bar';

// Sample test sections
const testSections = [
  { 
    id: 1,
    name: 'Learning Style Assessment',
    description: 'Identify your preferred ways of processing and retaining information',
    duration: '15 min',
    questions: 20,
    icon: Brain,
    status: 'completed',
    score: 85
  },
  { 
    id: 2,
    name: 'Cognitive Processing',
    description: 'Measure how you process complex information and solve problems',
    duration: '25 min',
    questions: 30,
    icon: Lightbulb,
    status: 'in-progress',
    progress: 60
  },
  { 
    id: 3,
    name: 'Focus & Attention Span',
    description: 'Analyze your attention patterns and optimal focus duration',
    duration: '20 min',
    questions: 25,
    icon: Eye,
    status: 'not-started'
  },
  { 
    id: 4,
    name: 'Information Retention',
    description: 'Evaluate how you retain information over different time periods',
    duration: '30 min',
    questions: 35,
    icon: Book,
    status: 'not-started'
  }
];

// Sample learning profile results
const learningProfile = {
  type: 'Visual-Spatial Learner',
  description: 'You learn best through visual aids, spatial relationships, and when content is presented with strong visual elements.',
  strengths: [
    'Processing visual information quickly',
    'Understanding spatial relationships',
    'Creative problem solving',
    'Big picture thinking'
  ],
  challenges: [
    'Processing lengthy text without visuals',
    'Following sequential instructions',
    'Time management during tasks'
  ],
  recommendations: [
    'Use concept maps and diagrams',
    'Convert text information to visual formats',
    'Study in environments with minimal visual distractions',
    'Use color coding for organization'
  ]
};

// Sample learning style dimensions
const learningDimensions = [
  { name: 'Visual', value: 85, color: 'default' },
  { name: 'Auditory', value: 45, color: 'default' },
  { name: 'Reading/Writing', value: 60, color: 'default' },
  { name: 'Kinesthetic', value: 70, color: 'default' },
  { name: 'Sequential', value: 40, color: 'warning' },
  { name: 'Global', value: 75, color: 'success' },
  { name: 'Active', value: 65, color: 'success' },
  { name: 'Reflective', value: 55, color: 'default' }
];

const PsychometricTestBackup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tests' | 'results'>('tests');

  return (
    <PageContainer
      title="Psychometric Tests"
      description="Discover your optimal learning style and cognitive patterns to personalize your learning journey."
    >
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-axelari-navy-light rounded-lg p-1 max-w-xs">
        <button 
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${activeTab === 'tests' ? 'bg-axelari-navy text-white' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('tests')}
        >
          Available Tests
        </button>
        <button 
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${activeTab === 'results' ? 'bg-axelari-navy text-white' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('results')}
        >
          My Results
        </button>
      </div>
      
      {activeTab === 'tests' && (
        <div className="grid grid-cols-1 gap-6">
          {testSections.map((section) => (
            <Card key={section.id} className="overflow-hidden relative">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-axelari-navy-light p-6 flex items-center justify-center md:w-24">
                    <section.icon className="h-10 w-10 text-axelari-teal" />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-medium text-white">{section.name}</h3>
                      {section.status === 'completed' && (
                        <Badge className="bg-axelari-teal">Completed</Badge>
                      )}
                      {section.status === 'in-progress' && (
                        <Badge className="bg-axelari-purple">In Progress</Badge>
                      )}
                      {section.status === 'not-started' && (
                        <Badge className="bg-gray-400">Not Started</Badge>
                      )}
                    </div>
                    <p className="text-gray-400 mb-4">{section.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{section.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <TestTube className="h-4 w-4 mr-1" />
                        <span>{section.questions} questions</span>
                      </div>
                    </div>
                    
                    {section.status === 'in-progress' && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{section.progress}%</span>
                        </div>
                        <ProgressBar value={section.progress} height="sm" color="default" />
                      </div>
                    )}
                    
                    {section.status === 'completed' && (
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-axelari-teal mr-2" />
                        <span className="font-medium text-white">Score: {section.score}%</span>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      {section.status === 'not-started' && (
                        <Button className="flex items-center gap-2">
                          Start Test
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      )}
                      {section.status === 'in-progress' && (
                        <Button className="flex items-center gap-2">
                          Continue
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      )}
                      {section.status === 'completed' && (
                        <Button variant="outline" className="flex items-center gap-2">
                          View Results
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {activeTab === 'results' && (
        <div className="space-y-8">
          {/* Learning Profile Card */}
          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle>Your Learning Profile</CardTitle>
              <CardDescription>Based on completed assessment results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-axelari-navy-light">
                    <Brain className="h-6 w-6 text-axelari-teal" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{learningProfile.type}</h3>
                </div>
                <p className="text-gray-400">{learningProfile.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h4 className="text-lg font-medium mb-3 flex items-center text-white">
                    <Lightbulb className="h-5 w-5 text-axelari-teal mr-2" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {learningProfile.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-axelari-teal mr-2">•</span>
                        <span className="text-gray-200">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-3 flex items-center text-white">
                    <LightbulbOff className="h-5 w-5 text-axelari-purple mr-2" />
                    Challenges
                  </h4>
                  <ul className="space-y-2">
                    {learningProfile.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-axelari-purple mr-2">•</span>
                        <span className="text-gray-200">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-3 flex items-center text-white">
                  <Search className="h-5 w-5 text-axelari-teal mr-2" />
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {learningProfile.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-axelari-teal mr-2">•</span>
                      <span className="text-gray-200">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* Learning Dimensions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Style Dimensions</CardTitle>
              <CardDescription>Your preferences across different learning dimensions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningDimensions.map((dimension, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-white">{dimension.name}</span>
                      <span className="text-sm">{dimension.value}%</span>
                    </div>
                    <ProgressBar 
                      value={dimension.value} 
                      color={dimension.color === 'default' ? 'default' : dimension.color === 'success' ? 'success' : 'warning'}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center mt-6">
              <Button variant="outline" className="flex items-center gap-2">
                View Detailed Analysis
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </PageContainer>
  );
};

export default PsychometricTestBackup;
