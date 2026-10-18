import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
 
const app = express();
const PORT = process.env.PORT || 3000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
 
// Comma-separated list of allowed frontend URLs, e.g. https://my-site.netlify.app
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
 
app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return cb(null, true);
      }
      cb(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "50kb" }));
app.use(rateLimit({ windowMs: 60 * 1000, max: 20 })); // 20 requests/min per IP
 
const LANGUAGES = {
  en: "English",
  hi: "Hindi",
  ta: "Tamil",
  bn: "Bengali",
  te: "Telugu",
  mr: "Marathi",
  gu: "Gujarati",
  kn: "Kannada",
};
 
function systemPrompt(langName) {
  return `You are BIS Saathi, a helpful assistant for BIS (Bureau of Indian Standards) services: ISI mark and hallmark verification, IS codes, consumer complaints, and manufacturer certification schemes (ISI Mark, CRS, FMCS, ECO Mark).
Rules:
- Always reply only in ${langName}.
- Keep answers short and simple.
- If you are not sure about a specific IS code, licence number, fee or rule, say so clearly and advise checking the official BIS website (bis.gov.in) or the BIS Care app. Never invent IS codes or licence details.
- You cannot verify licence numbers or HUIDs yourself; tell users to use the official BIS verification sources.
- Politely decline topics unrelated to BIS and standards.`;
}
 
app.get("/", (_req, res) => res.send("BIS Saathi backend is running"));
app.get("/health", (_req, res) => res.json({ ok: true }));
 
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [], lang = "en" } = req.body || {};
 
    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "message is required" });
    }
    if (message.length > 2000) {
      return res.status(400).json({ error: "message too long" });
    }
 
    const langName = LANGUAGES[lang] || "English";
 
    const past = (Array.isArray(history) ? history : [])
      .filter(
        (m) =>
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim()
      )
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
 
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 800,
        messages: [
          { role: "system", content: systemPrompt(langName) },
          ...past,
          { role: "user", content: message.trim() },
        ],
      }),
    });
 
    const data = await groqRes.json();
 
    if (!groqRes.ok) {
      console.error("Groq error:", groqRes.status, data);
      const msg =
        groqRes.status === 429
          ? "Too many requests right now. Please try again in a minute."
          : "The AI service is not available right now.";
      return res.status(502).json({ error: msg });
    }
 
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(502).json({ error: "Empty reply from AI service." });
    }
 
    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err?.message || err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});
 
app.listen(PORT, () => console.log(`BIS Saathi backend listening on port ${PORT}`));
 