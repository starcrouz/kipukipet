
import React, { useRef, useEffect, useState } from 'react';
import SectionTitle from './SectionTitle';
import { posters } from '../constants';

const Posters: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

  const infinitePosters = Array(40).fill(posters).flat();

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
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
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 md:hidden pointer-events-none animate-bounce">
          <svg className="w-10 h-10 text-white drop-shadow-lg opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </div>

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

        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none md:hidden"></div>
        
        <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-4 md:space-x-8 pb-8 -mx-4 px-4 scrollbar-hide scroll-smooth"
        >
          {infinitePosters.map((posterUrl, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 cursor-pointer"
              onClick={() => setSelectedPoster(posterUrl)}
            >
              <img 
                src={posterUrl} 
                alt={`Poster Kipukipet`} 
                className="h-64 md:h-96 w-auto object-cover rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 border border-gray-800" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modale avec effet d'onde */}
      {selectedPoster && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 animate-fade-in p-4 cursor-zoom-out"
          onClick={() => setSelectedPoster(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-amber-400 z-[110]"
            onClick={() => setSelectedPoster(null)}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img 
            src={selectedPoster} 
            alt="Zoom Flyer" 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-500 scale-95 animate-[wave-in_0.5s_ease-out_forwards]"
          />
        </div>
      )}
    </section>
  );
};

export default Posters;
