import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from "@google/genai";
import { HEADERS_TO_CHECK } from '@/constants';
import { HeaderResult } from '@/types';

export async function POST(request: Request) {
    if (!process.env.API_KEY) {
        console.error('API_KEY environment variable is not set.');
        return NextResponse.json({ error: 'Server configuration error: API key is missing.' }, { status: 500 });
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const body = await request.json();
        const { url } = body;

        if (!url || typeof url !== 'string') {
            return NextResponse.json({ error: 'URL is required and must be a string.' }, { status: 400 });
        }
        
        const prompt = `You are an automated HTTP header fetcher, a 'data retrieval bot'. Your task is to retrieve the raw, unmodified header values from the URL "${url}".

**Strict Rules:**
1.  **NO INTERPRETATION:** You must NOT interpret, summarize, shorten, or analyze the values. Only report the literal, exact string value as it appears in the HTTP response. Behave like a 'curl' command.
2.  **COMPLETE VALUES:** For the 'Content-Security-Policy' header, it is crucial that you return the *full, 100% complete, unmodified* value, no matter how long it is. This is the most important rule.
3.  **REPORT EVERYTHING:** Report the status of EVERY header in the list: ${HEADERS_TO_CHECK.join(', ')}. ALSO report the presence of obsolete headers like 'X-XSS-Protection' if they are present in the response.
4.  **LIVE FETCH:** Perform a live, real-time fetch. Do not use cached data.

**Error Handling:**
- If you are completely unable to access or fetch the URL, you MUST respond with a valid JSON object according to the schema where every header's "present" field is set to \`false\`, and you include a descriptive message in the optional "error" field.

Return a single JSON object that strictly adheres to the provided schema.`;

        const properties = HEADERS_TO_CHECK.reduce((acc, header) => {
            acc[header] = {
                type: Type.OBJECT,
                properties: {
                    present: { type: Type.BOOLEAN },
                    value: { type: Type.STRING },
                },
                required: ['present'],
            };
            return acc;
        }, {} as { [key: string]: any });
        
        properties['error'] = {
            type: Type.STRING,
            description: "An error message if the URL could not be fetched or analyzed."
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                temperature: 0,
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: properties,
                    required: HEADERS_TO_CHECK,
                },
            },
        });

        const text = response.text;
        if (!text) {
          throw new Error("The AI service returned an empty response text.");
        }
        const jsonStr = text.trim();
        const parsedJson = JSON.parse(jsonStr) as { [key: string]: { present: boolean; value?: string } } & { error?: string };
        
        if (parsedJson.error) {
            throw new Error(`The AI service reported an error: ${parsedJson.error}`);
        }

        const finalResults: HeaderResult[] = HEADERS_TO_CHECK.map(headerName => {
            const result = parsedJson[headerName];
            if (result) {
                return {
                    header: headerName,
                    present: result.present,
                    value: result.value ?? null,
                };
            }
            return { header: headerName, present: false, value: null };
        });

        return NextResponse.json(finalResults);

    } catch (error) {
        console.error('Error in /api/analyze:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred on the server.';
        return NextResponse.json({ error: 'Analysis via the AI service failed.', details: errorMessage }, { status: 500 });
    }
}