import { AlertCircle, X } from "lucide-react";

interface ErrorAlertProps {
  message: string;
  onClose: () => void;
}

export const ErrorAlert = ({ message, onClose }: ErrorAlertProps) => {
  return (
    <div className="animate-fade-in-up bg-destructive/10 border border-destructive/30 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-destructive">Error</h4>
          <p className="text-sm text-destructive/80 mt-1">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-destructive/10 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-destructive" />
        </button>
      </div>
    </div>
  );
};
