import React, { useState } from 'react';
import { Header } from './components/Header';
import { UrlInputForm } from './components/UrlInputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { analyzeUrlHeaders } from './services/geminiService';
import { AnalysisResult } from './types';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { SeoContent } from './components/SeoContent';

function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [headerToFocus, setHeaderToFocus] = useState<string | null>(null);


  const handleAnalyze = async () => {
    if (!url) return;
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
      const headerResults = await analyzeUrlHeaders(formattedUrl);
      
      setAnalysisResult({
        url: formattedUrl,
        headers: headerResults,
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Een onbekende fout is opgetreden.';
      setAnalysisResult({
        url: url,
        headers: [],
        error: `Analyse mislukt. Zorg ervoor dat de URL correct is. Fout: ${errorMessage}`
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
      <div className="max-w-5xl mx-auto">
        <Header />
        <LanguageSwitcher />
        <main>
          <UrlInputForm
            url={url}
            setUrl={setUrl}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
          {analysisResult && (
            <ResultsDisplay 
              result={analysisResult} 
              onFocusHeader={handleFocusHeader}
            />
          )}
        </main>
        <SeoContent 
          headerToFocus={headerToFocus}
          setHeaderToFocus={setHeaderToFocus}
        />
      </div>
    </div>
  );
}

export default App;