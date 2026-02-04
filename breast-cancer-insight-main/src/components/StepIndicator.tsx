import { Check, BarChart3, Activity, TrendingUp } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
  onStepClick: (step: number) => void;
}

export const StepIndicator = ({ currentStep, steps, onStepClick }: StepIndicatorProps) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-muted rounded-full mx-16">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          
          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className="flex flex-col items-center relative z-10 group"
            >
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border-2
                ${isCompleted 
                  ? "bg-gradient-to-br from-primary to-secondary border-primary text-primary-foreground shadow-glow" 
                  : isCurrent 
                    ? "bg-card border-primary text-primary shadow-card-hover scale-110" 
                    : "bg-card border-border text-muted-foreground hover:border-primary/50"
                }
              `}>
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.icon
                )}
              </div>
              <div className="mt-3 text-center">
                <p className={`text-sm font-bold transition-colors ${
                  isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground hidden sm:block mt-0.5">
                  {step.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const STEPS: Step[] = [
  {
    id: 1,
    title: "Mean Values",
    description: "Average measurements",
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    id: 2,
    title: "Standard Error",
    description: "SE measurements",
    icon: <Activity className="w-5 h-5" />
  },
  {
    id: 3,
    title: "Worst Values",
    description: "Largest measurements",
    icon: <TrendingUp className="w-5 h-5" />
  }
];
