
import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [bgAnimation, setBgAnimation] = useState('');

  useEffect(() => {
    const animationClass = Math.random() > 0.5 ? 'animate-pan-right' : 'animate-pan-left';
    setBgAnimation(animationClass);
  }, []);

  return (
    // pointer-events-none on the section so the background doesn't block clicks (if visible/transparent)
    <section className="h-screen min-h-[600px] flex items-center justify-center relative overflow-hidden pointer-events-none">
      {/* Background Image */}
      <div 
        className={`absolute inset-0 bg-cover bg-no-repeat md:bg-fixed md:bg-center ${bgAnimation} md:animate-none`}
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/-rDC-pEXgsCYN90rs9Ajxvoo5508o3YqBfjqlqQJ6IPU8l-FUV0I1-r5bhqI75MC_DrVKVxNsOKstlRIQQ=s1600')"
        }}
      ></div>

      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Content needs pointer-events-auto to allow text selection */}
      <div className="relative z-10 text-center text-white flex flex-col items-center animate-fade-in w-full px-4 pointer-events-auto">
        <h1 className="font-montserrat text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest uppercase mb-4">
          Koncerts mal barrés
        </h1>
        <img src="https://lh3.googleusercontent.com/t_r2zZwx2HLLzrI9SclgSkQJm6YkZMHfOHb0gLrz8VPHVcvbyAGB_o6aLfL6PrVD-BPHSNTIB3DCWlmZ=s360" alt="Kipukipet Picto" className="h-16 w-16 md:h-24 md:w-24 my-6"/>
        <p className="font-montserrat text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-widest uppercase">
          Kipukipet
        </p>
        <p className="font-codystar mt-4 text-xl sm:text-2xl md:text-4xl lg:text-5xl tracking-wider uppercase font-bold text-white max-w-4xl mx-auto leading-tight">
          Le groupe qui met les gaz
        </p>
        <div className="w-32 md:w-48 h-1 bg-amber-400 mt-8"></div>
      </div>
    </section>
  );
};

export default Hero;
