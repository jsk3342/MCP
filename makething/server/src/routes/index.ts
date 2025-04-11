import express from "express";
import { analyzeVideo, saveToNotion } from "../controllers/videoController";
import promptRoutes from "./prompt.routes";

const router = express.Router();

router.post("/analyze-video", analyzeVideo);
router.post("/save-to-notion", saveToNotion);
router.use("/prompt", promptRoutes);

export default router;
