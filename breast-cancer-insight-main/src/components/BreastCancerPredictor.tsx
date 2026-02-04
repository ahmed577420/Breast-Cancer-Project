import { useState } from "react";
import { Activity, BarChart3, TrendingUp, Sparkles, RotateCcw, Dna, Heart, Brain, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureInput } from "./FeatureInput";
import { ResultCard } from "./ResultCard";
import { ErrorAlert } from "./ErrorAlert";
import { LoadingSpinner } from "./LoadingSpinner";
import { StepIndicator, STEPS } from "./StepIndicator";

const MEAN_FEATURES = [
  "radius_mean", "texture_mean", "perimeter_mean", "area_mean", "smoothness_mean",
  "compactness_mean", "concavity_mean", "concave points_mean", "symmetry_mean", "fractal_dimension_mean"
];

const SE_FEATURES = [
  "radius_se", "texture_se", "perimeter_se", "area_se", "smoothness_se",
  "compactness_se", "concavity_se", "concave points_se", "symmetry_se", "fractal_dimension_se"
];

const WORST_FEATURES = [
  "radius_worst", "texture_worst", "perimeter_worst", "area_worst", "smoothness_worst",
  "compactness_worst", "concavity_worst", "concave points_worst", "symmetry_worst", "fractal_dimension_worst"
];

interface PredictionResult {
  prediction: string;
  probability: number;
}

const STEP_CONFIG = [
  {
    features: MEAN_FEATURES,
    title: "Mean Values",
    description: "Enter the average measurements of cell nuclei characteristics",
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
    gradient: "gradient-card-1"
  },
  {
    features: SE_FEATURES,
    title: "Standard Error Values",
    description: "Enter the standard error of cell nuclei measurements",
    icon: <Activity className="w-6 h-6 text-accent" />,
    gradient: "gradient-card-2"
  },
  {
    features: WORST_FEATURES,
    title: "Worst Values",
    description: "Enter the mean of the three largest cell nuclei measurements",
    icon: <TrendingUp className="w-6 h-6 text-warning" />,
    gradient: "gradient-card-3"
  }
];

export const BreastCancerPredictor = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validateCurrentStep = () => {
    const currentFeatures = STEP_CONFIG[currentStep - 1].features;
    const missingFields = currentFeatures.filter(f => !formData[f] || formData[f].trim() === "");
    return missingFields.length === 0;
  };

  const validateAllSteps = () => {
    const allFeatures = [...MEAN_FEATURES, ...SE_FEATURES, ...WORST_FEATURES];
    const missingFields = allFeatures.filter(f => !formData[f] || formData[f].trim() === "");
    
    if (missingFields.length > 0) {
      return `Please fill in all fields. Missing: ${missingFields.slice(0, 3).join(", ")}${missingFields.length > 3 ? ` and ${missingFields.length - 3} more` : ""}`;
    }
    return null;
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handlePredict = async () => {
    const validationError = validateAllSteps();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const numericData: Record<string, number> = {};
      Object.entries(formData).forEach(([key, value]) => {
        numericData[key] = parseFloat(value);
      });

      const response = await fetch("https://unoccurring-lennox-augustly.ngrok-free.dev/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(numericData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        setResult(data[0]);
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({});
    setResult(null);
    setError(null);
    setCurrentStep(1);
  };

  const currentConfig = STEP_CONFIG[currentStep - 1];
  const filledCount = currentConfig.features.filter(f => formData[f] && formData[f].trim() !== "").length;
  const totalCount = currentConfig.features.length;

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      {/* Header */}
      <header className="relative gradient-hero text-primary-foreground py-12 px-4 overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-[10%] animate-float opacity-30">
            <Dna className="w-12 h-12" />
          </div>
          <div className="absolute top-20 right-[15%] animate-float-slow opacity-30">
            <Heart className="w-10 h-10" />
          </div>
          <div className="absolute bottom-10 left-[20%] animate-float opacity-20" style={{ animationDelay: '1s' }}>
            <Brain className="w-14 h-14" />
          </div>
          <div className="absolute top-1/2 right-[10%] animate-float-slow opacity-20" style={{ animationDelay: '2s' }}>
            <Sparkles className="w-8 h-8" />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />

        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col items-center gap-4 animate-fade-in-up">
            <div className="p-3 bg-primary-foreground/10 rounded-2xl backdrop-blur-sm border border-primary-foreground/20 shadow-glow animate-pulse-glow">
              <Sparkles className="w-10 h-10" />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Breast Cancer Prediction AI
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/80 max-w-xl mx-auto">
                Analyze tumor characteristics with machine learning
              </p>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 80L48 70C96 60 192 40 288 30C384 20 480 20 576 25C672 30 768 40 864 45C960 50 1056 50 1152 45C1248 40 1344 30 1392 25L1440 20V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-5xl mx-auto px-4 py-6 space-y-6 relative z-10">
        {/* Error Alert */}
        {error && (
          <div className="animate-scale-in">
            <ErrorAlert message={error} onClose={() => setError(null)} />
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div className="animate-scale-in">
            <ResultCard prediction={result.prediction} probability={result.probability} />
          </div>
        )}

        {/* Step Indicator */}
        <div className="bg-card rounded-2xl shadow-card border border-border/50 p-4">
          <StepIndicator 
            currentStep={currentStep} 
            steps={STEPS} 
            onStepClick={setCurrentStep}
          />
        </div>

        {/* Current Step Content */}
        <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden animate-fade-in-up" key={currentStep}>
          {/* Step Header */}
          <div className={`${currentConfig.gradient} px-6 py-5 border-b border-border/30`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-card rounded-xl shadow-sm border border-border/50">
                  {currentConfig.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{currentConfig.title}</h2>
                  <p className="text-sm text-muted-foreground">{currentConfig.description}</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-card/80 px-4 py-2 rounded-xl">
                <span className="text-sm text-muted-foreground">Progress:</span>
                <span className="font-bold text-primary">{filledCount}/{totalCount}</span>
              </div>
            </div>
          </div>

          {/* Step Fields */}
          <div className="p-6 bg-gradient-to-b from-card to-muted/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {currentConfig.features.map(feature => (
                <FeatureInput
                  key={feature}
                  label={feature}
                  name={feature}
                  value={formData[feature] || ""}
                  onChange={handleInputChange}
                />
              ))}
            </div>
          </div>

          {/* Step Navigation */}
          <div className="px-6 py-4 bg-muted/30 border-t border-border/30">
            <div className="flex items-center justify-between">
              <Button
                onClick={handlePrevious}
                variant="outline"
                disabled={currentStep === 1}
                className="rounded-xl"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Step {currentStep} of 3
                </span>
              </div>

              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  className="gradient-hero text-primary-foreground rounded-xl"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={handlePredict}
                  disabled={isLoading}
                  className="gradient-hero text-primary-foreground rounded-xl shadow-glow"
                >
                  {isLoading ? <LoadingSpinner /> : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Predict
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleReset}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset All Data
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 glass border-t border-border/50 mt-12 py-8">
        <div className="container max-w-6xl mx-auto px-4 text-center space-y-2">
          <p className="text-foreground font-medium">
            Developed with <Heart className="w-4 h-4 inline-block text-destructive mx-1 animate-pulse" /> by{" "}
            <span className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Ahmed Essam
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            This tool is for educational purposes only. Always consult a medical professional for diagnosis.
          </p>
        </div>
      </footer>
    </div>
  );
};
