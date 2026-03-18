import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

export async function POST(req: NextRequest) {

  let responseText = "";
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { text, images } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing in environment");
      return NextResponse.json({ error: "AI service not configured. Please add GEMINI_API_KEY to .env.local" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


    console.log("Starting AI parse for text of length:", text.length, "and images:", images?.length || 0);


    const prompt = `
      Extract property information from the following raw text and return it as a structured JSON object.
      The text might be in Spanish. Normalize the fields as requested.
      
      Fields to extract:
      - title (short and descriptive, e.g., "Casa en Palermo")
      - price (number only)
      - currency (USD or ARS)
      - address (if available)
      - city (if available)
      - neighborhood (if available)
      - totalArea (number in m2)
      - coveredArea (number in m2)
      - rooms (integer, total "ambientes")
      - bedrooms (integer)
      - bathrooms (integer)
      - description (the full descriptive text, cleaned of original contact info like phone numbers/emails)
      - features (an array of string features like ["Piscina", "Cochera", "Seguridad"])
      - photos (an array of string URLs. SELECT URLs from the provided "Copied Images" list below that are clearly property photos. If you find absolute image URLs in the "Raw text" that are not in the list, you may include them too. Ignore tracking pixels, icons, small thumbnails, Avatars, logos, or UI elements. Be inclusive but only for property photos. Prioritize URLs that are high resolution.)

      Raw text:
      """
      ${text}
      """
      
      Copied Images (priority for selection):
      """
      ${images ? images.join("\n") : "None"}
      """

      Return ONLY the raw JSON object. Do not include any markdown, backticks, or explanatory text.
    `;

    const result = await model.generateContent(prompt);
    responseText = result.response.text();
    console.log("Raw AI Response:", responseText);
    
    // Improved JSON extraction: find the first { and last }
    let jsonStr = responseText.trim();
    const firstBrace = jsonStr.indexOf('{');
    const lastBrace = jsonStr.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1) {
      jsonStr = jsonStr.substring(firstBrace, lastBrace + 1);
    }

    try {
      const data = JSON.parse(jsonStr);
      return NextResponse.json({
        ...data,
        source: "manual",
        photos: data.photos || []
      });
    } catch (parseError: any) {
      console.error("Failed to parse JSON from AI response:", parseError);
      console.log("Problematic string:", jsonStr);
      throw new Error("Invalid format returned by AI: " + parseError.message);
    }

  } catch (error: any) {
    console.error("AI Parse error detail:", error);

    // Handle quota exceeded (429) with a user-friendly message
    if (error.status === 429) {
      return NextResponse.json({
        error: "AI service quota exceeded",
        details: "El servicio de IA alcanzó su límite de uso. Por favor, intenta de nuevo en unos minutos.",
      }, { status: 429 });
    }

    return NextResponse.json({ 
      error: "Failed to parse text with AI",
      details: error.message || "Unknown error",
    }, { status: 500 });
  }
}
