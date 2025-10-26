import React from 'react';

interface UrlInputFormProps {
  url: string;
  setUrl: (url: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  t: (key: string) => string;
}

export const UrlInputForm: React.FC<UrlInputFormProps> = ({ url, setUrl, onAnalyze, isLoading, t }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze();
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit}>
        <label htmlFor="url-input" className="block text-sm font-medium text-dark-text-secondary mb-2">
          {t('form.label')}
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            id="url-input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t('form.placeholder')}
            className="flex-grow bg-gray-700 border border-dark-border text-dark-text rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary px-4 py-3"
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-card focus:ring-brand-secondary disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? t('form.button.analyzing') : t('form.button.analyze')}
          </button>
        </div>
      </form>
    </div>
  );
};