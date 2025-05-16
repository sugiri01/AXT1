
import React from 'react';

interface PageContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ 
  title, 
  description, 
  children 
}) => {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 animate-fade-in relative">
      <div className="mb-10 relative">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {description && (
          <p className="text-improved-visibility">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
};
