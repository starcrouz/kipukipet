import React, { useRef, useEffect, useState, useCallback } from 'react';
import SectionTitle from './SectionTitle';
import { posters } from '../constants';
import ImageModal from './ImageModal';

const Posters: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollLimits = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    // S'assurer que le carrousel commence tout à gauche avec l'affiche la plus récente
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      checkScrollLimits();
    }
  }, [checkScrollLimits]);

  useEffect(() => {
    const handleResize = () => checkScrollLimits();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkScrollLimits]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; 
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      // Mettre à jour après l'animation de défilement
      setTimeout(checkScrollLimits, 350);
    }
  };

  return (
    <section id="affiches">
      <SectionTitle title="Affiches" subtitle="Chez qui ?" />
      <div className="relative group">
        
        {/* Indicateur de défilement sur mobile */}
        {canScrollRight && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 md:hidden pointer-events-none animate-bounce">
            <svg className="w-10 h-10 text-white drop-shadow-lg opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </div>
        )}

        {/* Bouton Gauche (actif seulement quand on a défilé vers la droite) */}
        <button 
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -ml-4 lg:-ml-12 z-20 p-2 rounded-full border border-gray-700 transition-all duration-300 ${
            canScrollLeft
              ? 'bg-black/70 hover:bg-amber-400 text-white hover:text-black cursor-pointer shadow-lg hover:scale-110 active:scale-95'
              : 'bg-black/30 text-gray-600 opacity-40 cursor-not-allowed'
          }`}
          aria-label="Défiler vers la gauche"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Bouton Droite */}
        <button 
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`hidden md:block absolute right-0 top-1/2 -translate-y-1/2 -mr-4 lg:-mr-12 z-20 p-2 rounded-full border border-gray-700 transition-all duration-300 ${
            canScrollRight
              ? 'bg-black/70 hover:bg-amber-400 text-white hover:text-black cursor-pointer shadow-lg hover:scale-110 active:scale-95'
              : 'bg-black/30 text-gray-600 opacity-40 cursor-not-allowed'
          }`}
          aria-label="Défiler vers la droite"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none md:hidden"></div>
        
        {/* Conteneur défilant contenant les affiches triées de la plus récente (gauche) à la plus ancienne (droite) */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScrollLimits}
          className="flex overflow-x-auto space-x-4 md:space-x-8 pb-8 -mx-4 px-4 scrollbar-hide scroll-smooth"
        >
          {posters.map((posterUrl, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              <img 
                src={posterUrl} 
                alt={`Affiche Kipukipet ${index + 1}`} 
                className="h-64 md:h-96 w-auto object-cover rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 border border-gray-800" 
              />
            </div>
          ))}
        </div>
      </div>

      <ImageModal
        images={posters}
        currentIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNavigate={(newIndex) => setSelectedIndex(newIndex)}
        altPrefix="Affiche Kipukipet"
      />
    </section>
  );
};

export default Posters;
