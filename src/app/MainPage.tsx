'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { UrlInputForm } from '@/components/UrlInputForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { AnalysisResult, HeaderResult } from '@/types';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { SeoContent } from '@/components/SeoContent';
import { useTranslations } from '@/hooks/useTranslations';
import { LoadingOverlay } from '@/components/LoadingOverlay';

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

  useEffect(() => {
    setUrl('');
    setIsLoading(false);
    setAnalysisResult(null);
    setHeaderToFocus(null);
  }, [lang]);

  const tString = (key: string, options?: { [key: string]: string }): string => {
    const result = t(key, options);
    if (typeof result === 'string') {
      return result;
    }
    return Array.isArray(result) ? result.join(' ') : key;
  };

  const handleAnalyze = async () => {
    if (!url) return;
    
    const startTime = performance.now();
    const analysisId = crypto.randomUUID();

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
      
      const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: formattedUrl }),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'API request failed');
      }

      const headerResults: HeaderResult[] = await response.json();
      
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
    <div className="min-h-screen p-4 sm:p-12">
      <LoadingOverlay isLoading={isLoading} />
      <div className="max-w-5xl mx-auto">
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