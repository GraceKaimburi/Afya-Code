import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export async function generateAfyaBandImage(versionPrompt?: string) {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-2.5-flash-image";

  const defaultPrompt = "A high-quality, professional product shot of a sleek, modern 'Afya Band' health bracelet. The band is accessorized as a stylish bracelet, featuring a clearly visible QR code. It stores health information. The background is clean and minimalist, highlighting the band's medical and tech features.";
  
  const prompt = versionPrompt || defaultPrompt;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
