console.log("✅ Handler cargado");

export default async function handler(req, res) {
  console.log("📩 Recibida solicitud en /api/ask-merlin");

  if (req.method !== 'POST') {
    console.log("❌ Método no permitido:", req.method);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body;
  console.log("🧠 Mensaje del usuario:", message);
  console.log("🔑 API KEY:", process.env.OPENAI_API_KEY);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log("📬 Respuesta de OpenAI:", data);

    const reply = data.choices?.[0]?.message?.content || "Sin respuesta";
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("💥 Error al llamar a OpenAI:", error);
    return res.status(500).json({ error: "Error al llamar a OpenAI" });
  }
}
