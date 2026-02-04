import { CheckCircle, AlertTriangle, Sparkles, ShieldCheck, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ResultCardProps {
  prediction: string;
  probability: number;
}

export const ResultCard = ({ prediction, probability }: ResultCardProps) => {
  const isBenign = prediction.toLowerCase() === "benign";
  const probabilityPercent = Math.round(probability * 100);

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-card-hover border-2 transition-all duration-500 ${
      isBenign 
        ? "border-success/30 bg-gradient-to-br from-success/5 via-success/10 to-accent/5" 
        : "border-destructive/30 bg-gradient-to-br from-destructive/5 via-warning/10 to-destructive/5"
    }`}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl ${
          isBenign ? "bg-success/20" : "bg-destructive/20"
        }`} />
        <div className={`absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-2xl ${
          isBenign ? "bg-accent/20" : "bg-warning/20"
        }`} />
      </div>

      {/* Header */}
      <div className={`relative px-6 py-5 ${isBenign ? "bg-success/10" : "bg-destructive/10"}`}>
        <div className="flex items-center justify-center gap-3">
          <div className={`p-2 rounded-xl ${isBenign ? "bg-success/20" : "bg-destructive/20"}`}>
            {isBenign ? (
              <ShieldCheck className="w-7 h-7 text-success" />
            ) : (
              <AlertCircle className="w-7 h-7 text-destructive" />
            )}
          </div>
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            Prediction Result
            <Sparkles className={`w-5 h-5 ${isBenign ? "text-success" : "text-destructive"}`} />
          </h3>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative p-8 space-y-6">
        {/* Classification */}
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Classification</p>
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl ${
            isBenign ? "bg-success/10" : "bg-destructive/10"
          }`}>
            {isBenign ? (
              <CheckCircle className="w-8 h-8 text-success" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-destructive" />
            )}
            <p className={`text-4xl font-extrabold ${isBenign ? "text-success" : "text-destructive"}`}>
              {prediction}
            </p>
          </div>
        </div>
        
        {/* Confidence */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-muted-foreground">Confidence Level</span>
            <span className={`text-2xl font-bold ${isBenign ? "text-success" : "text-destructive"}`}>
              {probabilityPercent}%
            </span>
          </div>
          <div className="relative h-4 rounded-full overflow-hidden bg-muted">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                isBenign 
                  ? "bg-gradient-to-r from-success to-accent" 
                  : "bg-gradient-to-r from-destructive to-warning"
              }`}
              style={{ width: `${probabilityPercent}%` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>
        
        {/* Message */}
        <div className={`p-5 rounded-xl border ${
          isBenign 
            ? "bg-success/5 border-success/20" 
            : "bg-destructive/5 border-destructive/20"
        }`}>
          <p className="text-sm text-center text-foreground/80 leading-relaxed">
            {isBenign 
              ? "The model predicts the tumor is likely benign. Please consult with a medical professional for proper diagnosis."
              : "The model predicts the tumor may be malignant. Please seek immediate medical consultation for proper diagnosis and treatment."
            }
          </p>
        </div>
      </div>
    </div>
  );
};
