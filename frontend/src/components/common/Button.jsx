/**
 * Reusable button with variant, loading, and icon support.
 * variant: "primary" | "secondary" | "ghost"
 */
function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  loading = false,
  disabled = false,
  icon: Icon,
  fullWidth = true,
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-abyss disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-signal-500 text-void hover:bg-signal-400 focus-visible:ring-signal-400 shadow-lg shadow-signal-500/20",
    secondary:
      "border border-white/15 bg-white/[0.03] text-slate-200 hover:bg-white/[0.07] focus-visible:ring-white/30",
    ghost:
      "text-slate-400 hover:text-slate-200 focus-visible:ring-white/20",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""}`}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4" />}
          {children}
        </>
      )}
    </button>
  );
}

export default Button;