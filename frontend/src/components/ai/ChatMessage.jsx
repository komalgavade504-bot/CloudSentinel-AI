function ChatMessage({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xl rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-cyan-500 text-slate-950"
            : "bg-slate-800 text-white"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export default ChatMessage;