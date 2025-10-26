
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { UrlInputForm } from './components/UrlInputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { analyzeUrlHeaders } from './services/geminiService';
import { AnalysisResult } from './types';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { SeoContent } from './components/SeoContent';
import { useTranslations } from './hooks/useTranslations';
import { LoadingOverlay } from './components/LoadingOverlay';

// Add type definition for window.dataLayer for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}

interface MainPageProps {
  lang: 'nl' | 'en' | 'de' | 'fr' | 'es';
}

function MainPage({ lang }: MainPageProps) {
  const { t } = useTranslations(lang);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [headerToFocus, setHeaderToFocus] = useState<string | null>(null);

  // FIX: Add a useEffect hook to reset the component's state whenever the `lang` prop changes.
  // This replaces the behavior of remounting the component via a `key` prop, which was causing TypeScript errors in App.tsx.
  useEffect(() => {
    setUrl('');
    setIsLoading(false);
    setAnalysisResult(null);
    setHeaderToFocus(null);
  }, [lang]);

  // FIX: Create a wrapper for the translation function that ensures a string is returned.
  // The original `t` function returns `string | string[]`, which caused type errors where a `string` was strictly expected.
  const tString = (key: string, options?: { [key: string]: string }): string => {
    const result = t(key, options);
    if (typeof result === 'string') {
      return result;
    }
    console.warn(`Translation for key '${key}' returned an array where a string was expected.`);
    return Array.isArray(result) ? result.join(' ') : key;
  };

  const handleAnalyze = async () => {
    if (!url) return;
    
    const startTime = performance.now();
    const analysisId = crypto.randomUUID();

    // Push to dataLayer for analytics
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'analyse_start',
      url: url,
      analysis_id: analysisId,
    });

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
      const headerResults = await analyzeUrlHeaders(formattedUrl);
      
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);

      const resultsForDataLayer = headerResults.reduce((acc, current) => {
          acc[current.header] = current.value ?? '';
          return acc;
      }, {} as Record<string, string>);

      window.dataLayer.push({
          event: 'analyse_finish',
          url: formattedUrl,
          tijd: duration,
          result: resultsForDataLayer,
          analysis_id: analysisId,
      });

      setAnalysisResult({
        url: formattedUrl,
        headers: headerResults,
      });

    } catch (error) {
      // FIX: Use the `tString` wrapper to ensure error messages are strings, resolving type errors.
      const errorMessage = error instanceof Error ? error.message : tString('errors.unknown');
      setAnalysisResult({
        url: url,
        headers: [],
        error: tString('errors.analysisFailed', { errorMessage })
      });
      console.error('Analysis failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFocusHeader = (header: string) => {
    setHeaderToFocus(header);
  };

  return (
    <div className="bg-dark-bg min-h-screen text-dark-text font-sans p-4 sm:p-12">
      <LoadingOverlay isLoading={isLoading} />
      <div className="max-w-5xl mx-auto">
        {/* FIX: Pass `tString` to components that expect a translation function returning only a string. */}
        <Header t={tString} />
        <LanguageSwitcher />
        <main>
          <UrlInputForm
            url={url}
            setUrl={setUrl}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            t={tString}
          />
          {analysisResult && (
            <ResultsDisplay 
              result={analysisResult} 
              onFocusHeader={handleFocusHeader}
              t={tString}
            />
          )}
        </main>
        <SeoContent 
          headerToFocus={headerToFocus}
          setHeaderToFocus={setHeaderToFocus}
          t={t}
        />
      </div>
    </div>
  );
}

export default MainPage;