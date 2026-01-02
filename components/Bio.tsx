
import React, { useEffect, useState, useRef } from 'react';
import SectionTitle from './SectionTitle';

const Bio: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const handleScroll = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      // Calcul d'un décalage basé sur la position de la section
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setOffsetY((window.innerHeight - rect.top) * 0.1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="bio" ref={sectionRef} className="relative overflow-hidden py-12">
      <SectionTitle title="Bio" subtitle="AU DÉBUT..." />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center relative z-10">
        <div className="md:col-span-2 text-xl font-special-elite text-gray-200 leading-relaxed space-y-6 px-4 md:px-0 bg-black/40 p-6 rounded-lg backdrop-blur-sm border-l-4 border-amber-400">
            <p>
                Trio acoustique de chansons déglinguées, Kipukipet est né sur un balcon du 13ème arrondissement de Paris quand Steph a proposé à Ricet de jouer <span className="text-amber-400 italic">"Boys boys boys"</span> à l'accordéon et au Ukulélé. 
            </p>
            <p className="pl-6 border-l border-gray-700">
                Puis Sonia les a enchantés de sa flûte magique... Et leurs covers eurent beaucoup d'enfants !
            </p>
        </div>
        
        <div 
          className="md:col-span-1 w-full max-w-sm md:max-w-full mx-auto relative group"
          style={{ transform: `translateY(-${offsetY}px)` }} // Effet Parallaxe
        >
          {/* Conteneur avec effet "Vieux Film" */}
          <div className="relative rounded-lg overflow-hidden shadow-[0_0_50px_rgba(251,191,36,0.2)] bg-black transform rotate-2 hover:rotate-0 transition-all duration-700">
            
            {/* Vignette pour effet vieilli */}
            <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,1)]"></div>
            
            {/* Calque de bruit statique léger */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            {/* Iframe Vidéo avec filtres */}
            <div className="w-full aspect-video relative">
               <iframe
               src="https://www.youtube.com/embed/U3tsXwTQ-d0?autoplay=1&mute=1&loop=1&playlist=U3tsXwTQ-d0&controls=0&rel=0&modestbranding=1&disablekb=1&fs=0"
               title="Kipukipet Bio Video"
               frameBorder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               className="absolute inset-0 w-full h-full object-cover pointer-events-none grayscale contrast-150 sepia-[0.5] brightness-75 scale-110"
             ></iframe>
            </div>
          </div>
          
          {/* Décoration style collage sous la vidéo */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-400 -z-10 rounded-full mix-blend-difference opacity-50"></div>
        </div>
      </div>
      
      {/* Background text mask style (décoratif) */}
      <div className="absolute top-1/2 left-0 w-full text-[15rem] font-bangers text-white/[0.03] select-none pointer-events-none -translate-y-1/2 whitespace-nowrap overflow-hidden">
        KIPUKIPET KIPUKIPET KIPUKIPET
      </div>
    </section>
  );
};

export default Bio;
