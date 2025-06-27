import React from 'react';
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";

export default function MagicalSentenceApp() {
  const [sentence, setSentence] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const illustrationRef = useRef(null);

  const downloadImage = async () => {
    if (illustrationRef.current) {
      const canvas = await html2canvas(illustrationRef.current);
      const link = document.createElement("a");
      link.download = "magical_sentence.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const generateImage = async () => {
    if (!sentence.trim()) return;
    setLoading(true);
    setError("");
    setImageUrl("");
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: sentence })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.error || 'Image generation failed');
      if (!data?.imageUrl) throw new Error("No image returned");

      setImageUrl(data.imageUrl);
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-green-100 flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-3xl p-6 bg-white shadow-2xl rounded-3xl">
        <CardContent>
          <h1 className="text-4xl font-extrabold mb-6 text-green-700 text-center">
            🌸 Magical Floral Sentence 🌿
          </h1>
          <Input
            type="text"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            placeholder="Enter a magical sentence..."
            className="mb-4"
          />
          <div className="flex items-center gap-4 mb-6 justify-center">
            <Button onClick={generateImage} disabled={!sentence.trim() || loading}>
              {loading ? "Creating..." : "Illustrate"}
            </Button>
            {submitted && (
              <Button onClick={downloadImage} variant="outline">
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            )}
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {submitted && (
            <motion.div
              ref={illustrationRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative rounded-xl border border-green-300 shadow-md bg-white p-8 text-center overflow-hidden"
              style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="backdrop-blur-sm bg-white/60 rounded-xl p-4"
              >
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 text-pink-300 text-4xl">🌸</div>
                <div className="absolute -bottom-6 -right-6 text-green-400 text-4xl">🌿</div>
                <div className="absolute -top-6 -right-6 text-yellow-300 text-4xl">🌼</div>
                <div className="absolute -bottom-6 -left-6 text-purple-300 text-4xl">🌺</div>

                <p className="text-2xl font-medium text-green-900 whitespace-pre-line">
                  {sentence}
                </p>
              </motion.div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
