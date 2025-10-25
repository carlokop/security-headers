import { GoogleGenAI, Type } from "@google/genai";
import { HEADERS_TO_CHECK } from '../constants';
import { HeaderResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeUrlHeaders = async (url: string): Promise<HeaderResult[]> => {
    const prompt = `Je bent een security header analyse tool. Voer een real-time HTTP-verzoek uit naar de URL "${url}" en rapporteer de exacte waarden van de security headers.
- Voer een live fetch uit. Gebruik geen gecachte data.
- Je MOET de aanwezigheid en waarde rapporteren van elke header in deze lijst: ${HEADERS_TO_CHECK.join(', ')}.
- Zelfs als een header verouderd is (zoals X-XSS-Protection), MOET je rapporteren of deze aanwezig is in de responsheaders. Oordeel niet over de effectiviteit, rapporteer alleen de feiten.
- Als een headerwaarde erg lang is (zoals Content-Security-Policy), MOET je de volledige, niet-ingekorte waarde retourneren.

Retourneer een enkel JSON-object dat strikt voldoet aan het opgegeven schema. Dit object moet een sleutel bevatten voor elke header in de lijst.`;

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
            model: 'gemini-2.5-pro', // Switched to the more powerful model for accuracy
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
        throw new Error('De analyse via de AI-service is mislukt.');
    }
};
