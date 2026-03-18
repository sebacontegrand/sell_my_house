import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

export async function POST(req: NextRequest) {

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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


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
      - photos (an array of string URLs selected from the provided "Copied Images" list. Only include URLs that look like actual property photos, ignoring tracking pixels, icons, or logos)

      Raw text:
      """
      ${text}
      """
      
      Copied Images:
      """
      ${images ? images.join("\n") : "None"}
      """

      Return ONLY the raw JSON object. Do not include any markdown, backticks, or explanatory text.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    console.log("Raw AI Response:", responseText);
    
    // Improved JSON extraction: find the first { and last }
    let jsonStr = responseText.trim();
    const firstBrace = jsonStr.indexOf('{');
    const lastBrace = jsonStr.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1) {
      jsonStr = jsonStr.substring(firstBrace, lastBrace + 1);
    }

    const data = JSON.parse(jsonStr);

    return NextResponse.json({
      ...data,
      source: "manual",
      photos: data.photos || []
    });
  } catch (error: any) {
    console.error("AI Parse error detail:", error);
    return NextResponse.json({ 
      error: "Failed to parse text with AI",
      details: error.message || "Unknown error"
    }, { status: 500 });
  }
}
