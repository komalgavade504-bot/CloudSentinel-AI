function ToggleSwitch({ label, checked }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-slate-300">
        {label}
      </span>

      <button
        className={`h-7 w-14 rounded-full transition ${
          checked ? "bg-cyan-500" : "bg-slate-700"
        }`}
      >
        <div
          className={`h-6 w-6 rounded-full bg-white transition ${
            checked ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default ToggleSwitch;