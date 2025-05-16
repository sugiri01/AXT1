
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/layout/Card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3 } from 'lucide-react';
import { LearningProfileType } from '@/types/psychometrics';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

interface PathRecommendationsProps {
  learningProfile: LearningProfileType;
}

export const PathRecommendations: React.FC<PathRecommendationsProps> = ({
  learningProfile
}) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Handler to navigate to the learning paths page with path ID
  const handleViewPath = (pathId: number) => {
    // Navigate to learning paths page with a flag that can be used to highlight the path
    navigate(`/learning-paths?recommended=${pathId}`);
  };
  
  // If there are no compatible learning paths, show a message
  if (!learningProfile.compatibleLearningPaths || learningProfile.compatibleLearningPaths.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Personalized Learning Path Recommendations</CardTitle>
          <CardDescription>Complete more assessments to get tailored recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 text-center">
            <BarChart3 className="h-12 w-12 text-axelari-teal mx-auto mb-3" />
            <p className={isDark ? "text-white" : "text-gray-700"}>
              We need more data to generate personalized recommendations for you.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalized Learning Path Recommendations</CardTitle>
        <CardDescription>Paths tailored to your {learningProfile.type}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {learningProfile.compatibleLearningPaths?.map((path, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col md:flex-row p-4 border rounded-lg ${
                isDark 
                  ? 'border-axelari-navy-light' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="md:w-3/4">
                <div className="flex items-center mb-3">
                  <div className="h-8 w-8 rounded-full bg-axelari-teal flex items-center justify-center mr-3">
                    <span className="text-white font-bold">{idx + 1}</span>
                  </div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {path.name}
                  </h3>
                </div>
                <div className="flex items-center mb-2">
                  <span className={`text-sm mr-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                    Profile Match:
                  </span>
                  <span className="font-semibold text-axelari-teal">{path.score}%</span>
                </div>
                <p className={`mb-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                  This learning path is highly aligned with your {learningProfile.type} profile and cognitive strengths.
                </p>
              </div>
              <div className={`md:w-1/4 md:border-l ${
                isDark ? 'md:border-axelari-navy-light' : 'md:border-gray-200'
              } md:pl-4 flex md:flex-col justify-between items-center md:items-center mt-4 md:mt-0`}>
                <div className="flex flex-col items-center">
                  <span className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Estimated time
                  </span>
                  <span className={isDark ? 'text-white' : 'text-gray-700'}>
                    {8 + idx * 4} weeks
                  </span>
                </div>
                <Button 
                  onClick={() => handleViewPath(path.id)}
                  className="mt-4 w-full md:w-auto flex items-center justify-center"
                >
                  View Path <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
