import { useState } from "react";
import {
  FiShield,
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

// Same simulated feed as Login — swap for a real event stream later.
const FEED_EVENTS = [
  { id: 1, level: "nominal", text: "Auth service — all regions healthy", time: "12:04:01" },
  { id: 2, level: "warning", text: "Unusual login pattern — us-east-2", time: "12:03:44" },
  { id: 3, level: "nominal", text: "Firewall rules synced", time: "12:03:10" },
  { id: 4, level: "critical", text: "Anomalous API burst — blocked", time: "12:02:52" },
  { id: 5, level: "nominal", text: "Certificate rotation complete", time: "12:01:37" },
];

const LEVEL_STYLES = {
  nominal: { dot: "bg-signal-500" },
  warning: { dot: "bg-amber-500" },
  critical: { dot: "bg-red-500" },
};

function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};

    if (!form.fullName) nextErrors.fullName = "Enter your full name.";
    if (!form.email) nextErrors.email = "Enter your work email.";
    if (!form.password) nextErrors.password = "Choose a password.";
    else if (form.password.length < 8)
      nextErrors.password = "Use at least 8 characters.";
    if (form.confirmPassword !== form.password)
      nextErrors.confirmPassword = "Passwords don't match.";
    if (!agreed) nextErrors.agreed = "You must accept the terms to continue.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setLoading(true);
      // Simulated signup call — wire up to real service later.
      setTimeout(() => setLoading(false), 1200);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-void font-sans">
      {/* Ambient grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-signal-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-signal-600/10 blur-[120px]" />

      {/* Left panel — SOC monitoring feel, hidden on mobile */}
      <div className="relative z-10 hidden w-1/2 flex-col justify-between border-r border-white/5 p-12 lg:flex">
        <div className="flex items-center gap-2.5">
          <FiShield className="h-6 w-6 text-signal-400" />
          <span className="font-mono text-sm font-semibold tracking-[0.2em] text-slate-200">
            CLOUDSENTINEL AI
          </span>
        </div>

        {/* Radar visual */}
        <div className="relative mx-auto flex h-64 w-64 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-signal-500/20" />
          <div className="absolute inset-6 rounded-full border border-signal-500/15" />
          <div className="absolute inset-12 rounded-full border border-signal-500/10" />
          <div className="absolute inset-0 origin-center animate-radar-spin">
            <div className="h-full w-1/2 origin-right bg-gradient-to-l from-signal-500/25 to-transparent" />
          </div>
          <FiActivity className="h-8 w-8 text-signal-400" />
        </div>

        {/* Live feed */}
        <div className="space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
            Live signal feed
          </p>
          <div className="space-y-2 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            {FEED_EVENTS.map((event) => {
              const style = LEVEL_STYLES[event.level];
              return (
                <div key={event.id} className="flex items-center gap-2.5 font-mono text-xs">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
                  <span className="text-slate-500">{event.time}</span>
                  <span className="truncate text-slate-400">{event.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right panel — register card */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        {/* Mobile brand mark */}
        <div className="mb-8 flex items-center gap-2.5 lg:hidden">
          <FiShield className="h-6 w-6 text-signal-400" />
          <span className="font-mono text-sm font-semibold tracking-[0.2em] text-slate-200">
            CLOUDSENTINEL AI
          </span>
        </div>

        <div className="w-full max-w-sm animate-fade-up rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-signal-400">
            New workspace
          </p>
          <h1 className="mb-1.5 text-2xl font-semibold text-slate-50">
            Create your account
          </h1>
          <p className="mb-6 text-sm text-slate-400">
            Set up monitoring for your cloud in minutes.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="fullName"
              label="Full name"
              type="text"
              icon={FiUser}
              value={form.fullName}
              onChange={handleChange("fullName")}
              placeholder="Jane Cooper"
              error={errors.fullName}
              required
              autoComplete="name"
            />

            <Input
              id="email"
              label="Work email"
              type="email"
              icon={FiMail}
              value={form.email}
              onChange={handleChange("email")}
              placeholder="you@company.com"
              error={errors.email}
              required
              autoComplete="email"
            />

            <Input
              id="password"
              label="Password"
              type="password"
              icon={FiLock}
              value={form.password}
              onChange={handleChange("password")}
              placeholder="At least 8 characters"
              error={errors.password}
              required
              autoComplete="new-password"
            />

            <Input
              id="confirmPassword"
              label="Confirm password"
              type="password"
              icon={FiLock}
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              placeholder="Re-enter your password"
              error={errors.confirmPassword}
              required
              autoComplete="new-password"
            />

            <div>
              <label className="flex items-start gap-2 text-xs text-slate-400">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 bg-white/5 text-signal-500 focus:ring-signal-500/50"
                />
                <span>
                  I agree to the{" "}
                  <a href="#" className="text-signal-400 hover:text-signal-300">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-signal-400 hover:text-signal-300">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              {errors.agreed && (
                <p className="mt-1.5 flex items-center gap-1 font-mono text-xs text-red-400">
                  <FiAlertTriangle className="h-3 w-3" />
                  {errors.agreed}
                </p>
              )}
            </div>

            <Button type="submit" loading={loading} icon={FiArrowRight}>
              Create account
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-600">
              or
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <Button variant="secondary">Continue with SSO</Button>

          <p className="mt-6 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-signal-400 hover:text-signal-300">
              Sign in
            </a>
          </p>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-center font-mono text-[11px] text-slate-600">
            <FiCheckCircle className="h-3 w-3" />
            SOC 2 Type II compliant
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;