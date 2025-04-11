import { Request, Response } from "express";
import { YouTubeService } from "../services/youtube.service";
import { NotionService } from "../services/notion.service";

export class SearchController {
  private youtubeService: YouTubeService;
  private notionService: NotionService;

  constructor() {
    this.youtubeService = new YouTubeService();
    this.notionService = new NotionService();
  }

  searchAndSave = async (req: Request, res: Response) => {
    try {
      const { query } = req.body;

      if (!query) {
        return res.status(400).json({ error: "Query is required" });
      }

      // YouTube 검색
      const searchResults = await this.youtubeService.searchVideos(query);

      // 각 검색 결과를 Notion에 저장
      const savedPages = await Promise.all(
        searchResults.items.map(async (item) => {
          const pageData = {
            title: item.snippet.title,
            description: item.snippet.description,
            videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            thumbnailUrl: item.snippet.thumbnails.default.url,
            publishedAt: item.snippet.publishedAt,
          };

          return await this.notionService.createPage(pageData);
        })
      );

      res.json({
        message: "Successfully saved videos to Notion",
        savedPages,
      });
    } catch (error) {
      console.error("Search and Save Error:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  };
}
