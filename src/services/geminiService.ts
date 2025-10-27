import { HeaderResult } from '@/types';

export const analyzeUrlHeaders = async (url: string): Promise<HeaderResult[]> => {
    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Request failed with status ${response.status}`);
        }

        const data: HeaderResult[] = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching from /api/analyze:', error);
        if (error instanceof Error) {
          throw new Error(`Analysis via the backend service failed: ${error.message}`);
        }
        throw new Error('Analysis via the backend service failed.');
    }
};
