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

const VISIBLE_COUNT = 5; // Nombre de cartes visibles dans l'éventail

const Dates: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalConcerts = concerts.length;

  const nextConcert = useCallback(() => {
    setActiveIndex((prev) => (prev < totalConcerts - 1 ? prev + 1 : prev));
  }, [totalConcerts]);

  const prevConcert = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Fenêtre de 5 cartes visibles : calcul du début de fenêtre
  const maxStart = Math.max(0, totalConcerts - VISIBLE_COUNT);
  const rawStart = activeIndex - Math.floor(VISIBLE_COUNT / 2);
  const windowStart = Math.max(0, Math.min(maxStart, rawStart));

  // Navigation au clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextConcert();
      if (e.key === 'ArrowLeft') prevConcert();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextConcert, prevConcert]);

  // Gestion du swipe tactile
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
    if (distance > 50) nextConcert();
    if (distance < -50) prevConcert();
  };

  return (
    <section id="dates" className="select-none overflow-hidden">
      <SectionTitle title="Nos Dates" subtitle="KONCERTS" />
      <p className="text-center text-gray-400 -mt-10 mb-8 max-w-md mx-auto px-4">
        Nos concerts à venir et une sélection de nos concerts passés
      </p>

      {/* Éventail 3D Container (Main de cartes symétrique) */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-6xl mx-auto h-[420px] sm:h-[480px] md:h-[530px] flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Flèche Gauche (Concerts plus récents) */}
        <button
          onClick={prevConcert}
          disabled={activeIndex === 0}
          className={`absolute left-0 sm:left-2 md:left-6 z-50 p-3 rounded-full bg-black/85 border border-gray-700 shadow-2xl transition-all duration-300 ${
            activeIndex === 0
              ? 'opacity-20 cursor-not-allowed text-gray-600'
              : 'hover:bg-amber-400 hover:text-black text-white hover:scale-110 cursor-pointer shadow-amber-400/20'
          }`}
          aria-label="Concert plus récent"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Navigation Flèche Droite (Concerts plus anciens) */}
        <button
          onClick={nextConcert}
          disabled={activeIndex === totalConcerts - 1}
          className={`absolute right-0 sm:right-2 md:right-6 z-50 p-3 rounded-full bg-black/85 border border-gray-700 shadow-2xl transition-all duration-300 ${
            activeIndex === totalConcerts - 1
              ? 'opacity-20 cursor-not-allowed text-gray-600'
              : 'hover:bg-amber-400 hover:text-black text-white hover:scale-110 cursor-pointer shadow-amber-400/20'
          }`}
          aria-label="Concert plus ancien"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Cartes en éventail symétrique */}
        <div className="relative w-full h-full flex items-center justify-center">
          {concerts.map((concert, index) => {
            // Position dans la fenêtre visible (de 0 à 4)
            const slotIndex = index - windowStart;
            const isVisible = slotIndex >= 0 && slotIndex < VISIBLE_COUNT;
            
            // Position relative par rapport au centre de l'éventail (-2, -1, 0, 1, 2)
            const pos = slotIndex - Math.floor(VISIBLE_COUNT / 2);
            
            const isActive = activeIndex === index;
            const isHovered = hoveredIndex === index;
            const upcoming = isUpcoming(concert.date);

            if (!isVisible) return null;

            // Angles symétriques : gauche négatif (-13°, -6.5°), centre 0°, droite positif (+6.5°, +13°)
            const rotationDeg = pos * 6.5;
            const baseTranslateY = Math.abs(pos) * 14;
            const liftY = isActive ? baseTranslateY - 24 : isHovered ? baseTranslateY - 14 : baseTranslateY;

            return (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  transformOrigin: '50% 120%',
                  transform: `
                    translateX(calc(${pos} * clamp(58px, 11vw, 135px)))
                    translateY(${liftY}px)
                    rotate(${rotationDeg}deg)
                    scale(${isActive ? 1.08 : isHovered ? 1.02 : Math.max(0.88, 1 - Math.abs(pos) * 0.04)})
                  `,
                  zIndex: isActive ? 50 : isHovered ? 45 : 30 - Math.abs(pos),
                  opacity: Math.max(0.7, 1 - Math.abs(pos) * 0.08),
                }}
                className={`absolute w-[240px] sm:w-[285px] md:w-[325px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-out cursor-pointer group/card border ${
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
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-400 text-black shadow-lg">
                      À VENIR
                    </span>
                  </div>
                )}

                {/* Textes de la carte */}
                <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end">
                  <h3
                    className={`font-montserrat text-lg sm:text-2xl font-bold tracking-tight drop-shadow-md transition-colors ${
                      upcoming || isActive ? 'text-amber-400' : 'text-white'
                    }`}
                  >
                    {concert.date}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-gray-100 mt-0.5 line-clamp-1 drop-shadow">
                    {concert.title}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300 line-clamp-1 drop-shadow">
                    {concert.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Système de puces (Bullets Navigation) */}
      <div className="flex flex-wrap justify-center items-center gap-2 max-w-xl mx-auto mt-6 px-4">
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
      <div className="text-center mt-3 text-xs sm:text-sm text-gray-400">
        <span className="text-amber-400 font-semibold">{activeIndex + 1}</span> / {totalConcerts} concerts &bull; Cliquez sur une carte ou naviguez avec les flèches
      </div>
    </section>
  );
};

export default Dates;
