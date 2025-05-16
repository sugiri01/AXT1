
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/layout/Card';
import { Brain, Lightbulb, LightbulbOff, Search } from 'lucide-react';
import { LearningProfileType } from '@/types/psychometrics';

interface LearningProfileProps {
  learningProfile: LearningProfileType;
  showStats: boolean;
}

export const LearningProfile: React.FC<LearningProfileProps> = ({
  learningProfile,
  showStats
}) => {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Your Learning Profile</CardTitle>
            <CardDescription>Based on completed assessment results</CardDescription>
          </div>
          {showStats && (
            <div className="bg-axelari-navy-light px-3 py-1 rounded-full flex items-center">
              <span className="text-xs text-gray-300 mr-2">Profile Confidence:</span>
              <span className="text-white font-medium">{learningProfile.confidenceScore}%</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-axelari-navy-light">
              <Brain className="h-6 w-6 text-axelari-teal" />
            </div>
            <h3 className="text-xl font-semibold text-white">{learningProfile.type}</h3>
          </div>
          <p className="text-white">{learningProfile.description}</p>
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
                  <span className="text-white">{strength}</span>
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
                  <span className="text-white">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-3 flex items-center text-white">
            <Search className="h-5 w-5 text-axelari-teal mr-2" />
            Personalized Learning Recommendations
          </h4>
          <ul className="space-y-2">
            {learningProfile.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <span className="text-axelari-teal mr-2">•</span>
                <span className="text-white">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
