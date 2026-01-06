
import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [bgAnimation, setBgAnimation] = useState('');

  useEffect(() => {
    const animationClass = Math.random() > 0.5 ? 'animate-pan-right' : 'animate-pan-left';
    setBgAnimation(animationClass);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('dates');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="h-screen min-h-[600px] flex items-center justify-center relative overflow-hidden pointer-events-none">
      <div 
        className={`absolute inset-0 bg-cover bg-no-repeat md:bg-fixed md:bg-center ${bgAnimation} md:animate-none`}
        style={{
          backgroundImage: "url('/assets/images/hero-bg.jpg')"
        }}
      ></div>

      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 text-center text-white flex flex-col items-center animate-fade-in w-full px-4 pointer-events-auto">
        <h1 className="font-montserrat text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest uppercase mb-4">
          Koncerts mal barrés
        </h1>
        <img src="/assets/images/hero-picto.png" alt="Kipukipet Picto" className="h-16 w-16 md:h-24 md:w-24 my-6"/>
        <p className="font-montserrat text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-widest uppercase">
          Kipukipet
        </p>
        <p className="font-codystar mt-4 text-xl sm:text-2xl md:text-4xl lg:text-5xl tracking-wider uppercase font-bold text-white max-w-4xl mx-auto leading-tight">
          Le groupe qui met les gaz
        </p>
        <div className="w-32 md:w-48 h-1 bg-amber-400 mt-8"></div>
      </div>

      {/* Flèche vers le bas */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto cursor-pointer" onClick={scrollToNext}>
        <div className="animate-bounce flex flex-col items-center">
            <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7m14-8l-7 7-7-7" />
            </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
