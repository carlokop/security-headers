import { translations } from '@/constants';

function getNestedValue(obj: any, key: string): any {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export const useTranslations = (lang: 'nl' | 'en' | 'de' | 'fr' | 'es') => {
    const t = (key: string, options?: { [key: string]: string }): string | string[] => {
        const selectedLang = translations[lang];
        let translation = getNestedValue(selectedLang, key);

        if (typeof translation === 'string' && options) {
            Object.keys(options).forEach(optionKey => {
                translation = translation.replace(`{{${optionKey}}}`, options[optionKey]);
            });
        }
        
        if (translation === undefined) {
            console.warn(`Translation key '${key}' not found for language '${lang}'`);
            return key;
        }

        return translation;
    };

    return { t };
};
