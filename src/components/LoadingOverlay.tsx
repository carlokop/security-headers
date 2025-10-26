import React from 'react';
import { LoadingSpinner } from './icons';

interface LoadingOverlayProps {
  isLoading: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
      aria-label="Analysis in progress"
    >
      <div className="w-full max-w-[300px] p-4">
        <LoadingSpinner className="w-full h-auto" />
      </div>
    </div>
  );
};