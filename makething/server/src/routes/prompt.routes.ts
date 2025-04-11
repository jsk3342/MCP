import { Router } from "express";
import { PromptController } from "../controllers/prompt.controller";

const router = Router();
const promptController = new PromptController();

router.post("/process", promptController.processPrompt);

export default router;
