import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

/**
 * Reusable text/password input with icon, label, and error state.
 * Password fields get a built-in show/hide toggle automatically.
 */
function Input({
  id,
  label,
  type = "text",
  icon: Icon,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-wider text-slate-400"
      >
        {label}
      </label>

      <div
        className={`group flex items-center gap-2 rounded-lg border bg-white/[0.03] px-3.5 py-2.5 transition-colors focus-within:border-cyan-500/60 focus-within:bg-white/[0.05] ${
          error ? "border-red-500/50" : "border-white/10"
        }`}
      >
        {Icon && (
          <Icon
            className={`h-4 w-4 shrink-0 text-slate-500 transition-colors group-focus-within:text-cyan-400 ${
              error ? "text-red-400" : ""
            }`}
          />
        )}

        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className="w-full bg-transparent font-sans text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="shrink-0 text-slate-500 transition-colors hover:text-slate-300 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? (
              <FiEyeOff className="h-4 w-4" />
            ) : (
              <FiEye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1.5 font-mono text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

export default Input;