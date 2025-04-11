import axios from "axios";
import { YouTubeFormData, AnalysisResult } from "../types";

const API_BASE_URL = "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const analyzeYouTubeVideo = async (
  formData: YouTubeFormData
): Promise<AnalysisResult> => {
  const { data } = await api.post<AnalysisResult>("/analyze-video", formData);
  return data;
};

export const saveToNotion = async (
  videoId: string,
  pageId?: string
): Promise<{ notionPageUrl: string }> => {
  const { data } = await api.post("/save-to-notion", { videoId, pageId });
  return data;
};

export const processPrompt = async (prompt: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/prompt/process`, {
      prompt,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("프롬프트 처리 중 오류가 발생했습니다.");
  }
};

export default api;
