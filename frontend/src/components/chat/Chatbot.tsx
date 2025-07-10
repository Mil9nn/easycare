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
  }

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (message.trim() === "") return;
    sendMessage(message);
  }

  return (
    <div className="relative">
      <form onSubmit={handleSend}
        className={`chatbot-wrapper ${
          openBot ? "translate-y-0" : "translate-y-full opacity-0 pointer-events-none invisible"
        } bg-white shadow-2xl rounded-2xl transition-all duration-500 overflow-hidden border border-gray-200 flex flex-col`}
      >
        <div className="px-5 pt-4 pb-2">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
            👋 Hi there! I'm{" "}
            <span className="text-teal-500 font-bold">EasyBot</span>
          </h1>
          <p className="text-sm text-gray-500">
            Your personal health assistant. How can I help you today?
          </p>
          <X
            onClick={() => {
              setOpenBot(false);
            }}
            className="absolute top-1 right-1 cursor-pointer p-1 bg-blue-500 rounded-full text-white hover:scale-110 active:scale-90 transition-transform ease-in-out"
          />
        </div>

        <ChatContainer messages={messages} />

        {!message && <div className="question-template-wrapper">
          {[
            "I need help choosing a doctor for my condition.",
            "I have anxiety, which doctor can help me?",
            "What are the symptoms of diabetes?",
            "How do I book an appointment?",
          ].map((q, i) => (
            <button onClick={() => {setMessage(q)}} key={i} className="question-template">
              {q}
            </button>
          ))}
        </div>}

        <div className="flex items-center gap-2 px-4 py-3 border-t bg-white">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Type your message here..."
          />
          <button type="submit" className="text-teal-500 hover:text-teal-600 cursor-pointer transition-colors">
            {isSending ? <Loader className="animate-spin size-5" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </form>
      {!openBot && <img onClick={() => setOpenBot(true)}
        src="/assets/icons/logo-icon.svg"
        className="w-12 h-12 absolute -bottom-1 -right-1 bg-blue-500 p-2 rounded-full cursor-pointer"
      />}
    </div>
  );
};

export default Chatbot;
