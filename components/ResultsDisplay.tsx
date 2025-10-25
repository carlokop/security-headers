import React from 'react';
import { AnalysisResult, HeaderResult } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';

interface ResultsDisplayProps {
  result: AnalysisResult;
  onExplainHeader: (header: string, value: string | null) => void;
}

const ResultRow: React.FC<{ headerResult: HeaderResult; onExplainHeader: (header: string, value: string | null) => void; }> = ({ headerResult, onExplainHeader }) => {
  const { header, value, present } = headerResult;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto,1fr,auto] lg:grid-cols-[250px,1fr,auto] gap-x-6 gap-y-3 items-center py-4 border-b border-dark-border last:border-b-0">
      {/* Column 1: Header Name */}
      <div className="flex items-center">
        {present ? <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /> : <XCircleIcon className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />}
        <span className="font-mono text-base text-white break-all">{header}</span>
      </div>

      {/* Column 2: Value */}
      <p className="font-mono text-sm text-dark-text-secondary break-all md:pl-0">{value || 'Niet aanwezig'}</p>
      
      {/* Column 3: Button */}
      <div className="justify-self-start md:justify-self-end">
        <button
          onClick={() => onExplainHeader(header, value)}
          className="px-4 py-1.5 text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-card focus:ring-brand-secondary transition-colors"
        >
          Uitleg
        </button>
      </div>
    </div>
  );
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onExplainHeader }) => {
  if (result.error) {
    return (
      <div className="mt-8 bg-dark-card rounded-lg shadow-lg p-6 text-center text-red-400">
        {result.error}
      </div>
    );
  }

  if (!result.headers || result.headers.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-dark-card rounded-lg shadow-lg">
      <div className="p-6 border-b border-dark-border">
        <h2 className="text-2xl font-semibold text-white">Resultaten voor <span className="text-brand-secondary">{result.url}</span></h2>
      </div>
      <div className="p-6">
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