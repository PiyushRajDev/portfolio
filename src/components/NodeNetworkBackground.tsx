"use client";
import React, { useEffect, useRef } from "react";

export const NodeNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let animationFrameId: number;

    const mouse = { x: width / 2, y: height / 2 };

    // Easing for smooth mouse tracking
    const currentMouse = { x: width / 2, y: height / 2 };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Star {
      x: number;
      y: number;
      z: number;
      pz: number;
      radius: number;
      color: string;

      constructor() {
        this.x = (Math.random() - 0.5) * 2000;
        this.y = (Math.random() - 0.5) * 2000;
        this.z = Math.random() * 2000;
        this.pz = this.z;
        
        // Size variation
        this.radius = Math.random() * 1.5 + 0.5;
        
        // Colors from emerald to teal to zinc
        const rand = Math.random();
        if (rand > 0.8) {
          this.color = "rgba(16, 185, 129, 0.9)"; // emerald primary
        } else if (rand > 0.6) {
          this.color = "rgba(45, 212, 191, 0.7)"; // teal secondary
        } else {
          this.color = "rgba(161, 161, 170, 0.5)"; // deep space zinc
        }
      }

      update(speed: number) {
        this.pz = this.z;
        this.z -= speed;

        if (this.z < 1) {
          this.z = 2000;
          this.pz = 2000;
          this.x = (Math.random() - 0.5) * 2000;
          this.y = (Math.random() - 0.5) * 2000;
        }
      }

      draw() {
        if (!ctx) return;
        
        const fov = 350;
        
        // Perspective projection
        const sx = (this.x / this.z) * fov + width / 2;
        const sy = (this.y / this.z) * fov + height / 2;

        const px = (this.x / this.pz) * fov + width / 2;
        const py = (this.y / this.pz) * fov + height / 2;

        // Interactive mouse camera pan effect
        const dx = (currentMouse.x - width / 2) * 0.05 * (2000 / this.z);
        const dy = (currentMouse.y - height / 2) * 0.05 * (2000 / this.z);

        const drawX = sx - dx;
        const drawY = sy - dy;
        const pDrawX = px - dx;
        const pDrawY = py - dy;

        // Size fading with depth
        const size = this.radius * (fov / this.z);
        const opacity = 1 - this.z / 2000;

        // Draw star trail / motion blur
        ctx.beginPath();
        ctx.moveTo(pDrawX, pDrawY);
        ctx.lineTo(drawX, drawY);
        
        // Hacky way to inject opacity into the pre-computed color string
        ctx.strokeStyle = this.color.replace(/[\d.]+\)$/g, `${opacity})`);
        ctx.lineWidth = size;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    }

    const stars: Star[] = [];
    const starCount = Math.floor((width * height) / 800); // Dense galaxy logic

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    const animate = () => {
      if (!ctx) return;
      
      // Smooth mouse easing
      currentMouse.x += (mouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (mouse.y - currentMouse.y) * 0.05;

      // Dark background with slight trail retention (motion blur)
      ctx.fillStyle = "rgba(9, 9, 11, 0.4)";
      ctx.fillRect(0, 0, width, height);

      // Adaptive warp speed based on horizontal mouse pos (center = slow, edges = fast warp!)
      const speedOffset = Math.abs(currentMouse.x - width / 2) / (width / 2);
      const warpSpeed = 1.5 + (speedOffset * 8);

      stars.forEach((star) => {
        star.update(warpSpeed);
        star.draw();
      });

      // Draw galactic core glow (soft bright center)
      const coreX = width / 2 - (currentMouse.x - width / 2) * 0.02;
      const coreY = height / 2 - (currentMouse.y - height / 2) * 0.02;
      
      const gradient = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, width / 3);
      gradient.addColorStop(0, "rgba(5, 150, 105, 0.08)"); // inner emerald core aura
      gradient.addColorStop(0.5, "rgba(16, 185, 129, 0.02)"); // expanding teal
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.globalCompositeOperation = "screen"; // Additive blending for glow
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over"; // Reset

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
};
