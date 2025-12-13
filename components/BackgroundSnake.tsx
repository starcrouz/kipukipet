
import React, { useRef, useEffect } from 'react';

interface BackgroundSnakeProps {
  onShake?: () => void;
}

const BackgroundSnake: React.FC<BackgroundSnakeProps> = ({ onShake }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      time += 0.005; // Vitesse douce
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.lineWidth = 15;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.strokeStyle = '#fbbf24'; 

      ctx.beginPath();

      const points = 200; 
      
      for (let i = -20; i <= points + 20; i++) {
        const t = i / points;
        
        // Mouvement linéaire horizontal simple
        const x = t * canvas.width;
        
        // Mouvement vertical : superposition d'ondes douces
        const yBase = canvas.height / 2;
        const wave1 = Math.sin(t * 6 + time) * 100;
        const wave2 = Math.cos(t * 15 + time * 0.5) * 30;
        
        const y = yBase + wave1 + wave2;

        if (i === -20) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      onClick={onShake}
      className="fixed top-0 left-0 w-full h-full pointer-events-auto cursor-pointer"
      title="Cliquez pour faire trembler la page !"
    />
  );
};

export default BackgroundSnake;
