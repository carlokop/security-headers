import { GoogleGenAI, Type } from "@google/genai";
import { HEADERS_TO_CHECK } from '../constants';
import { HeaderResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeUrlHeaders = async (url: string): Promise<HeaderResult[]> => {
    const prompt = `Analyseer de HTTP security headers voor de website op ${url}.
Retourneer een enkel JSON-object. De sleutels van dit object MOETEN de volgende headernamen zijn, exact zoals geschreven: ${HEADERS_TO_CHECK.join(', ')}.
Voor elke sleutel, geef een object als waarde met de volgende eigenschappen:
1. "present": Een boolean (true als de header aanwezig is, anders false).
2. "value": De waarde van de header als een string als deze aanwezig is. Als de header afwezig is, laat u deze eigenschap weg.

Het uiteindelijke JSON-object MOET een sleutel bevatten voor ELKE header uit de lijst.`;

    // Dynamically build a schema that requires every single header to be a key in the response object.
    // This is the most robust way to ensure the AI doesn't skip any header.
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
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
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

        // Transform the object back into the array format the UI expects,
        // using the original HEADERS_TO_CHECK list to guarantee order and completeness.
        const finalResults: HeaderResult[] = HEADERS_TO_CHECK.map(headerName => {
            const result = parsedJson[headerName];
            // This structure is guaranteed by the schema, but we check as a safeguard.
            if (result) {
                return {
                    header: headerName,
                    present: result.present,
                    value: result.value ?? null,
                };
            }
            // Fallback for an extremely unlikely scenario where the AI defies the schema.
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