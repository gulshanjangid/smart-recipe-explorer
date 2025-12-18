const express = require('express');
const router = express.Router();
const Groq = require("groq-sdk");

// Initialize Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/suggest', async (req, res) => {
    try {
        const { ingredients } = req.body;
        if (!ingredients || ingredients.length === 0) {
            return res.status(400).json({ message: 'Ingredients are required' });
        }

        const prompt = `I have these ingredients: ${ingredients.join(', ')}. simple suggestions for recipes I can make with these? Just give me 2-3 short suggestions with their key ingredients. Keep it concise.`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.1-8b-instant",
        });

        res.json({ suggestion: chatCompletion.choices[0]?.message?.content || "No suggestion generated." });
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ message: 'Failed to generate suggestions', error: error.message });
    }
});

router.post('/simplify', async (req, res) => {
    try {
        const { recipeName, instructions } = req.body;
        if (!instructions) {
            return res.status(400).json({ message: 'Instructions are required' });
        }

        const prompt = `Simplify these cooking instructions for "${recipeName}". Make them easy to follow for a beginner, step-by-step. Keep it friendly. \n\nInstructions:\n${instructions}`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.1-8b-instant",
        });

        res.json({ simplified: chatCompletion.choices[0]?.message?.content || "No simplification generated." });
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ message: 'Failed to simplify instructions', error: error.message });
    }
});

module.exports = router;
