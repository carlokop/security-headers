import React, { useEffect } from 'react';
import MainPage from './MainPage';
import { translations } from './constants';

type LangCode = 'nl' | 'en' | 'de' | 'fr' | 'es';
type LocaleCode = 'nl-NL' | 'en-US' | 'de-DE' | 'fr-FR' | 'es-ES';

const langToLocaleMap: Record<LangCode, LocaleCode> = {
  nl: 'nl-NL',
  en: 'en-US',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
};

const langToPathMap: Record<LangCode, string> = {
  nl: '/',
  en: '/eng',
  de: '/de',
  fr: '/fr',
  es: '/sp',
};

function App() {
  const path = window.location.pathname;

  const getLangFromPath = (): LangCode => {
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
        return 'nl';
    }
  };

  const lang = getLangFromPath();
  const locale = langToLocaleMap[lang];

  useEffect(() => {
    // Set language attribute on HTML tag
    document.documentElement.lang = locale;
    
    // Safely access meta translations
    const metaTranslations = (translations[lang] as any)?.meta;
    const metaTitle = metaTranslations?.title || 'Security Header Analyser';
    const metaDescriptionContent = metaTranslations?.description || 'An application to analyze the security headers of a website.';
    
    // Update SEO Title
    document.title = metaTitle;

    // Update Meta Description
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
        descriptionTag = document.createElement('meta');
        descriptionTag.setAttribute('name', 'description');
        document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute('content', metaDescriptionContent);

    // Update Canonical URL
    const baseUrl = window.location.origin;
    const canonicalUrl = new URL(langToPathMap[lang], baseUrl).href;
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // Manage Hreflang Tags
    // First, remove any existing hreflang tags to avoid duplicates
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

    // Add new hreflang tags for all languages
    Object.keys(langToPathMap).forEach(langCode => {
        const code = langCode as LangCode;
        const hreflangLocale = langToLocaleMap[code];
        const alternateUrl = new URL(langToPathMap[code], baseUrl).href;
        
        const linkTag = document.createElement('link');
        linkTag.setAttribute('rel', 'alternate');
        linkTag.setAttribute('hreflang', hreflangLocale);
        linkTag.setAttribute('href', alternateUrl);
        document.head.appendChild(linkTag);
    });
    
    // Add x-default hreflang tag
    const xDefaultUrl = new URL(langToPathMap['nl'], baseUrl).href;
    const xDefaultTag = document.createElement('link');
    xDefaultTag.setAttribute('rel', 'alternate');
    xDefaultTag.setAttribute('hreflang', 'x-default');
    xDefaultTag.setAttribute('href', xDefaultUrl);
    document.head.appendChild(xDefaultTag);

  }, [lang, locale]);

  return <MainPage lang={lang} />;
}

export default App;
