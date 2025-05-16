
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface VersionToggleProps {
  originalVersion: string;
  enhancedVersion: string;
  currentVersion: 'original' | 'enhanced';
  onToggle: (version: 'original' | 'enhanced') => void;
}

export const VersionToggle: React.FC<VersionToggleProps> = ({
  originalVersion,
  enhancedVersion,
  currentVersion,
  onToggle
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-axelari-navy-light border border-axelari-navy-light rounded-lg shadow-lg p-3">
      <div className="text-sm text-white mb-2 font-medium">UI Version Testing</div>
      <div className="flex gap-2">
        <Button 
          variant={currentVersion === 'original' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onToggle('original')}
          className={currentVersion === 'original' ? 'bg-axelari-teal' : ''}
        >
          Original
        </Button>
        <Button 
          variant={currentVersion === 'enhanced' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onToggle('enhanced')}
          className={currentVersion === 'enhanced' ? 'bg-axelari-teal' : ''}
        >
          Enhanced
        </Button>
      </div>
    </div>
  );
};
