import { GoogleGenAI, Type } from "@google/genai";
import { HEADERS_TO_CHECK } from '@/constants';
import { HeaderResult } from '@/types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeUrlHeaders = async (url: string): Promise<HeaderResult[]> => {
    const prompt = `You are an automated HTTP header fetcher, a 'data retrieval bot'. Your task is to retrieve the raw, unmodified header values from the URL "${url}".

**Strict Rules:**
1.  **NO INTERPRETATION:** You must NOT interpret, summarize, shorten, or analyze the values. Only report the literal, exact string value as it appears in the HTTP response. Behave like a 'curl' command.
2.  **COMPLETE VALUES:** For the 'Content-Security-Policy' header, it is crucial that you return the *full, 100% complete, unmodified* value, no matter how long it is. This is the most important rule.
3.  **REPORT EVERYTHING:** Report the status of EVERY header in the list: ${HEADERS_TO_CHECK.join(', ')}. ALSO report the presence of obsolete headers like 'X-XSS-Protection' if they are present in the response.
4.  **LIVE FETCH:** Perform a live, real-time fetch. Do not use cached data.

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

    try {
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

        const jsonStr = response.text.trim();
        const parsedJson = JSON.parse(jsonStr) as { [key: string]: { present: boolean; value?: string } };

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

        return finalResults;
    } catch (error) {
        console.error('Error analyzing headers with Gemini API:', error);
        throw new Error('Analysis via the AI service failed.');
    }
};
