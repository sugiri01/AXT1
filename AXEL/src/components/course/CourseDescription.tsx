
import React from 'react';

interface CourseDescriptionProps {
  title: string;
}

const CourseDescription: React.FC<CourseDescriptionProps> = ({ title }) => {
  return (
    <div className="border-t border-border pt-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">Description</h3>
      <p className="text-muted-foreground">
        Learn {title} from the ground up in this comprehensive course designed for beginners 
        and intermediate learners. This course covers fundamental concepts, practical techniques,
        and hands-on projects to reinforce learning. By the end of this course, you'll be proficient
        and ready to tackle real-world challenges!
      </p>
    </div>
  );
};

export default CourseDescription;
