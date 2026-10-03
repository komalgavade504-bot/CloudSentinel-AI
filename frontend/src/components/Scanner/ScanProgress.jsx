function ScanProgress({ progress }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-bold text-white">
        Scan Progress
      </h2>

      <div className="h-4 rounded-full bg-slate-800">
        <div
          className="h-4 rounded-full bg-cyan-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-4 text-center text-lg text-white">
        {progress}%
      </p>
    </div>
  );
}

export default ScanProgress;