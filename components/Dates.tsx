import React, { useState, useRef, useEffect, useCallback } from 'react';
import SectionTitle from './SectionTitle';
import { concerts } from '../constants';

const isUpcoming = (dateStr: string): boolean => {
  const parts = dateStr.split('.');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const concertDate = new Date(year, month, day, 23, 59, 59, 999);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return concertDate.getTime() >= today.getTime();
  }
  return false;
};

const VISIBLE_COUNT_DESKTOP = 5;

const Dates: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalConcerts = concerts.length;

  // Détection mobile (< 640px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextConcert = useCallback(() => {
    setActiveIndex((prev) => (prev < totalConcerts - 1 ? prev + 1 : prev));
  }, [totalConcerts]);

  const prevConcert = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Fenêtre de cartes visibles sur Desktop
  const maxStart = Math.max(0, totalConcerts - VISIBLE_COUNT_DESKTOP);
  const rawStart = activeIndex - Math.floor(VISIBLE_COUNT_DESKTOP / 2);
  const windowStart = Math.max(0, Math.min(maxStart, rawStart));

  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextConcert();
      if (e.key === 'ArrowLeft') prevConcert();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextConcert, prevConcert]);

  // Swipe tactile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 40) nextConcert();
    if (distance < -40) prevConcert();
  };

  return (
    <section id="dates" className="select-none overflow-hidden">
      <SectionTitle title="Nos Dates" subtitle="KONCERTS" />
      <p className="text-center text-gray-400 -mt-10 mb-8 max-w-md mx-auto px-4">
        Nos concerts à venir et une sélection de nos concerts passés
      </p>

      {/* Conteneur Éventail */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-6xl mx-auto h-[390px] sm:h-[460px] md:h-[520px] flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Flèche Gauche (z-[60] pour rester toujours au-dessus des cartes sur mobile) */}
        <button
          onClick={prevConcert}
          disabled={activeIndex === 0}
          className={`absolute left-1.5 sm:left-3 md:left-6 z-[60] p-2.5 sm:p-3 rounded-full bg-black/90 backdrop-blur-md border border-neutral-600 shadow-2xl transition-all duration-300 ${
            activeIndex === 0
              ? 'opacity-40 text-neutral-500 cursor-not-allowed'
              : 'hover:bg-amber-400 hover:text-black text-white hover:scale-110 active:scale-95 cursor-pointer shadow-amber-400/20'
          }`}
          aria-label="Concert plus récent"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Flèche Droite */}
        <button
          onClick={nextConcert}
          disabled={activeIndex === totalConcerts - 1}
          className={`absolute right-1.5 sm:right-3 md:right-6 z-[60] p-2.5 sm:p-3 rounded-full bg-black/90 backdrop-blur-md border border-neutral-600 shadow-2xl transition-all duration-300 ${
            activeIndex === totalConcerts - 1
              ? 'opacity-40 text-neutral-500 cursor-not-allowed'
              : 'hover:bg-amber-400 hover:text-black text-white hover:scale-110 active:scale-95 cursor-pointer shadow-amber-400/20'
          }`}
          aria-label="Concert plus ancien"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Cartes */}
        <div className="relative w-full h-full flex items-center justify-center">
          {concerts.map((concert, index) => {
            const isActive = activeIndex === index;
            const isHovered = hoveredIndex === index;
            const upcoming = isUpcoming(concert.date);

            let isVisible = false;
            let rotationDeg = 0;
            let liftY = 0;
            let translateX = '0px';
            let cardScale = 1;
            let zIndex = 30;
            let cardOpacity = 1;

            if (isMobile) {
              // Mode Mobile : la carte active est toujours au CENTRE (0°), droite et bien lisible
              const diff = index - activeIndex;
              isVisible = Math.abs(diff) <= 2;
              if (!isVisible) return null;

              rotationDeg = diff * 7.5; // cartes de gauche inclinées à gauche, centre 0°, droite à droite
              const baseTranslateY = Math.abs(diff) * 12;
              liftY = isActive ? baseTranslateY - 14 : isHovered ? baseTranslateY - 8 : baseTranslateY;
              translateX = `calc(${diff} * 46px)`;
              cardScale = isActive ? 1.05 : Math.max(0.85, 1 - Math.abs(diff) * 0.08);
              zIndex = isActive ? 50 : isHovered ? 45 : 30 - Math.abs(diff);
              cardOpacity = Math.max(0.65, 1 - Math.abs(diff) * 0.18);
            } else {
              // Mode Desktop : éventail complet de 5 cartes symétriques
              const slotIndex = index - windowStart;
              isVisible = slotIndex >= 0 && slotIndex < VISIBLE_COUNT_DESKTOP;
              if (!isVisible) return null;

              const pos = slotIndex - Math.floor(VISIBLE_COUNT_DESKTOP / 2);
              rotationDeg = pos * 6.5;
              const baseTranslateY = Math.abs(pos) * 14;
              liftY = isActive ? baseTranslateY - 24 : isHovered ? baseTranslateY - 14 : baseTranslateY;
              translateX = `calc(${pos} * clamp(65px, 11vw, 135px))`;
              cardScale = isActive ? 1.08 : isHovered ? 1.02 : Math.max(0.88, 1 - Math.abs(pos) * 0.04);
              zIndex = isActive ? 50 : isHovered ? 45 : 30 - Math.abs(pos);
              cardOpacity = Math.max(0.7, 1 - Math.abs(pos) * 0.08);
            }

            return (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  transformOrigin: '50% 120%',
                  transform: `
                    translateX(${translateX})
                    translateY(${liftY}px)
                    rotate(${rotationDeg}deg)
                    scale(${cardScale})
                  `,
                  zIndex,
                  opacity: cardOpacity,
                }}
                className={`absolute w-[220px] sm:w-[285px] md:w-[325px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-out cursor-pointer group/card border ${
                  isActive
                    ? 'border-amber-400 ring-4 ring-amber-400/35 shadow-[0_20px_50px_rgba(251,191,36,0.25)]'
                    : isHovered
                    ? 'border-amber-400/70 shadow-xl'
                    : 'border-neutral-700/80 hover:border-neutral-500 shadow-black/80'
                }`}
              >
                {/* Image de fond : Couleur pour concert à venir ou si survolé, sinon Noir & Blanc */}
                <img
                  src={concert.imageUrl}
                  alt={concert.title}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    upcoming || isHovered
                      ? 'grayscale-0'
                      : 'grayscale'
                  } ${isActive ? 'scale-105' : 'group-hover/card:scale-110'}`}
                />

                {/* Voile sombre léger pour garantir la lisibilité des textes */}
                <div
                  className={`absolute inset-0 transition-colors duration-300 ${
                    upcoming
                      ? 'bg-gradient-to-t from-black/85 via-black/35 to-black/10'
                      : isHovered
                      ? 'bg-gradient-to-t from-black/80 via-black/25 to-black/5'
                      : 'bg-gradient-to-t from-black/85 via-black/45 to-black/20'
                  }`}
                />

                {/* Badge "À VENIR" pour les dates futures */}
                {upcoming && (
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10">
                    <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[10px] sm:text-xs font-extrabold bg-amber-400 text-black shadow-lg">
                      À VENIR
                    </span>
                  </div>
                )}

                {/* Textes de la carte */}
                <div className="absolute inset-0 p-3.5 sm:p-5 flex flex-col justify-end">
                  <h3
                    className={`font-montserrat text-base sm:text-2xl font-bold tracking-tight drop-shadow-md transition-colors ${
                      upcoming || isActive ? 'text-amber-400' : 'text-white'
                    }`}
                  >
                    {concert.date}
                  </h3>
                  <p className="text-xs sm:text-base font-bold text-gray-100 mt-0.5 line-clamp-1 drop-shadow">
                    {concert.title}
                  </p>
                  <p className="text-[11px] sm:text-sm text-gray-300 line-clamp-1 drop-shadow">
                    {concert.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Système de puces (Bullets Navigation) */}
      <div className="flex flex-wrap justify-center items-center gap-2 max-w-xl mx-auto mt-5 sm:mt-6 px-4">
        {concerts.map((concert, index) => {
          const isActive = activeIndex === index;
          const upcoming = isUpcoming(concert.date);
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'w-8 bg-amber-400 shadow-md shadow-amber-400/50'
                  : upcoming
                  ? 'w-2.5 bg-amber-400/50 hover:bg-amber-400'
                  : 'w-2.5 bg-neutral-700 hover:bg-neutral-500'
              }`}
              aria-label={`Aller au concert du ${concert.date} - ${concert.title}`}
              title={`${concert.date} - ${concert.title} (${concert.location})`}
            />
          );
        })}
      </div>

      {/* Compteur et indication */}
      <div className="text-center mt-3 text-xs sm:text-sm text-gray-400 px-4">
        <span className="text-amber-400 font-semibold">{activeIndex + 1}</span> / {totalConcerts} concerts &bull; Glissez ou utilisez les flèches
      </div>
    </section>
  );
};

export default Dates;
