import type { Metadata, ResolvingMetadata } from 'next';
import Script from 'next/script';
import { translations } from '@/constants';
import '../globals.css';

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

export async function generateStaticParams() {
  return Object.keys(langToPathMap).map((lang) => ({ lang }));
}

type Props = {
  params: { lang: LangCode };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang || 'nl';
  const metaTranslations = (translations[lang] as any)?.meta;
  const title = metaTranslations?.title || 'Security Header Analyser';
  const description = metaTranslations?.description || 'An application to analyze the security headers of a website.';
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const alternates: Metadata['alternates'] = {
    canonical: new URL(langToPathMap[lang], baseUrl).href,
    languages: {},
  };
  
  (Object.keys(langToPathMap) as LangCode[]).forEach(langCode => {
    const locale = langToLocaleMap[langCode];
    const url = new URL(langToPathMap[langCode], baseUrl).href;
    if (alternates.languages) {
      alternates.languages[locale] = url;
    }
  });

  if (alternates.languages) {
      alternates.languages['x-default'] = new URL(langToPathMap['nl'], baseUrl).href;
  }

  return {
    title,
    description,
    alternates,
  };
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: LangCode };
}>) {
  const locale = langToLocaleMap[params.lang];
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
