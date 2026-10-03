function SecurityStatus() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-bold text-white">
        Security Status
      </h2>

      <div className="space-y-3">
        <p className="text-green-400">✔ MFA Enabled</p>
        <p className="text-green-400">✔ Email Verified</p>
        <p className="text-yellow-400">⚠ Password expires in 18 days</p>
        <p className="text-cyan-400">✔ Last Scan Passed</p>
      </div>
    </div>
  );
}

export default SecurityStatus;