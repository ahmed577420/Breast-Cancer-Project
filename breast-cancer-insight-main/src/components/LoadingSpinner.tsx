export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
      <span>Analyzing...</span>
    </div>
  );
};
