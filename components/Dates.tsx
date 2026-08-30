import React, { useRef, useState, useEffect } from 'react';
import SectionTitle from './SectionTitle';
import { concerts } from '../constants';

const Dates: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const cards = Array.from(container.children) as HTMLElement[];
      
      let closestIndex = 0;
      let minDistance = Infinity;

      cards.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft - container.offsetLeft - scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.children[index] as HTMLElement;
      if (card) {
        container.scrollTo({
          left: card.offsetLeft - container.offsetLeft,
          behavior: 'smooth',
        });
        setActiveIndex(index);
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth || 300;
      const gap = 20;
      const scrollAmount = cardWidth + gap;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateActiveIndex, 50);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section id="dates">
      <SectionTitle title="Nos Dates" subtitle="KONCERTS" />
      <p className="text-center text-gray-400 -mt-10 mb-12 max-w-md mx-auto">
        Nos concerts à venir et une sélection de nos concerts passés
      </p>

      <div className="relative group">
        {/* Navigation arrows (desktop & tablet) */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -ml-4 lg:-ml-6 z-20 p-2.5 rounded-full bg-black/80 hover:bg-amber-400 text-white hover:text-black transition-all border border-gray-700 shadow-xl items-center justify-center cursor-pointer"
          aria-label="Concert précédent"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -mr-4 lg:-mr-6 z-20 p-2.5 rounded-full bg-black/80 hover:bg-amber-400 text-white hover:text-black transition-all border border-gray-700 shadow-xl items-center justify-center cursor-pointer"
          aria-label="Concert suivant"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scrollable Container with Snap */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {concerts.map((concert, index) => (
            <div
              key={index}
              className="group/card relative overflow-hidden rounded-lg shadow-lg aspect-[4/3] flex-shrink-0 w-[82%] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start border border-gray-800/80"
            >
              <img
                src={concert.imageUrl}
                alt={concert.title}
                className="w-full h-full object-cover transition-all duration-500 grayscale group-hover/card:grayscale-0 group-hover/card:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 group-hover/card:bg-black/75 transition-colors"></div>
              <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end">
                <h3 className="font-montserrat text-xl lg:text-2xl font-bold text-white group-hover/card:text-amber-400 transition-colors">
                  {concert.date}
                </h3>
                <p className="text-md lg:text-lg mt-1 font-semibold text-gray-100">{concert.title}</p>
                <p className="text-sm lg:text-base text-gray-300">{concert.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Système de puces (Bullets pagination) */}
        <div className="flex justify-center items-center gap-2.5 mt-6">
          {concerts.map((concert, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === index
                  ? 'w-8 bg-amber-400 shadow-md shadow-amber-400/50'
                  : 'w-2.5 bg-neutral-700 hover:bg-neutral-500'
              }`}
              aria-label={`Aller au concert du ${concert.date} - ${concert.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dates;
