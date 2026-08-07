import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Al-Huda Quranic Guidance" });
});

// AI Guidance Endpoint
app.post("/api/guidance", async (req, res) => {
  try {
    const { prompt, mood, situationType } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured on the server.",
      });
    }

    const systemInstruction = `You are Al-Huda (The Guidance), an authentic, highly respectful, and compassionate Islamic Spiritual Advisor.
Your purpose is to guide believers using ONLY the Holy Quran and authentic Sunnah of Prophet Muhammad (ﷺ).
Whether the user faces difficulty, sadness, anger, joy, temptation, sin, or physical/spiritual ailments, provide gentle, profound, and hopeful guidance.

Rules:
1. Always base guidance on authentic Quranic Ayats and Hadiths (Bukhari, Muslim, Tirmidhi, Abu Dawud, etc.).
2. Show gentle compassion and hope in Allah's boundless mercy (Ar-Rahman, Ar-Rahim, Al-Ghaffar).
3. If the user mentions sin or temptation, outline the noble Quranic path of Tawbah (Repentance) with total forgiveness and practical steps to turn away from sin.
4. If the user mentions illness or emotional distress, include Quranic Ruqyah or Prophetic medicine (Tibb an-Nabawi) remedies like Honey, Zamzam, Black seed, or Dhikr.
5. Provide response strictly formatted in JSON matching the requested schema.`;

    const userMessage = `User Situation: "${prompt || 'Seeking general spiritual guidance'}"
Current Mood/Emotion: ${mood || 'Not specified'}
Situation Type: ${situationType || 'General Guidance'}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userMessage,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Uplifting title for this guidance response" },
            quranicVerse: {
              type: Type.OBJECT,
              properties: {
                arabic: { type: Type.STRING, description: "Arabic verse text with full diacritics" },
                reference: { type: Type.STRING, description: "Surah Name & Verse Numbers (e.g., Surah Ash-Sharh 94:5-6)" },
                transliteration: { type: Type.STRING, description: "Phonetic transliteration" },
                translation: { type: Type.STRING, description: "Clear English translation" },
                reflection: { type: Type.STRING, description: "Spiritual reflection and context of this verse" }
              },
              required: ["arabic", "reference", "translation", "reflection"]
            },
            propheticTeaching: {
              type: Type.OBJECT,
              properties: {
                hadithArabic: { type: Type.STRING, description: "Arabic text of Hadith if available" },
                english: { type: Type.STRING, description: "English translation of Hadith or teaching" },
                reference: { type: Type.STRING, description: "Hadith book reference e.g. Sahih Al-Bukhari 6407" },
                explanation: { type: Type.STRING, description: "How Prophet Muhammad ﷺ lived or handled this" }
              },
              required: ["english", "reference", "explanation"]
            },
            actionPlan: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-4 practical spiritual steps according to Sunnah (e.g. Wudu, 2 Rakat, specific mindset shift)"
            },
            recommendedDua: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Name/Purpose of the Dua" },
                arabic: { type: Type.STRING, description: "Arabic text of the supplication" },
                transliteration: { type: Type.STRING, description: "Phonetic transliteration" },
                translation: { type: Type.STRING, description: "English translation" },
                whenToRecite: { type: Type.STRING, description: "Best time or context to recite" }
              },
              required: ["title", "arabic", "transliteration", "translation"]
            },
            ruqyahAndHealing: {
              type: Type.STRING,
              description: "Specific Quranic healing verse, Dhikr, or Prophetic remedy if applicable"
            },
            wordsOfReassurance: {
              type: Type.STRING,
              description: "Warm final words reminding of Allah's love, mercy, and proximity"
            }
          },
          required: [
            "title",
            "quranicVerse",
            "propheticTeaching",
            "actionPlan",
            "recommendedDua",
            "wordsOfReassurance"
          ]
        }
      }
    });

    const guidanceData = JSON.parse(response.text || "{}");
    res.json({ success: true, data: guidanceData });
  } catch (error: any) {
    console.error("Error generating guidance:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Failed to generate spiritual guidance",
    });
  }
});

// Vite middleware & Static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
