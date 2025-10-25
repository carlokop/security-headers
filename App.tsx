import React, { useState } from 'react';
import { Header } from './components/Header';
import { UrlInputForm } from './components/UrlInputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { ExplanationModal } from './components/ExplanationModal';
import { getExplanationForHeader, analyzeUrlHeaders } from './services/geminiService';
import { AnalysisResult } from './types';

function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const [explanationModal, setExplanationModal] = useState({
    isOpen: false,
    header: '',
    value: null as string | null,
    text: '',
    isLoading: false,
  });

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

  const handleExplainHeader = async (header: string, value: string | null) => {
    setExplanationModal({ isOpen: true, header, value, text: '', isLoading: true });
    try {
      const explanation = await getExplanationForHeader(header, value);
      setExplanationModal(prev => ({ ...prev, text: explanation, isLoading: false }));
    } catch (error) {
      setExplanationModal(prev => ({ ...prev, text: 'Kon de uitleg niet ophalen.', isLoading: false }));
    }
  };

  const closeExplanationModal = () => {
    setExplanationModal({ isOpen: false, header: '', value: null, text: '', isLoading: false });
  }

  return (
    <div className="bg-dark-bg min-h-screen text-dark-text font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
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
              onExplainHeader={handleExplainHeader}
            />
          )}
        </main>
      </div>

      {explanationModal.isOpen && (
        <ExplanationModal
          header={explanationModal.header}
          text={explanationModal.text}
          isLoading={explanationModal.isLoading}
          onClose={closeExplanationModal}
        />
      )}
    </div>
  );
}

export default App;
