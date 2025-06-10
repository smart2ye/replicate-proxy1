const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const API_TOKEN = 'r8_9s0aoxJRRq5vxAr49q5rapAAlafjMBk4DP1uU';

app.post('/generate', async (req, res) => {
  try {
    const replicateRes = await fetch('https://api.replicate.com/v1/models/google/veo-3/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait'
      },
      body: JSON.stringify(req.body)
    });

    const result = await replicateRes.json();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal proxy error" });
  }
});

app.get("/", (req, res) => {
  res.send("🟢 Proxy for Replicate API is working.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));