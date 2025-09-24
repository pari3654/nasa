import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import { GoogleGenAI } from '@google/genai'; 

const app = express();
const PORT = 3001;

// --- Configuration & Initialization ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error("FATAL ERROR: GEMINI_API_KEY is not set.");
    process.exit(1);
}

const ai = new GoogleGenAI({ 
  apiKey: GEMINI_API_KEY,
});
const MODEL = "gemini-2.5-flash"; 

const SYSTEM_PROMPT = "You are the AI Space Guide, a helpful and engaging assistant for NASA space images. Keep answers concise, informative, and focused only on astronomy, galaxies, nebulae, and stars.";

// Middleware setup
app.use(cors({
    origin: 'http://localhost:5173' 
}));
app.use(express.json());

// --- API Route for the Chatbot ---
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // Corrected structure: System instruction is outside the contents array
        const response = await ai.models.generateContent({
            model: MODEL,
            contents: [
                // FIX: Only USER role is needed for a single turn request
                { role: "user", parts: [{ text: message }] }
            ],
            config: {
                maxOutputTokens: 150,
                // FIX: System instruction is passed here
                systemInstruction: SYSTEM_PROMPT 
            }
        });

        const botResponse = response.text;
        res.json({ response: botResponse });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: 'Gemini API failed. Check your key status or quota.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} (Gemini AI Mode)`);
});