import { Request, Response } from "express";
import { openai } from "../lib/aiClient.js";

export const summarize = async (req: Request, res: Response) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: "No content provided" });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: `Summarize this: ${content}` }],
    });

    const summary = response.choices[0]?.message?.content;
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate summary", error: err });
  }
}; 