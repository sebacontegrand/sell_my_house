import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ScrapedPropertyData } from "@/lib/types/property";

export const maxDuration = 60;

export async function POST(req: NextRequest) {

  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing in environment");
      return NextResponse.json({ error: "AI service not configured." }, { status: 500 });
    }

    // 1. Fetch content from Jina AI Reader API
    const jinaUrl = `https://r.jina.ai/${url}`;
    const jinaResponse = await fetch(jinaUrl, {
      headers: {
        "X-Return-Format": "markdown"
      },
    });

    if (!jinaResponse.ok) {
      if (jinaResponse.status === 403 || jinaResponse.status === 402) {
         return NextResponse.json({ 
          error: "El sitio está bloqueando el acceso automático. Por favor, complete los datos manualmente o pruebe copiando el texto.",
          isBlocked: true 
        }, { status: 200 });
      }
      return NextResponse.json({ error: `Could not fetch the URL via Jina: ${jinaResponse.status}` }, { status: 500 });
    }

    const markdownText = await jinaResponse.text();

    if (!markdownText || markdownText.length < 50) {
      return NextResponse.json({ error: "Empty response from server. The site might be blocking the request." }, { status: 500 });
    }

    if (markdownText.includes("Max challenge attempts exceeded") || markdownText.includes("Just a moment...")) {
      return NextResponse.json({ 
        error: "El sitio está bloqueando el acceso automático de nuestra IA. Por favor, complete los datos manualmente o use el Botón Mágico.",
        isBlocked: true 
      }, { status: 200 });
    }

    // 2. Use Gemini to parse the Markdown
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    const prompt = `
      Extract property information from the following web scraped markdown text and return it as a structured JSON object.
      The text is likely in Spanish. Normalize the fields as requested.
      
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
      - photos (an array of clean image URLs found in the markdown, e.g., from ![alt](image_url). Ensure they are absolute URLs starting with http/https and look like photos of the property, not icons/logos)

      Raw Markdown text:
      """
      ${markdownText}
      """

      Return ONLY the raw JSON object. Do not include any markdown, backticks, or explanatory text.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // 3. Clean and parse the JSON string
    let jsonStr = responseText.trim();
    const firstBrace = jsonStr.indexOf('{');
    const lastBrace = jsonStr.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1) {
      jsonStr = jsonStr.substring(firstBrace, lastBrace + 1);
    }

    const parsedData = JSON.parse(jsonStr);

    let data: ScrapedPropertyData & { debug?: string } = {
      source: "jina-ai",
      externalUrl: url,
      title: parsedData.title || "",
      description: parsedData.description || "",
      photos: parsedData.photos || [],
      price: parsedData.price || 0,
      currency: parsedData.currency || "USD",
      address: parsedData.address,
      city: parsedData.city,
      neighborhood: parsedData.neighborhood,
      rooms: parsedData.rooms,
      bedrooms: parsedData.bedrooms,
      bathrooms: parsedData.bathrooms,
      totalArea: parsedData.totalArea,
      coveredArea: parsedData.coveredArea,
      features: parsedData.features || [],
      debug: markdownText.substring(0, 500)
    };

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Scraping AI error:", error);
    return NextResponse.json({ error: "Failed to parse property using AI", details: error.message || String(error) }, { status: 500 });
  }
}

