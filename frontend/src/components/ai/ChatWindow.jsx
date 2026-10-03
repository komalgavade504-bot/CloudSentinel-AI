import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

function ChatWindow({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="h-[500px] space-y-4 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6">

      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-slate-400">
          Start a conversation with CloudSentinel AI 🚀
        </div>
      ) : (
        messages.map((message) => (
          <ChatMessage
            key={message.id}
            sender={message.sender}
            text={message.text}
          />
        ))
      )}

      <div ref={bottomRef} />

    </div>
  );
}

export default ChatWindow;