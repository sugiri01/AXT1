
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/layout/Card';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { ProgressBar } from '@/components/ui/progress-bar';
import { HistoricalResultType } from '@/types/psychometrics';

interface TestHistoryProps {
  historicalResults: HistoricalResultType[];
}

export const TestHistory: React.FC<TestHistoryProps> = ({
  historicalResults
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test History</CardTitle>
        <CardDescription>Track your progress over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {historicalResults.map((result, idx) => (
            <div key={idx} className="border-b border-axelari-navy-light pb-4 mb-4 last:border-0">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-white">{result.testName}</h4>
                  <p className="text-sm text-gray-400">
                    Completed on {new Date(result.date).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <History className="h-4 w-4 mr-1" />
                  Compare
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {result.dimensions.map((dim, dimIdx) => (
                  <div key={dimIdx}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-white">{dim.name}</span>
                      <span className="text-xs text-white">{dim.score}%</span>
                    </div>
                    <ProgressBar value={dim.score} height="sm" color="default" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
