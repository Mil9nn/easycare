import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useRef } from "react";

type ChatMessage = {
  text: string;
  isUser: boolean;
}

type ChatContainerProps = {
  messages: ChatMessage[];
}

const ChatContainer = ({ messages }: ChatContainerProps) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="h-full w-full p-4 overflow-auto">
        <div className="chat-container">
      {messages.map((msg, index) => {
        const isLast = index === messages.length - 1;
        return (
          <div
            key={index}
            ref={isLast ? lastMessageRef : null}
            className={`message ${msg.isUser ? "user-message" : "bot-message"}`}
          >
            <p className="text-sm">{msg.text}</p>
          </div>
        );
      })}
    </div>
    </ScrollArea>
  );
};

export default ChatContainer;
