
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/layout/Card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { ProgressBar } from '@/components/ui/progress-bar';
import { TestSectionType } from '@/types/psychometrics';

interface TestSectionProps {
  section: TestSectionType;
  expandedTest: number | null;
  setExpandedTest: (id: number | null) => void;
  showStats: boolean;
  onStartTest: (id: number) => void;
}

export const TestSection: React.FC<TestSectionProps> = ({
  section,
  expandedTest,
  setExpandedTest,
  showStats,
  onStartTest
}) => {
  const SectionIcon = section.icon;

  return (
    <Card className="overflow-hidden relative">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="bg-axelari-navy-light p-6 flex items-center justify-center md:w-24">
            <SectionIcon className="h-10 w-10 text-axelari-teal" />
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
            <p className="text-white mb-4">{section.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-white mb-4">
              <div className="flex items-center">
                <span className="mr-1">⏱️</span>
                <span>{section.duration}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">🧪</span>
                <span>{section.questions} questions</span>
              </div>
            </div>
            
            {section.status === 'in-progress' && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1 text-white">
                  <span>Progress</span>
                  <span>{section.progress}%</span>
                </div>
                <ProgressBar value={section.progress || 0} height="sm" color="default" />
              </div>
            )}
            
            {section.status === 'completed' && (
              <>
                <div className="flex items-center">
                  <span className="h-5 w-5 text-axelari-teal mr-2">🏆</span>
                  <span className="font-medium text-white">Overall Score: {section.score}%</span>
                </div>
                
                {/* Expandable section details */}
                {expandedTest === section.id && (
                  <div className="mt-4 space-y-4 border-t border-axelari-navy-light pt-4">
                    <h4 className="font-medium text-white">Dimension Breakdown:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.dimensions && section.dimensions.map((dim, idx) => (
                        <div key={idx} className="relative">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white">{dim.name}</span>
                            <span className="text-sm text-white">{dim.score}%</span>
                          </div>
                          <ProgressBar value={dim.score} height="sm" color="default" />
                        </div>
                      ))}
                    </div>
                    
                    {showStats && section.reliability && (
                      <div className="bg-axelari-navy-light/50 p-3 rounded-md mt-4">
                        <h5 className="text-white text-sm font-medium mb-2 flex items-center">
                          <span className="mr-1">ℹ️</span>
                          Statistical Validity
                        </h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-300 mb-1">Internal Consistency (α)</p>
                            <p className="text-white font-medium">{section.reliability.cronbachAlpha}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-300 mb-1">Confidence Interval</p>
                            <p className="text-white font-medium">{section.reliability.confidenceInterval[0]}% - {section.reliability.confidenceInterval[1]}%</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
            
            <div className="mt-4 flex justify-between items-center">
              {section.status === 'not-started' && (
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => onStartTest(section.id)}
                >
                  Start Test
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              {section.status === 'in-progress' && (
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => onStartTest(section.id)}
                >
                  Continue
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              {section.status === 'completed' && (
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => onStartTest(section.id)}
                >
                  Retake Test
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              
              {section.status === 'completed' && (
                <Button 
                  variant="ghost" 
                  onClick={() => setExpandedTest(expandedTest === section.id ? null : section.id)}
                  className="text-axelari-teal"
                >
                  {expandedTest === section.id ? 'Hide Details' : 'Show Details'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
