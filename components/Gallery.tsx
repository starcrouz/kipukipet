
import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import { galleryImages } from '../constants';

const Gallery: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const infiniteImages = [...galleryImages, ...galleryImages];

  return (
    <section id="galerie">
      <SectionTitle title="Galerie" subtitle="WAOUU" />
      <div className="w-full overflow-hidden bg-black/50 py-4 border-y border-gray-800">
        <div className="flex animate-marquee w-max">
          {infiniteImages.map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2 md:px-4 flex items-center cursor-pointer"
              onClick={() => setSelectedImg(img.src)}
            >
              <img
                src={img.src}
                alt={`Galerie image ${index}`}
                className="h-64 md:h-96 w-auto rounded-lg shadow-lg object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modale avec effet d'onde (via CSS scale/opacity) */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 animate-fade-in p-4 cursor-zoom-out"
          onClick={() => setSelectedImg(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-amber-400 z-[110]"
            onClick={() => setSelectedImg(null)}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img 
            src={selectedImg} 
            alt="Zoom Galerie" 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-500 scale-95 animate-[wave-in_0.5s_ease-out_forwards]"
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
