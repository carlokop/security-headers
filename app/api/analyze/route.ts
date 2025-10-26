import { NextResponse } from 'next/server';
import { analyzeUrlHeaders } from '@/services/geminiService';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url } = body;

        if (!url || typeof url !== 'string') {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }
        
        const headerResults = await analyzeUrlHeaders(url);
        return NextResponse.json(headerResults);

    } catch (error) {
        console.error('API Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: `Analysis failed: ${errorMessage}` }, { status: 500 });
    }
}