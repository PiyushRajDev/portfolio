"use client";
import React, { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:<>?/";

export const ScrambleText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let scrambleInterval: NodeJS.Timeout;
    
    timeout = setTimeout(() => {
      let iteration = 0;

      scrambleInterval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (letter === " ") return " ";
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(scrambleInterval);
          setIsScrambling(false);
        }

        iteration += 1 / 2; // Controls speed of settling (higher = faster)
      }, 30);

    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(scrambleInterval);
    };
  }, [text, delay]);

  // Initially show spaces so layout doesn't jump
  const initialText = text.replace(/./g, "\u00A0");

  return (
    <span className={`${className} ${isScrambling ? "font-mono font-bold tracking-tight text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" : ""}`}>
      {displayText || initialText}
    </span>
  );
};
