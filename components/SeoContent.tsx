import React, { useState, useEffect, useRef } from 'react';

const ChevronIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className="border border-dark-border rounded-lg overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center text-left p-4 bg-dark-card hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            >
                <h3 className="text-xl font-semibold text-white">
                    {title}
                </h3>
                <ChevronIcon className={`w-6 h-6 text-dark-text-secondary transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-4 border-t border-dark-border">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Helper function to safely render content that can be a string or string array
const renderTranslatedContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
        return content.map((paragraph, index) => <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />);
    }
    if (typeof content === 'string') {
        // This case handles missing keys (which return the key itself) or incorrectly formatted JSON data
        return <p dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return <p>Content is not available.</p>; // Fallback for unexpected types
};

// Helper function to safely render a value that should be a string
const renderTranslatedString = (value: string | string[]): string => {
    if (typeof value === 'string') {
        return value;
    }
    if (Array.isArray(value)) {
        return value.join(' '); // Join array elements if a string was expected
    }
    return ''; // Fallback
};


const getAccordionData = (t: (key: string, options?: { [key: string]: string }) => string | string[]) => [
    {
        title: "Strict-Transport-Security",
        content: <div className="space-y-4">{renderTranslatedContent(t('seo.accordion.hsts.content'))}</div>
    },
    {
        title: "Content-Security-Policy",
        content: <div className="space-y-4">{renderTranslatedContent(t('seo.accordion.csp.content'))}</div>
    },
    {
        title: "X-Content-Type-Options",
        content: <div className="space-y-4">{renderTranslatedContent(t('seo.accordion.xcto.content'))}</div>
    },
    {
        title: "X-Frame-Options",
        content: <div className="space-y-4">{renderTranslatedContent(t('seo.accordion.xfo.content'))}</div>
    },
    {
        title: "Referrer-Policy",
        content: <div className="space-y-4">{renderTranslatedContent(t('seo.accordion.rp.content'))}</div>
    },
    {
        title: "Permissions-Policy",
        content: <div className="space-y-4">{renderTranslatedContent(t('seo.accordion.pp.content'))}</div>
    },
    {
        title: "X-XSS-Protection",
        content: <div className="space-y-4">{renderTranslatedContent(t('seo.accordion.xxp.content'))}</div>
    },
];

interface SeoContentProps {
    headerToFocus: string | null;
    setHeaderToFocus: (header: string | null) => void;
    t: (key: string, options?: { [key: string]: string }) => string | string[];
}

export const SeoContent: React.FC<SeoContentProps> = ({ headerToFocus, setHeaderToFocus, t }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const accordionData = getAccordionData(t);

    useEffect(() => {
        if (headerToFocus) {
            const focusIndex = accordionData.findIndex(item => item.title === headerToFocus);
            if (focusIndex !== -1) {
                setOpenIndex(focusIndex);
                setTimeout(() => {
                    accordionRefs.current[focusIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100); 
                setHeaderToFocus(null); 
            }
        }
    }, [headerToFocus, setHeaderToFocus, accordionData]);


    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mt-12 text-dark-text-secondary">
            <h2 className="text-2xl font-semibold text-white mb-4" dangerouslySetInnerHTML={{ __html: renderTranslatedString(t('seo.title')) }}>
            </h2>
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: renderTranslatedString(t('seo.intro')) }}>
            </p>

            <div className="space-y-4 mt-8">
                {accordionData.map((item, index) => (
                    <div key={item.title} ref={el => { accordionRefs.current[index] = el; }}>
                        <AccordionItem
                            title={item.title}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                        >
                            {item.content}
                        </AccordionItem>
                    </div>
                ))}
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-8">
                {renderTranslatedString(t('seo.howItWorks.title'))}
            </h3>
            <p>
                {renderTranslatedString(t('seo.howItWorks.body'))}
            </p>
        </div>
    );
};