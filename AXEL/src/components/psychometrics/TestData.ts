
import { Brain, Lightbulb, Eye, Book } from 'lucide-react';
import { 
  TestSectionType, 
  LearningProfileType, 
  LearningDimensionType,
  HistoricalResultType 
} from '@/types/psychometrics';

// Test sections with multi-dimensional metrics
export const testSections: TestSectionType[] = [
  { 
    id: 1,
    name: 'Learning Style Assessment',
    description: 'Identify your preferred ways of processing and retaining information',
    duration: '15 min',
    questions: 20,
    icon: Brain,
    status: 'completed',
    score: 85,
    dimensions: [
      { name: 'Visual', score: 85 },
      { name: 'Auditory', score: 45 },
      { name: 'Reading/Writing', score: 60 },
      { name: 'Kinesthetic', score: 70 },
      { name: 'Social Learning', score: 55 },
      { name: 'Solitary Learning', score: 75 }
    ],
    reliability: {
      cronbachAlpha: 0.87,
      confidenceInterval: [79, 91]
    }
  },
  { 
    id: 2,
    name: 'Cognitive Processing',
    description: 'Measure how you process complex information and solve problems',
    duration: '25 min',
    questions: 30,
    icon: Lightbulb,
    status: 'in-progress',
    progress: 60,
    dimensions: [
      { name: 'Working Memory', score: 72 },
      { name: 'Processing Speed', score: 68 },
      { name: 'Pattern Recognition', score: 80 },
      { name: 'Sequential Thinking', score: 45 },
      { name: 'Holistic Thinking', score: 76 },
      { name: 'Complexity Tolerance', score: 65 }
    ]
  },
  { 
    id: 3,
    name: 'Focus & Attention Span',
    description: 'Analyze your attention patterns and optimal focus duration',
    duration: '20 min',
    questions: 25,
    icon: Eye,
    status: 'not-started',
    dimensions: [
      { name: 'Sustained Attention', score: 0 },
      { name: 'Distraction Sensitivity', score: 0 },
      { name: 'Attention Recovery', score: 0 },
      { name: 'Focus Intensity', score: 0 },
      { name: 'Time-of-Day Patterns', score: 0 }
    ]
  },
  { 
    id: 4,
    name: 'Information Retention',
    description: 'Evaluate how you retain information over different time periods',
    duration: '30 min',
    questions: 35,
    icon: Book,
    status: 'not-started',
    dimensions: [
      { name: 'Short-term Memory', score: 0 },
      { name: 'Long-term Memory', score: 0 },
      { name: 'Visual Retention', score: 0 },
      { name: 'Auditory Retention', score: 0 },
      { name: 'Spaced Repetition Interval', score: 0 }
    ]
  }
];

// Learning profile results
export const learningProfile: LearningProfileType = {
  type: 'Visual-Spatial Learner',
  description: 'You learn best through visual aids, spatial relationships, and when content is presented with strong visual elements.',
  confidenceScore: 92,
  strengths: [
    'Processing visual information quickly',
    'Understanding spatial relationships',
    'Creative problem solving',
    'Big picture thinking',
    'Intuitive understanding of complex systems'
  ],
  challenges: [
    'Processing lengthy text without visuals',
    'Following sequential instructions',
    'Time management during tasks',
    'Maintaining focus during purely auditory lectures'
  ],
  recommendations: [
    'Use concept maps and diagrams',
    'Convert text information to visual formats',
    'Study in environments with minimal visual distractions',
    'Use color coding for organization',
    'Leverage visualization techniques for memorization',
    'Seek interactive learning materials with strong visual elements'
  ],
  compatibleLearningPaths: [
    { id: 1, name: 'Data Visualization Specialist', score: 94 },
    { id: 2, name: 'UX/UI Design Fundamentals', score: 89 },
    { id: 3, name: 'Architecture & Spatial Computing', score: 86 }
  ]
};

// Learning style dimensions with statistical context
export const learningDimensions: LearningDimensionType[] = [
  { name: 'Visual', value: 85, color: 'default', percentile: 92, confidenceInterval: [80, 90] },
  { name: 'Auditory', value: 45, color: 'default', percentile: 62, confidenceInterval: [40, 50] },
  { name: 'Reading/Writing', value: 60, color: 'default', percentile: 75, confidenceInterval: [55, 65] },
  { name: 'Kinesthetic', value: 70, color: 'default', percentile: 84, confidenceInterval: [65, 75] },
  { name: 'Sequential', value: 40, color: 'warning', percentile: 35, confidenceInterval: [35, 45] },
  { name: 'Global', value: 75, color: 'success', percentile: 88, confidenceInterval: [70, 80] },
  { name: 'Active', value: 65, color: 'success', percentile: 78, confidenceInterval: [60, 70] },
  { name: 'Reflective', value: 55, color: 'default', percentile: 65, confidenceInterval: [50, 60] }
];

// Historical test results for comparison
export const historicalResults: HistoricalResultType[] = [
  { 
    date: '2024-04-15',
    testName: 'Learning Style Assessment',
    dimensions: [
      { name: 'Visual', score: 80 },
      { name: 'Auditory', score: 42 },
      { name: 'Reading/Writing', score: 58 },
      { name: 'Kinesthetic', score: 67 }
    ]
  },
  { 
    date: '2024-02-20',
    testName: 'Learning Style Assessment',
    dimensions: [
      { name: 'Visual', score: 78 },
      { name: 'Auditory', score: 40 },
      { name: 'Reading/Writing', score: 55 },
      { name: 'Kinesthetic', score: 65 }
    ]
  }
];
