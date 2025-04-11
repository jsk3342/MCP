export interface YouTubeSearchResult {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
    publishedAt: string;
  };
}

export interface YouTubeSearchResponse {
  items: YouTubeSearchResult[];
}
