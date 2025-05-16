
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/layout/Card';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

interface Skill {
  subject: string;
  value: number;
  fullMark: number;
}

const skillsData: Skill[] = [
  { subject: 'Problem Solving', value: 75, fullMark: 100 },
  { subject: 'Visualization', value: 85, fullMark: 100 },
  { subject: 'Critical Thinking', value: 68, fullMark: 100 },
  { subject: 'Programming', value: 80, fullMark: 100 },
  { subject: 'Communication', value: 65, fullMark: 100 },
  { subject: 'Data Analysis', value: 72, fullMark: 100 },
];

export const SkillsDistribution: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Skills Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
              <PolarGrid stroke="#2D3748" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 12 }} />
              <PolarRadiusAxis stroke="#2D3748" tick={{ fill: '#94A3B8' }} />
              <Radar
                name="Skills"
                dataKey="value"
                stroke="#06B6D4"
                fill="#06B6D4"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
