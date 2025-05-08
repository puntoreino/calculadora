
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwC8JAA0iXoWqtcaHz7flmM2FnOm5VgmD5MVeOhzHS43AnoQH4fmZTWGdTUKhaztbjnqg/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(req.body)
    });

    const text = await response.text();
    return res.status(200).json({ status: "ok", response: text });

  } catch (err) {
    return res.status(500).json({ error: "Error al reenviar al Web App", details: err.message });
  }
}
