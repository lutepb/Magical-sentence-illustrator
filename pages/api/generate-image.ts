// pages/api/generate-image.ts

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ message: 'Invalid prompt' });
  }

  try {
    // Replace this with real image generation later
    const placeholderImage = 'https://source.unsplash.com/800x600/?flowers,nature,magic';

    res.status(200).json({ imageUrl: placeholderImage });
  } catch (error) {
    console.error("Image generation failed", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
