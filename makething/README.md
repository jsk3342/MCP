# YouTube to Notion MCP Integration

This project demonstrates the use of Model Context Protocol (MCP) to integrate YouTube and Notion services. It analyzes YouTube videos and saves the analysis to Notion pages.

## Features

- Extract video information and transcript from YouTube videos
- Analyze video content to generate summaries
- Save analysis results to Notion
- React frontend with Tanstack Query for data fetching
- Express backend to coordinate MCP servers

## Prerequisites

- Node.js 16+ and npm
- YouTube API Key
- Notion API Key (for production use)

## Installation

1. Clone the repository
2. Install dependencies

```bash
# Install root dependencies
npm install

# Install client and server dependencies
npm run install:all
```

3. Create environment files

```bash
# Copy example environment file
cp server/.env.example server/.env

# Edit .env file with your API keys
```

## Development

Run the development server:

```bash
# Run both client and server in development mode
npm run dev

# Or run them separately
npm run client
npm run server
```

## Project Structure

```
makething/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service functions
│   │   ├── App.tsx        # Main React component
│   │   └── main.tsx       # Entry point
│   └── ...
├── server/                # Express backend
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── types/         # TypeScript interfaces
│   │   └── index.ts       # Entry point
│   └── ...
└── ...
```

## How It Works

1. The frontend allows users to paste a YouTube URL and submit it for analysis
2. The backend receives the request and starts MCP servers if needed
3. YouTube MCP server is used to fetch video info and transcript
4. Analysis is performed on the transcript
5. Optionally, results are saved to Notion using Notion MCP server
6. Results are returned to the frontend for display

## MCP Design

This project is designed to simulate MCP functionality:

- YouTube API direct integration (simulates YouTube MCP server functionality)
- Notion API integration will be simulated (for future Notion MCP server)

In a future version, this could be replaced with actual MCP servers once they are more widely available.