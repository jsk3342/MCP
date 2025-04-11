import axios from "axios";
import { YouTubeSearchResponse } from "../types/youtube";

export class YouTubeService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY || "";
  }

  async searchVideos(query: string): Promise<YouTubeSearchResponse> {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: "snippet",
            q: query,
            key: this.apiKey,
            type: "video",
            maxResults: 5,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("YouTube API Error:", error);
      throw new Error("YouTube 검색 중 오류가 발생했습니다.");
    }
  }
}
