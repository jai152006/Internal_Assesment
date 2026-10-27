
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "GROQ_API_KEY is not configured in Vercel."
    });
  }

  try {
    const { message } = req.body || {};

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Please enter a message."
      });
    }

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [
            {
              role: "system",
              content:
                "You are the AI assistant on Jai Jangid's CSE portfolio website. Be helpful, friendly, and concise. Answer questions about the portfolio when possible. Do not invent personal details or projects."
            },
            {
              role: "user",
              content: message.trim()
            }
          ],
          max_completion_tokens: 500
        })
      }
    );

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      console.error(
        "Groq API error:",
        groqResponse.status,
        data
      );

      return res.status(502).json({
        error:
          data.error?.message ||
          `Groq API request failed with status ${groqResponse.status}.`
      });
    }

    const reply = data.choices?.[0]?.message?.content;

    return res.status(200).json({
      reply: reply || "Sorry, I couldn't generate a response."
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return res.status(500).json({
      error: "The chatbot server encountered an error."
    });
  }
}


