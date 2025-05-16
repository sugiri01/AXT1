
import { LucideIcon } from 'lucide-react';

export interface DimensionType {
  name: string;
  score: number;
}

export interface TestSectionType {
  id: number;
  name: string;
  description: string;
  duration: string;
  questions: number;
  icon: LucideIcon;
  status: 'completed' | 'in-progress' | 'not-started';
  score?: number;
  progress?: number;
  dimensions?: DimensionType[];
  reliability?: {
    cronbachAlpha: number;
    confidenceInterval: number[];
  };
}

export interface CompatibleLearningPathType {
  id: number;
  name: string;
  score: number;
}

export interface LearningProfileType {
  type: string;
  description: string;
  confidenceScore: number;
  strengths: string[];
  challenges: string[];
  recommendations: string[];
  compatibleLearningPaths?: CompatibleLearningPathType[];
}

export interface LearningDimensionType {
  name: string;
  value: number;
  color: 'default' | 'warning' | 'success';
  percentile: number;
  confidenceInterval: number[];
}

export interface HistoricalResultType {
  date: string;
  testName: string;
  dimensions: DimensionType[];
}

// New interface for version toggle settings
export interface PsychometricVersionSettings {
  version: 'original' | 'enhanced';
  setVersion: (version: 'original' | 'enhanced') => void;
}
