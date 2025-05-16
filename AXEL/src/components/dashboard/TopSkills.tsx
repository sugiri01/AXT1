
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/layout/Card';
import { ProgressBar } from '@/components/ui/progress-bar';

interface Skill {
  name: string;
  progress: number;
  category: string;
}

const skills: Skill[] = [
  { name: 'Machine Learning', progress: 65, category: 'Data Science' },
  { name: 'Python', progress: 80, category: 'Programming' },
  { name: 'Data Visualization', progress: 45, category: 'Data Science' },
];

export const TopSkills: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Top Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-medium">{skill.name}</div>
                <div className="text-xs text-improved-visibility">{skill.category}</div>
              </div>
              <div className="font-medium">{skill.progress}%</div>
            </div>
            <ProgressBar value={skill.progress} height="md" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
