import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useRef } from "react";

type ChatMessage = {
  text: string;
  isUser: boolean;
};

type ChatContainerProps = {
  messages: ChatMessage[];
};

const ChatContainer = ({ messages }: ChatContainerProps) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="h-full w-full p-2">
      <div className="chat-container">
        {messages.map((msg, index) => {
          const isLast = index === messages.length - 1;
          return (
            <div
              key={index}
              ref={isLast ? lastMessageRef : null}
              className={`relative max-w-3xl w-full rounded-2xl shadow-lg border border-zinc-200/40 p-6 transition-all duration-300 
              ${
                msg.isUser
                  ? "ml-auto bg-gradient-to-r from-blue-500/10 to-blue-700/20 border-blue-300/20"
                  : "mr-auto bg-gradient-to-r from-zinc-100 to-zinc-200"
              }`}
            >
              {/* Title */}
              <h3 className="font-bold text-xl text-zinc-900 mb-4">
                Analysis Results
              </h3>

              {/* Possible Conditions */}
              <div className="mb-4">
                <h4 className="font-semibold text-lg text-zinc-800 mb-2">
                  Possible Conditions
                </h4>
                <div className="flex flex-col gap-2">
                  {msg.possible_conditions.map((condition, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-md w-fit bg-blue-600/20 text-blue-800 font-medium"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Speciality */}
              <div className="mb-4 flex items-center gap-3">
                <h4 className="font-semibold text-lg text-zinc-800">
                  Recommended Speciality:
                </h4>
                <span className="px-3 py-1 text-sm rounded-full bg-green-600/20 text-green-700 font-medium">
                  {msg.recommended_speciality}
                </span>
              </div>

              {/* Urgency */}
              <div className="absolute top-1 right-2">
                <span className="uppercase text-xs font-semibold tracking-wide px-3 py-1 rounded-full bg-yellow-400 text-zinc-900">
                  {msg.urgency_level} Priority
                </span>
              </div>

              {/* General Advice */}
              <div className="mb-4">
                <h4 className="font-semibold text-lg text-zinc-800">
                  General Advice
                </h4>
                <p className="text-sm text-zinc-700 leading-relaxed mt-1">
                  {msg.general_advice}
                </p>
              </div>

              {/* Warning Signs */}
              <div className="mb-4">
                <h4 className="font-semibold text-lg text-zinc-800">
                  Warning Signs to Watch For
                </h4>
                <ul className="mt-2 flex flex-col gap-2">
                  {msg.warning_signs.map((warning, i) => (
                    <li
                      key={i}
                      className="px-3 py-2 text-sm rounded-lg bg-red-500/20 text-red-700 font-medium"
                    >
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-zinc-500 italic border-t pt-3">
                {msg.disclaimer}
              </p>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default ChatContainer;
