export default function handler(req, res) {
  return res.status(200).json({
    key: process.env.GEMINI_API_KEY || "NOT_FOUND"
  });
}
