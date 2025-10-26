import React, { useEffect } from 'react';
import MainPage from './MainPage';

type LangCode = 'nl' | 'en' | 'de' | 'fr' | 'es';
type LocaleCode = 'nl-NL' | 'en-US' | 'de-DE' | 'fr-FR' | 'es-ES';

const langToLocaleMap: Record<LangCode, LocaleCode> = {
  nl: 'nl-NL',
  en: 'en-US',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
};


function App() {
  const path = window.location.pathname;

  const getLangFromPath = (): LangCode => {
    // Handle the case where the file is accessed directly
    if (path.endsWith('index.html')) {
      return 'nl';
    }
  
    switch (path) {
      case '/eng':
        return 'en';
      case '/de':
        return 'de';
      case '/fr':
        return 'fr';
      case '/sp':
        return 'es';
      case '/':
      default:
        // Default to Dutch for the root path or any unknown path
        return 'nl';
    }
  };

  const lang = getLangFromPath();
  const locale = langToLocaleMap[lang];


  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <MainPage lang={lang} />;
}

export default App;