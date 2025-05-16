
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/layout/Card';
import { TestQuestion } from './TestQuestion';
import { TestNavigation } from './TestNavigation';
import { ProgressIndicator } from './ProgressIndicator';

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface TestQuestionsProps {
  questions: Question[];
  onComplete: (answers: number[]) => void;
}

const TestQuestions: React.FC<TestQuestionsProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(
    Array(questions.length).fill(null)
  );

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Filter out any null answers and send only valid responses
    const validAnswers = answers.filter((answer) => answer !== null) as number[];
    onComplete(validAnswers);
  };

  return (
    <Card>
      <CardContent>
        <ProgressIndicator 
          currentQuestion={currentQuestion} 
          totalQuestions={questions.length} 
        />

        <TestQuestion
          question={questions[currentQuestion].text}
          options={questions[currentQuestion].options}
          selected={answers[currentQuestion]}
          onSelect={handleSelectOption}
        />

        <TestNavigation
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          onNext={handleNext}
          onPrev={handlePrevious}
          onSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  );
};

export default TestQuestions;
