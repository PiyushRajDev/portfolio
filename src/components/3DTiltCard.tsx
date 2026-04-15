"use client"
import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const TiltCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Using spring physics for ultra-smooth buttery return
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct * 15); // max 15 deg tilt
    y.set(yPct * -15);
    
    setPosition({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: y,
        rotateY: x,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full rounded-2xl group ${className}`}
    >
      {/* Glare/Spotlight Effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-50 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: 1,
            background: `radial-gradient(1000px circle at ${position.x}px ${position.y}px, rgba(16,185,129,0.1), transparent 40%)`,
          }}
        />
      )}

      {/* Glossy sheen reflecting light */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-40 rounded-2xl mix-blend-overlay transition-opacity duration-300"
          style={{
            opacity: 0.5,
            background: `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 25%, transparent 30%)`,
            transform: `translateX(${(position.x / 500) * 100}%)`,
          }}
        />
      )}

      <div
        style={{ transform: "translateZ(30px)" }}
        className="h-full w-full relative z-10"
      >
        {children}
      </div>
    </motion.div>
  );
};
