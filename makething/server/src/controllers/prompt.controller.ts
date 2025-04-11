import { Request, Response } from "express";
import { PromptService } from "../services/prompt.service";

export class PromptController {
  private promptService: PromptService;

  constructor() {
    this.promptService = new PromptService();
  }

  processPrompt = async (req: Request, res: Response) => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "프롬프트가 필요합니다." });
      }

      const result = await this.promptService.processPrompt(prompt);
      res.json(result);
    } catch (error) {
      console.error("Prompt Processing Error:", error);
      res.status(500).json({ error: "프롬프트 처리 중 오류가 발생했습니다." });
    }
  };
}
