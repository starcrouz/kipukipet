
import React, { useRef, useEffect } from 'react';
import SectionTitle from './SectionTitle';
import { posters } from '../constants';

const Posters: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Duplication massive des posters pour créer un grand buffer à gauche et à droite (x40)
  const infinitePosters = Array(40).fill(posters).flat();

  // Au montage du composant, on place le scroll pile au milieu de la liste
  // Cela permet à l'utilisateur de scroller vers la gauche immédiatement.
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // On calcule la largeur totale et on se met au milieu
      // Moins la moitié de la largeur visible pour être centré
      const middlePos = (container.scrollWidth - container.clientWidth) / 2;
      container.scrollLeft = middlePos;
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; 
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="flyers">
      <SectionTitle title="Flyers" subtitle="Chez qui ?" />
      <div className="relative group">
        
        {/* Flèche d'incitation au scroll pour mobile */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 md:hidden pointer-events-none animate-bounce">
          <svg className="w-10 h-10 text-white drop-shadow-lg opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </div>

        {/* Boutons de navigation Desktop */}
        <button 
            onClick={() => scroll('left')}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -ml-4 lg:-ml-12 z-20 p-2 rounded-full bg-black/50 hover:bg-amber-400 text-white hover:text-black transition-all border border-gray-700"
            aria-label="Scroll left"
        >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        
        <button 
            onClick={() => scroll('right')}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 -mr-4 lg:-mr-12 z-20 p-2 rounded-full bg-black/50 hover:bg-amber-400 text-white hover:text-black transition-all border border-gray-700"
            aria-label="Scroll right"
        >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Masque de dégradé */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none md:hidden"></div>
        
        <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-4 md:space-x-8 pb-8 -mx-4 px-4 scrollbar-hide scroll-smooth"
        >
          {infinitePosters.map((posterUrl, index) => (
            <div key={index} className="flex-shrink-0">
              <img 
                src={posterUrl} 
                alt={`Poster Kipukipet`} 
                className="h-64 md:h-96 w-auto object-cover rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 border border-gray-800" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Posters;
