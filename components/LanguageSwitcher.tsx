import React from 'react';
import { DutchFlag, UKFlag, GermanFlag, FrenchFlag, SpanishFlag } from './flags';

const languages = [
  { code: 'nl', name: 'Nederlands', FlagComponent: DutchFlag },
  { code: 'en', name: 'English', FlagComponent: UKFlag },
  { code: 'de', name: 'Deutsch', FlagComponent: GermanFlag },
  { code: 'fr', name: 'Français', FlagComponent: FrenchFlag },
  { code: 'es', name: 'Español', FlagComponent: SpanishFlag },
];

export const LanguageSwitcher: React.FC = () => {
  return (
    <div className="flex justify-end gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          title={lang.name}
          className="p-1 rounded-md hover:bg-dark-card focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-brand-secondary transition-colors"
          onClick={() => {
            // Logica voor het wisselen van taal wordt later geïmplementeerd
            console.log(`Switching to ${lang.name}`);
          }}
        >
          <lang.FlagComponent className="w-8 h-6 rounded-sm shadow" />
        </button>
      ))}
    </div>
  );
};
