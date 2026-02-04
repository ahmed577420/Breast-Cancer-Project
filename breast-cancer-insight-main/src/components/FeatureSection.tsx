import { ReactNode } from "react";

interface FeatureSectionProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  colorClass?: string;
}

export const FeatureSection = ({ title, description, icon, children, colorClass = "gradient-card-1" }: FeatureSectionProps) => {
  return (
    <div className="group bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1">
      <div className={`${colorClass} px-6 py-5 border-b border-border/30`}>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-card rounded-xl shadow-sm border border-border/50 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-gradient-to-b from-card to-muted/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {children}
        </div>
      </div>
    </div>
  );
};
