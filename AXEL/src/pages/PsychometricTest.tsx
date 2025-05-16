
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import OriginalPsychometricTest from './OriginalPsychometricTest';

const PsychometricTest: React.FC = () => {
  return (
    <PageContainer
      title="Psychometric Tests"
      description="Discover your optimal learning style and cognitive patterns to personalize your learning journey."
    >
      <OriginalPsychometricTest />
    </PageContainer>
  );
};

export default PsychometricTest;
