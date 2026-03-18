import React from "react";
import { cn } from "@/lib/utils";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full py-4 px-2">
      <div className="flex items-center justify-between relative max-w-sm mx-auto">
        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;
          
          return (
            <React.Fragment key={i}>
              {/* Step Circle */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2",
                    isCompleted
                      ? "bg-slate-900 border-slate-900 text-white"
                      : isCurrent
                      ? "bg-white border-slate-900 text-slate-900 shadow-premium"
                      : "bg-white border-slate-200 text-slate-400"
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                {/* Optional Label (hidden on small mobile if needed, but keeping it minimalist) */}
                <span className={cn(
                    "absolute -bottom-6 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-300",
                    isCurrent ? "text-slate-900" : "text-slate-400"
                )}>
                  {step}
                </span>
              </div>

              {/* Connector Line */}
              {i < steps.length - 1 && (
                <div className="flex-1 h-[2px] mx-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full bg-slate-900 transition-all duration-500 ease-in-out",
                      i < currentStep ? "w-full" : "w-0"
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
