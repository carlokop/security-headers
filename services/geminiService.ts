import { GoogleGenAI, Type } from "@google/genai";
import { HEADERS_TO_CHECK } from '../constants';
import { HeaderResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeUrlHeaders = async (url: string): Promise<HeaderResult[]> => {
    // Updated prompt: Instructs the AI to omit the 'value' property when a header is not present.
    // This resolves the conflict with the JSON schema which expected 'value' to be a string.
    const prompt = `Analyseer de HTTP security headers voor de website op ${url}. 
  Controleer op de aanwezigheid en waarde van de volgende headers: ${HEADERS_TO_CHECK.join(', ')}.
  Geef voor elke header aan of deze aanwezig is ('present': true/false). 
  Als een header aanwezig is, geef dan ook de waarde ('value').
  Als een header niet aanwezig is, laat dan de 'value' eigenschap weg.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                // Updated schema: 'value' is no longer a required property.
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            header: { type: Type.STRING },
                            present: { type: Type.BOOLEAN },
                            value: { type: Type.STRING },
                        },
                        // 'value' is removed from required list to allow it to be omitted for absent headers.
                        required: ['header', 'present'],
                    },
                },
            },
        });

        const jsonStr = response.text.trim();
        
        // Parse the JSON and normalize the data to match the HeaderResult type.
        // The AI will omit 'value' for absent headers, which JSON.parse treats as 'undefined'.
        // We convert this to 'null' to match our type definition.
        const parsedJson = JSON.parse(jsonStr) as any[];
        const parsedResults: HeaderResult[] = parsedJson.map(r => ({
            header: r.header,
            present: r.present,
            value: r.value ?? null,
        }));
        
        const resultsMap = new Map<string, HeaderResult>(
            parsedResults.map(r => [r.header.toLowerCase(), r])
        );

        // Ensure all requested headers are in the final list, even if the AI missed them.
        const finalResults: HeaderResult[] = HEADERS_TO_CHECK.map(headerName => {
            const result = resultsMap.get(headerName.toLowerCase());
            if (result) {
                return result;
            }
            return { header: headerName, present: false, value: null };
        });

        return finalResults;
    } catch (error) {
        console.error('Error analyzing headers with Gemini API:', error);
        throw new Error('De analyse via de AI-service is mislukt.');
    }
};

export const getExplanationForHeader = async (header: string, value: string | null): Promise<string> => {
  const prompt = `Explain the security header "${header}" and its purpose. ${
    value ? `The current value is "${value}". Briefly comment on this value.` : 'This header is currently not set.'
  } Keep the explanation concise and easy for a non-expert to understand. Explain the risks if it's misconfigured or missing.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error('Error fetching explanation from Gemini API:', error);
    return 'Kon de uitleg op dit moment niet ophalen.';
  }
};