import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

import {
  FiShield,
  FiMail,
  FiLock,
  FiArrowRight,
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi";



import Input from "../components/common/Input";
import Button from "../components/common/Button";

// Simulated live feed — replace with real event stream later.
const FEED_EVENTS = [
  { id: 1, level: "nominal", text: "Auth service — all regions healthy", time: "12:04:01" },
  { id: 2, level: "warning", text: "Unusual login pattern — us-east-2", time: "12:03:44" },
  { id: 3, level: "nominal", text: "Firewall rules synced", time: "12:03:10" },
  { id: 4, level: "critical", text: "Anomalous API burst — blocked", time: "12:02:52" },
  { id: 5, level: "nominal", text: "Certificate rotation complete", time: "12:01:37" },
];

const LEVEL_STYLES = {
  nominal: { dot: "bg-signal-500", icon: FiCheckCircle, text: "text-signal-400" },
  warning: { dot: "bg-amber-500", icon: FiAlertTriangle, text: "text-amber-400" },
  critical: { dot: "bg-red-500", icon: FiAlertTriangle, text: "text-red-400" },
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  const nextErrors = {};

  if (!email) nextErrors.email = "Enter your work email.";
  if (!password) nextErrors.password = "Enter your password.";

  setErrors(nextErrors);

  if (Object.keys(nextErrors).length > 0) return;

  try {
    setLoading(true);

    const response = await loginUser({
      email,
      password,
    });

    // Save JWT Token
    localStorage.setItem("token", response.data.token);

    // Save User
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    setLoading(false);

    alert("Login Successful");

    navigate("/dashboard");

  } catch (error) {
    setLoading(false);

    alert(
      error.response?.data?.message ||
      "Login Failed"
    );
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

      {/* Right panel — login card */}
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
            Secure access
          </p>
          <h1 className="mb-1.5 text-2xl font-semibold text-slate-50">
            Sign in to your workspace
          </h1>
          <p className="mb-6 text-sm text-slate-400">
            Monitor, detect, and respond — all in one place.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="email"
              label="Work email"
              type="email"
              icon={FiMail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              error={errors.password}
              required
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-400">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 text-signal-500 focus:ring-signal-500/50"
                />
                Remember this device
              </label>
              <a href="#" className="text-xs font-medium text-signal-400 hover:text-signal-300">
                Forgot password?
              </a>
            </div>

            <Button type="submit" loading={loading} icon={FiArrowRight}>
              Sign in
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

          <p className="mt-6 flex items-center justify-center gap-1.5 text-center font-mono text-[11px] text-slate-600">
            <FiLock className="h-3 w-3" />
            Protected by 256-bit encryption
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;