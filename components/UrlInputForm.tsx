import React from 'react';

interface UrlInputFormProps {
  url: string;
  setUrl: (url: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const UrlInputForm: React.FC<UrlInputFormProps> = ({ url, setUrl, onAnalyze, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze();
  };

  return (
    <div className="bg-dark-card p-6 rounded-lg shadow-lg mb-8">
      <form onSubmit={handleSubmit}>
        <label htmlFor="url-input" className="block text-sm font-medium text-dark-text-secondary mb-2">
          Website URL
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            id="url-input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="www.voorbeeld.nl"
            className="flex-grow bg-gray-700 border border-dark-border text-dark-text rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary px-4 py-3"
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-card focus:ring-brand-secondary disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Analyseren...' : 'Analyseren'}
          </button>
        </div>
      </form>
    </div>
  );
};