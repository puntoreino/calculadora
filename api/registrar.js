
export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const body = req.body;
    const params = new URLSearchParams();
    for (const key in body) {
      params.append(key, body[key]);
    }

    const response = await fetch("https://script.google.com/macros/s/AKfycbwC8JAA0iXoWqtcaHz7flmM2FnOm5VgmD5MVeOhzHS43AnoQH4fmZTWGdTUKhaztbjnqg/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    const text = await response.text();
    return res.status(200).json({ status: "ok", respuesta: text });

  } catch (err) {
    return res.status(500).json({ error: "Error interno", detalle: err.message });
  }
}
