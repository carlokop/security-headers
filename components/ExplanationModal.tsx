
import React from 'react';
import { LoadingSpinner } from './icons';

interface ExplanationModalProps {
  header: string;
  text: string;
  isLoading: boolean;
  onClose: () => void;
}

export const ExplanationModal: React.FC<ExplanationModalProps> = ({ header, text, isLoading, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-dark-card rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-dark-border">
          <h3 className="text-xl font-semibold text-white">Uitleg voor <span className="text-brand-secondary">{header}</span></h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <LoadingSpinner />
              <p className="ml-3 text-dark-text-secondary">Uitleg ophalen...</p>
            </div>
          ) : (
            <p className="text-dark-text-secondary whitespace-pre-wrap leading-relaxed">{text}</p>
          )}
        </div>

        <div className="p-4 border-t border-dark-border text-right">
            <button
            onClick={onClose}
            className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-card focus:ring-brand-secondary transition-colors"
            >
            Sluiten
            </button>
        </div>
      </div>
    </div>
  );
};
