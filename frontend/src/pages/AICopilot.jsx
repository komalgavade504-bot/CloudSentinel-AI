import { useEffect, useState } from "react";
import {
  FiShield,
  FiCloud,
  FiAlertTriangle,
  FiKey,
  FiCheckCircle,
  FiSend,
  FiTrash2,
} from "react-icons/fi";

function AICopilot() {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      type: "ai",
      text:
        "Hello! I'm CloudSentinel AI Copilot. Ask me about threats, vulnerabilities, cloud security, IAM, compliance, or your security score.",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);

  const suggestedQuestions = [
    "How can I secure my EC2 instance?",
    "Explain the public S3 bucket threat.",
    "What should I fix first?",
    "How can I improve my security score?",
  ];

  // =========================
  // LOAD CHAT HISTORY
  // =========================
  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      setHistoryLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/ai/history"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load chat history"
        );
      }

      const history = data?.data || [];

      if (history.length > 0) {
        // Backend returns newest first,
        // so reverse it for correct chat order
        const formattedMessages = [];

        [...history].reverse().forEach((chat) => {
          formattedMessages.push({
            id: `${chat._id}-user`,
            type: "user",
            text: chat.question,
          });

          formattedMessages.push({
            id: `${chat._id}-ai`,
            type: "ai",
            text: chat.answer,
          });
        });

        setMessages([
          {
            id: "welcome",
            type: "ai",
            text:
              "Hello! I'm CloudSentinel AI Copilot. Ask me about threats, vulnerabilities, cloud security, IAM, compliance, or your security score.",
          },
          ...formattedMessages,
        ]);
      }
    } catch (error) {
      console.error(
        "Failed to load chat history:",
        error
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  // =========================
  // SEND MESSAGE
  // =========================
  const sendMessage = async (text = question) => {
    const cleanText = text.trim();

    if (!cleanText || loading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      text: cleanText,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/ask",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            question: cleanText,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "AI request failed"
        );
      }

      setMessages((current) => [
        ...current,
        {
          id: `ai-${Date.now()}`,
          type: "ai",
          text:
            data?.data?.answer ||
            "I received your question but couldn't generate an answer.",
        },
      ]);
    } catch (error) {
      console.error(
        "AI Copilot error:",
        error
      );

      setMessages((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          type: "ai",
          text:
            "Unable to connect to the AI security service. Please make sure the backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  // =========================
// CLEAR CHAT
// =========================
const clearChat = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to clear all chat history?"
  );

  if (!confirmed) return;

  try {
    const response = await fetch(
      "http://localhost:5000/api/ai/history",
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to clear chat history"
      );
    }

    // Reset UI to welcome message
    setMessages([
      {
        id: "welcome",
        type: "ai",
        text:
          "Hello! I'm CloudSentinel AI Copilot. Ask me about threats, vulnerabilities, cloud security, IAM, compliance, or your security score.",
      },
    ]);
  } catch (error) {
    console.error("Clear chat error:", error);

    alert(
      "Unable to clear chat history. Please try again."
    );
  }
};

  // =========================
  // FORM SUBMIT
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage();
  };

  return (
    <div className="space-y-6">

      {/* ONLINE STATUS */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
        <div className="flex items-center gap-3">

          <span className="h-3 w-3 rounded-full bg-green-400"></span>

          <span className="font-semibold text-green-400">
            AI Copilot Online
          </span>

          <span className="text-slate-500">
            Ready to analyze security events
          </span>

        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">

        {/* CHAT SECTION */}
        <div className="flex min-h-[700px] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

          {/* CHAT HEADER */}
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">

  <div className="flex items-center gap-4">

    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
      <FiShield
        size={25}
        className="text-cyan-400"
      />
    </div>

    <div>
      <h2 className="text-lg font-bold text-white">
        Security Assistant
      </h2>

      <p className="text-sm text-slate-500">
        CloudSentinel AI
      </p>
    </div>

  </div>

  <button
    onClick={clearChat}
    disabled={loading}
    title="Clear Chat"
    className="flex items-center gap-2 rounded-lg border border-red-500/40 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <FiTrash2 size={17} />

    <span className="hidden sm:inline">
      Clear Chat
    </span>
  </button>

</div>

          {/* CHAT MESSAGES */}
          <div className="flex-1 space-y-6 overflow-y-auto p-6">

            {historyLoading ? (

              <div className="flex justify-center py-10">
                <p className="text-sm text-slate-500">
                  Loading chat history...
                </p>
              </div>

            ) : (

              messages.map((message) => (

                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[80%] rounded-2xl border px-5 py-4 ${
                      message.type === "user"
                        ? "border-cyan-400/30 bg-cyan-500 text-slate-950"
                        : "border-slate-700 bg-slate-950 text-slate-200"
                    }`}
                  >

                    <p className="whitespace-pre-line text-sm leading-6">
                      {message.text}
                    </p>

                  </div>

                </div>

              ))

            )}

            {/* AI LOADING */}
            {loading && (

              <div className="flex justify-start">

                <div className="rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-sm text-slate-400">

                  <div className="flex items-center gap-2">

                    <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></span>

                    AI is analyzing your question...

                  </div>

                </div>

              </div>

            )}

          </div>

          {/* INPUT */}
          <div className="border-t border-slate-800 p-5">

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 p-2"
            >

              <input
                type="text"
                value={question}
                onChange={(e) =>
                  setQuestion(e.target.value)
                }
                placeholder="Ask about a threat, vulnerability, CVE, or security issue..."
                disabled={loading}
                className="flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-600 disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={
                  loading ||
                  !question.trim()
                }
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-500 text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
              >

                <FiSend size={18} />

              </button>

            </form>

          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* SUGGESTED QUESTIONS */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-5 text-xl font-bold text-white">
              Suggested Questions
            </h2>

            <div className="space-y-3">

              {suggestedQuestions.map((item) => (

                <button
                  key={item}
                  onClick={() => sendMessage(item)}
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-left text-sm text-slate-200 transition hover:border-cyan-400 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {item}

                </button>

              ))}

            </div>

          </div>

          {/* SECURITY AREAS */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-5 text-xl font-bold text-white">
              Security Areas
            </h2>

            <div className="space-y-5">

              {/* CLOUD */}
              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950">

                  <FiCloud
                    className="text-cyan-400"
                    size={21}
                  />

                </div>

                <div>

                  <p className="font-semibold text-white">
                    Cloud Resources
                  </p>

                  <p className="text-xs text-slate-500">
                    EC2, S3 and infrastructure
                  </p>

                </div>

              </div>

              {/* THREATS */}
              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950">

                  <FiAlertTriangle
                    className="text-cyan-400"
                    size={21}
                  />

                </div>

                <div>

                  <p className="font-semibold text-white">
                    Threat Detection
                  </p>

                  <p className="text-xs text-slate-500">
                    Active threats and incidents
                  </p>

                </div>

              </div>

              {/* IAM */}
              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950">

                  <FiKey
                    className="text-cyan-400"
                    size={21}
                  />

                </div>

                <div>

                  <p className="font-semibold text-white">
                    IAM Security
                  </p>

                  <p className="text-xs text-slate-500">
                    Access and identity controls
                  </p>

                </div>

              </div>

              {/* COMPLIANCE */}
              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950">

                  <FiCheckCircle
                    className="text-cyan-400"
                    size={21}
                  />

                </div>

                <div>

                  <p className="font-semibold text-white">
                    Compliance
                  </p>

                  <p className="text-xs text-slate-500">
                    Security frameworks
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AICopilot;