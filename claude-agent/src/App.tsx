import { useState } from "react";
import ChatContainer from "./components/chat/ChatContainer";
import APISettings from "./components/service/APISettings";
import NotionIntegration from "./components/service/NotionIntegration";
import { Button } from "./components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [activeTab, setActiveTab] = useState<"chat" | "settings">("chat");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* 헤더 */}
        <header className="border-b py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Claude Agent</h1>
            <div className="space-x-2">
              <Button
                variant={activeTab === "chat" ? "default" : "outline"}
                onClick={() => setActiveTab("chat")}
              >
                채팅
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "outline"}
                onClick={() => setActiveTab("settings")}
              >
                설정
              </Button>
            </div>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 container mx-auto px-4 py-6">
          {activeTab === "chat" ? (
            <div className="h-[calc(100vh-8rem)]">
              <ChatContainer />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <APISettings />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">서비스 연결</h2>
                <NotionIntegration />
              </div>
            </div>
          )}
        </main>

        {/* 푸터 */}
        <footer className="border-t py-4">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            &copy; 2025 Claude Agent. All rights reserved.
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
