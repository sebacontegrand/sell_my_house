const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const envFile = fs.readFileSync('.env', 'utf-8');
const apiKeyLine = envFile.split('\n').find(line => line.startsWith('GEMINI_API_KEY='));
let apiKey = apiKeyLine.split('=')[1].trim();
if (apiKey.startsWith('"') && apiKey.endsWith('"')) {
  apiKey = apiKey.substring(1, apiKey.length - 1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=" + apiKey);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);
  }
}

listModels();
