function ThreatTimeline() {
  const events = [
    "Critical attack detected on EC2",
    "Public S3 bucket discovered",
    "IAM policy updated",
    "CloudTrail logs analyzed",
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="border-l-2 border-cyan-500 pl-4"
          >
            <p className="text-white">{event}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThreatTimeline;