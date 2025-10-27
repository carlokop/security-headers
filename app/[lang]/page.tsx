import MainPage from '@/app/MainPage';

type LangCode = 'nl' | 'en' | 'de' | 'fr' | 'es';

type Props = {
  params: { lang: LangCode };
};

// generateStaticParams removed for server-side rendering

export default function Page({ params }: Props) {
  return <MainPage lang={params.lang} />;
}
