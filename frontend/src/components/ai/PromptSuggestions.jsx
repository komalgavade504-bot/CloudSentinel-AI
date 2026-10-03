import { promptSuggestions } from "../../data/aiData";

function PromptSuggestions({ onSelect }) {
  return (
    <div className="flex flex-wrap gap-3">
      {promptSuggestions.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 hover:border-cyan-400 hover:text-cyan-400"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}

export default PromptSuggestions;