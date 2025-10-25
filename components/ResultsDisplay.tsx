import React from 'react';
import { AnalysisResult, HeaderResult } from '../types';
import { CheckCircleIcon, XCircleIcon, QuestionMarkCircleIcon } from './icons';

interface ResultsDisplayProps {
  result: AnalysisResult;
  onExplainHeader: (header: string, value: string | null) => void;
}

const ResultRow: React.FC<{ headerResult: HeaderResult; onExplainHeader: (header: string, value: string | null) => void; }> = ({ headerResult, onExplainHeader }) => {
  const { header, value, present } = headerResult;

  return (
    <div className="flex items-center justify-between p-4 bg-dark-card rounded-lg mb-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          {present ? <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /> : <XCircleIcon className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />}
          <span className="font-mono text-lg text-white truncate">{header}</span>
        </div>
        <p className="font-mono text-sm text-dark-text-secondary break-all mt-1 ml-9">{value || 'Niet aanwezig'}</p>
      </div>
      <div className="flex items-center ml-4 flex-shrink-0">
        <button
          onClick={() => onExplainHeader(header, value)}
          className="p-1 text-dark-text-secondary hover:text-brand-secondary"
          title="Uitleg opvragen"
        >
          <QuestionMarkCircleIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onExplainHeader }) => {
  if (result.error) {
    return <div className="mt-8 text-center text-red-400 bg-red-900/50 p-4 rounded-md">{result.error}</div>;
  }

  if (!result.headers || result.headers.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-white mb-4">Resultaten voor <span className="text-brand-secondary">{result.url}</span></h2>
      <div>
        {result.headers.map(headerResult => (
          <ResultRow 
            key={headerResult.header} 
            headerResult={headerResult} 
            onExplainHeader={onExplainHeader}
          />
        ))}
      </div>
    </div>
  );
};
