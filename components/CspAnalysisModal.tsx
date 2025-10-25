import React from 'react';
import { LoadingSpinner } from './icons';

interface CspAnalysisModalProps {
  cspValue: string;
  analysis: string;
  isLoading: boolean;
  onClose: () => void;
}

export const CspAnalysisModal: React.FC<CspAnalysisModalProps> = ({ cspValue, analysis, isLoading, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-dark-card rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-dark-border">
          <h3 className="text-xl font-semibold text-white">
            Analyse van Content-Security-Policy
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="mb-4">
            <h4 className="font-semibold text-dark-text-secondary mb-1">Huidige waarde:</h4>
            <pre className="bg-dark-card-secondary p-3 rounded-md text-sm text-dark-text whitespace-pre-wrap break-all">
                <code>{cspValue}</code>
            </pre>
          </div>
          <hr className="border-dark-border my-4" />
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <LoadingSpinner />
              <p className="ml-3 text-dark-text-secondary">CSP analyseren...</p>
            </div>
          ) : (
             <div className="text-dark-text-secondary whitespace-pre-wrap leading-relaxed">
                {analysis}
             </div>
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
