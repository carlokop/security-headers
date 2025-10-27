import MainPage from '@/app/MainPage';
import { translations } from '@/constants';

type LangCode = 'nl' | 'en' | 'de' | 'fr' | 'es';

type Props = {
  params: { lang: LangCode };
};

export async function generateStaticParams() {
    // Exclude 'nl' as it is now handled by the root page.
    return Object.keys(translations).filter(lang => lang !== 'nl').map(lang => ({ lang }));
}

export default function Page({ params }: Props) {
  return <MainPage lang={params.lang} />;
}
