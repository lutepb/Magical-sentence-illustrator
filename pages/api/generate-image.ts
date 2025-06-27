// pages/api/generate-image.ts

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ message: "Invalid prompt" });
  }

  try {
    // This placeholder image simulates AI-generated output
    const imageUrl = "https://source.unsplash.com/800x600/?flowers,nature,magic";

    return res.status(200).json({ imageUrl });
  } catch (err) {
    console.error("Image generation failed", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
