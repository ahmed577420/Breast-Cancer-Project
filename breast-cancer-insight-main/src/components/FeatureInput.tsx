import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FeatureInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
}

export const FeatureInput = ({ label, name, value, onChange, placeholder }: FeatureInputProps) => {
  const formatLabel = (label: string) => {
    return label
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="group space-y-2">
      <Label 
        htmlFor={name} 
        className="text-xs font-semibold text-muted-foreground uppercase tracking-wide group-focus-within:text-primary transition-colors duration-200"
      >
        {formatLabel(label)}
      </Label>
      <Input
        id={name}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          if (val === "" || /^-?\d*\.?\d*$/.test(val)) {
            onChange(name, val);
          }
        }}
        placeholder={placeholder || "0.0"}
        className="h-12 bg-background/80 border-border/60 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all duration-300 font-medium placeholder:text-muted-foreground/50"
      />
    </div>
  );
};
