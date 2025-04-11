import { Client } from "@notionhq/client";
import { NotionPage, NotionResponse } from "../types/notion";

export class NotionService {
  private notion: Client;
  private databaseId: string;

  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
    this.databaseId = process.env.NOTION_DATABASE_ID || "";
  }

  async createPage(pageData: NotionPage): Promise<NotionResponse> {
    try {
      const response = await this.notion.pages.create({
        parent: {
          database_id: this.databaseId,
        },
        properties: {
          Title: {
            title: [
              {
                text: {
                  content: pageData.title,
                },
              },
            ],
          },
          Description: {
            rich_text: [
              {
                text: {
                  content: pageData.description,
                },
              },
            ],
          },
          "Video URL": {
            url: pageData.videoUrl,
          },
          "Thumbnail URL": {
            url: pageData.thumbnailUrl,
          },
          "Published At": {
            date: {
              start: pageData.publishedAt,
            },
          },
        },
      });

      return {
        id: response.id,
        url: `https://notion.so/${response.id}`,
      };
    } catch (error) {
      console.error("Notion API Error:", error);
      throw new Error("Failed to create Notion page");
    }
  }
}
