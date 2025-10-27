// FIX: Import React to resolve 'Cannot find namespace React' error for the React.ReactNode type.
import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { translations } from '@/constants';
import './globals.css';

const lang = 'nl';
const locale = 'nl-NL';

export const metadata: Metadata = (() => {
  const metaTranslations = (translations[lang] as any)?.meta;
  const title = metaTranslations?.title || 'Security Header Analyser';
  const description = metaTranslations?.description || 'An application to analyze the security headers of a website.';
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const langToPathMap: Record<string, string> = {
    nl: '/',
    en: '/en',
    de: '/de',
    fr: '/fr',
    es: '/es',
  };

  const langToLocaleMap: Record<string, string> = {
    nl: 'nl-NL',
    en: 'en-US',
    de: 'de-DE',
    fr: 'fr-FR',
    es: 'es-ES',
  };

  const languages: { [key: string]: string } = {};
  Object.keys(langToPathMap).forEach(langCode => {
    const langLocale = langToLocaleMap[langCode];
    const url = new URL(langToPathMap[langCode], baseUrl).href;
    languages[langLocale] = url;
  });
  languages['x-default'] = new URL(langToPathMap['nl'], baseUrl).href;

  const alternates: Metadata['alternates'] = {
    canonical: new URL(langToPathMap[lang], baseUrl).href,
    languages: languages,
  };

  return {
    title,
    description,
    alternates,
  };
})();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={locale}>
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MXLSHWV8');
          `}
        </Script>
      </head>
      <body className="bg-dark-bg text-dark-text font-sans">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MXLSHWV8"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}