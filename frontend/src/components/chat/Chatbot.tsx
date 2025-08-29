import { useChatStore } from "@/hooks/useChatStore";
import { Loader, Send, X } from "lucide-react";
import { useState } from "react";

import ChatContainer from "./ChatContainer";

const Chatbot = () => {
  const [openBot, setOpenBot] = useState(false);
  const [message, setMessage] = useState("");

  const { sendMessage, messages, isSending } = useChatStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim() === "") return;
    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="w-full h-full">
      <form
        onSubmit={handleSend}
        className={` ${
          openBot
            ? "translate-y-0"
            : "translate-y-full opacity-0 pointer-events-none invisible"
        } bg-black  sm:max-w-lg w-fit shadow-2xl rounded-2xl transition-all duration-500 fixed bottom-6 right-6 overflow-hidden border border-gray-200 flex flex-col`}
      >
        <div className="px-5 pt-4 pb-2">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
            <span className="text-teal-500 font-bold">AI Symptom Checker</span>
          </h1>
          <p className="text-sm text-gray-500">
            Understand your symptoms with AI
          </p>
          <X
            onClick={() => {
              setOpenBot(false);
            }}
            className="absolute top-1 right-1 cursor-pointer p-1 bg-blue-500 rounded-full text-white hover:scale-110 active:scale-90 transition-transform ease-in-out"
          />
        </div>

        <ChatContainer messages={messages} />

        {!message && (
          <div className="question-template-wrapper">
            {[].map((q, i) => (
              <button
                onClick={() => {
                  setMessage(q);
                }}
                key={i}
                className="question-template"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 px-4 py-3 border-t bg-white">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Describe your symptoms here..."
          />
          <button
            type="submit"
            className="text-teal-500 hover:text-teal-600 cursor-pointer transition-colors"
          >
            {isSending ? (
              <Loader className="animate-spin size-5" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
      {!openBot && (
        <div
          onClick={() => setOpenBot(true)}
          className="fixed bottom-6 right-6 flex items-center gap-3 bg-rose-500 
             text-white shadow-lg rounded-2xl cursor-pointer px-4 py-3 
             hover:scale-105 hover:shadow-2xl transition-transform duration-1000"
        >
          <img
            src="/assets/icons/logo-icon.svg"
            alt="AI Symptom Checker"
            className="w-10 h-10 drop-shadow-md"
          />
          <h3 className="font-semibold text-base sm:text-lg tracking-wide leading-snug">
            AI Symptom Checker
          </h3>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
