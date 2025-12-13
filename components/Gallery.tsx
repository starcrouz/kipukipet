
import React, { useState, useEffect } from 'react';
import SectionTitle from './SectionTitle';
import { galleryImages } from '../constants';

const Gallery: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Changement automatique d'image
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000); // Change toutes les 4 secondes
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="galerie">
      <SectionTitle title="Galerie" subtitle="WAOUU" />
      <div className="max-w-4xl mx-auto px-4">
        {/* Container carré (1:1) pour servir de placeholder uniforme */}
        <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow-2xl bg-black border border-gray-800">
          
          {/* Slider Container */}
          <div 
            className="flex h-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="min-w-full h-full flex items-center justify-center p-2"
              >
                {/* object-contain assure que l'image est vue en entier sans être coupée */}
                <img
                  src={img.src}
                  alt={`Galerie image ${index + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
          
          {/* Indicateurs de position */}
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-amber-400 w-6' : 'bg-white/50 hover:bg-white'
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
