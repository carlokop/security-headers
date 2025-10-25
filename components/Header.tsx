
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-brand-secondary">
                Security Header Analyse
            </h1>
            <p className="mt-2 text-lg text-dark-text-secondary">
                Controleer de beveiliging van elke website
            </p>
        </header>
    );
};