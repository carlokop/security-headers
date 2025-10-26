import MainPage from '@/app/MainPage';
import { translations } from '@/constants';

type LangCode = 'nl' | 'en' | 'de' | 'fr' | 'es';

type Props = {
  params: { lang: LangCode };
};

export async function generateStaticParams() {
    return Object.keys(translations).map(lang => ({ lang }));
}

export default function Page({ params }: Props) {
  return <MainPage lang={params.lang} />;
}