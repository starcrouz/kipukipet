
import React from 'react';
import SectionTitle from './SectionTitle';
import { galleryImages } from '../constants';

const Gallery: React.FC = () => {
  // Dupliquer les images pour assurer une boucle fluide sans coupure
  const infiniteImages = [...galleryImages, ...galleryImages];

  return (
    <section id="galerie">
      <SectionTitle title="Galerie" subtitle="WAOUU" />
      <div className="w-full overflow-hidden bg-black/50 py-4 border-y border-gray-800">
        <div 
          className="flex animate-marquee w-max"
        >
          {infiniteImages.map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2 md:px-4 flex items-center"
            >
              <img
                src={img.src}
                alt={`Galerie image ${index}`}
                // Hauteur fixe, largeur auto pour conserver les ratios
                className="h-64 md:h-96 w-auto rounded-lg shadow-lg border border-gray-700 object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
