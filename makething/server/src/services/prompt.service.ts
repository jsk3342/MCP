import { YouTubeService } from "./youtube.service";
import { NotionService } from "./notion.service";
import axios from "axios";

export class PromptService {
  private youtubeService: YouTubeService;
  private notionService: NotionService;

  constructor() {
    this.youtubeService = new YouTubeService();
    this.notionService = new NotionService();
  }

  async processPrompt(prompt: string): Promise<any> {
    try {
      // Claude API를 호출하여 프롬프트 처리
      const claudeResponse = await this.askClaude(prompt);

      // YouTube에서 관련 영상 검색
      const videos = await this.youtubeService.searchVideos(
        claudeResponse.searchQuery
      );

      // 각 비디오에 대해 처리
      const results = await Promise.all(
        videos.items.map(async (video) => {
          // Claude를 사용하여 비디오 내용 요약
          const summary = await this.askClaude(
            `다음 YouTube 영상의 내용을 요약해주세요: ${video.snippet.title}\n\n${video.snippet.description}`
          );

          // Notion에 저장
          const pageData = {
            title: video.snippet.title,
            description: summary.summary,
            videoUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`,
            thumbnailUrl: video.snippet.thumbnails.default.url,
            publishedAt: video.snippet.publishedAt,
          };

          return await this.notionService.createPage(pageData);
        })
      );

      return {
        message: "프롬프트 처리가 완료되었습니다.",
        results,
      };
    } catch (error) {
      console.error("Error processing prompt:", error);
      throw new Error("프롬프트 처리 중 오류가 발생했습니다.");
    }
  }

  private async askClaude(prompt: string): Promise<any> {
    try {
      const response = await axios.post("http://localhost:3000/api/claude", {
        prompt,
      });
      return response.data;
    } catch (error) {
      console.error("Claude API Error:", error);
      throw new Error("Claude API 호출 중 오류가 발생했습니다.");
    }
  }
}
