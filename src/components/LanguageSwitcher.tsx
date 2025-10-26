'use client';

import React from 'react';
import Link from 'next/link';
import { DutchFlag, UKFlag, GermanFlag, FrenchFlag, SpanishFlag } from './flags';

const languages = [
  { code: 'nl', name: 'Nederlands', FlagComponent: DutchFlag, href: '/' },
  { code: 'en', name: 'English', FlagComponent: UKFlag, href: '/eng' },
  { code: 'de', name: 'Deutsch', FlagComponent: GermanFlag, href: '/de' },
  { code: 'fr', name: 'Français', FlagComponent: FrenchFlag, href: '/fr' },
  { code: 'es', name: 'Español', FlagComponent: SpanishFlag, href: '/sp' },
];

export const LanguageSwitcher: React.FC = () => {
  return (
    <div className="flex justify-end gap-2">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          title={lang.name}
          href={lang.href}
          className="p-1 rounded-md hover:bg-dark-card focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-brand-secondary transition-colors"
        >
          <lang.FlagComponent className="w-8 h-6 rounded-sm shadow" />
        </Link>
      ))}
    </div>
  );
};
