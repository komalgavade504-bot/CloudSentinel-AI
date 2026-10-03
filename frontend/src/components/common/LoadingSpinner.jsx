function LoadingSpinner() {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>

        <p className="text-lg font-semibold text-cyan-400">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default LoadingSpinner;