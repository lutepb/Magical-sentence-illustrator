import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ message: 'Invalid prompt' });
  }

  try {
    // Replace with real AI integration or use a placeholder for now
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://source.unsplash.com/800x600/?flowers,plants,magic,${encodedPrompt}`;

    return res.status(200).json({ imageUrl });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
