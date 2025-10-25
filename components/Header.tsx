import React from 'react';

interface HeaderProps {
    t: (key: string) => string;
}

export const Header: React.FC<HeaderProps> = ({ t }) => {
    return (
        <header className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-brand-secondary">
                {t('header.title')}
            </h1>
            <p className="mt-2 text-lg text-dark-text-secondary">
                {t('header.subtitle')}
            </p>
        </header>
    );
};
