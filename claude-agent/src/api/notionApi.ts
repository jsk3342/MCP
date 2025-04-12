import axios from "axios";

export const createNotionClient = (apiKey: string) => {
  const client = axios.create({
    baseURL: "https://api.notion.com/v1",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
  });

  const searchPages = async (query: string) => {
    try {
      const response = await client.post("/search", {
        query,
        filter: {
          property: "object",
          value: "page",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Notion API 검색 오류:", error);
      throw error;
    }
  };

  const getPage = async (pageId: string) => {
    try {
      const response = await client.get(`/pages/${pageId}`);
      return response.data;
    } catch (error) {
      console.error("Notion 페이지 조회 오류:", error);
      throw error;
    }
  };

  const getBlockChildren = async (blockId: string) => {
    try {
      const response = await client.get(`/blocks/${blockId}/children`);
      return response.data;
    } catch (error) {
      console.error("Notion 블록 조회 오류:", error);
      throw error;
    }
  };

  return {
    searchPages,
    getPage,
    getBlockChildren,
  };
};

export type NotionClient = ReturnType<typeof createNotionClient>;
