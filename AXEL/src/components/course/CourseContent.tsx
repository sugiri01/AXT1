
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import CourseIntroVideo from './CourseIntroVideo';
import CourseStats from './CourseStats';
import CourseDescription from './CourseDescription';
import CourseCurriculum from './CourseCurriculum';
import { Section, Chapter } from '@/types/course';

interface CourseContentProps {
  title: string;
  description: string;
  level: string;
  hours: number;
  modules: number;
  curriculum: Section[];
  onViewLesson: (chapter: Chapter) => void;
}

const CourseContent: React.FC<CourseContentProps> = ({
  title,
  description,
  level,
  hours,
  modules,
  curriculum,
  onViewLesson
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
            level === 'Beginner' 
              ? 'bg-green-900/30 text-green-400 border-green-500/30'
              : level === 'Intermediate'
              ? 'bg-blue-900/30 text-blue-400 border-blue-500/30'
              : 'bg-purple-900/30 text-purple-400 border-purple-500/30'
          }`}>
            {level}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <CourseIntroVideo />
        <CourseStats hours={hours} modules={modules} />
        <CourseDescription title={title} />
        <CourseCurriculum curriculum={curriculum} onViewLesson={onViewLesson} />
      </CardContent>
    </Card>
  );
};

export default CourseContent;
