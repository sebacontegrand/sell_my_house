"use client";

import React from "react";
import Image from "next/image";

const AnimatedBackground = () => {
  const pastelColors = [
    "border-sky-200 bg-sky-50/20",
    "border-rose-200 bg-rose-50/20",
    "border-emerald-200 bg-emerald-50/20",
    "border-amber-200 bg-amber-50/20",
    "border-indigo-200 bg-indigo-50/20",
    "border-violet-200 bg-violet-50/20",
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base Blurred Photo Layer - SIGNIFICANTLY MORE VISIBLE */}
      <div className="absolute inset-0 scale-105">
        <Image 
          src="/background-photo.png" 
          alt="Luxury Interior"
          fill
          className="object-cover blur-[20px] opacity-60 brightness-110"
          unoptimized
        />
      </div>

      {/* Very subtle Gradient Overlay (Increased transparency) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-sky-50/20 via-white/10 to-rose-50/20" />
      
      {/* Subtle Blueprint Pattern Layer */}
      <div className="absolute inset-0 opacity-[0.05] grayscale mix-blend-overlay">
        <Image 
          src="/blueprint-pattern.png" 
          alt="Blueprint Pattern"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Soft Pastel Grid */}
      <div 
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(186, 230, 253, 0.4) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(186, 230, 253, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Drifting Pastel Room Blocks */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute border-2 rounded-2xl animate-drift backdrop-blur-[4px] shadow-sm ${pastelColors[i % pastelColors.length]}`}
            style={{
              width: `${Math.random() * 350 + 150}px`,
              height: `${Math.random() * 250 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * -30}s`,
              animationDuration: `${Math.random() * 40 + 50}s`,
              opacity: 0.5
            }}
          >
             <div className="absolute top-6 left-6 w-8 h-[1.5px] bg-current opacity-30" />
             <div className="absolute top-6 left-6 w-[1.5px] h-8 bg-current opacity-30" />
             <div className="absolute bottom-6 right-6 w-8 h-[0.5px] bg-current opacity-10" />
          </div>
        ))}
      </div>

      {/* Dreamy Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sky-100/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-100/30 blur-[120px] rounded-full" />
    </div>
  );
};

export default AnimatedBackground;
