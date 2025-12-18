require('dotenv').config();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
    try {
        console.log("Testing Groq with Key:", process.env.GROQ_API_KEY ? "Present" : "Missing");
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: "Say hello" }],
            model: "llama-3.1-8b-instant",
        });
        console.log("Success:", completion.choices[0]?.message?.content);
    } catch (err) {
        console.error("Error:", err);
    }
}

main();
