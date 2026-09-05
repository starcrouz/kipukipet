
import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import { galleryImages } from '../constants';
import ImageModal from './ImageModal';

const Gallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const infiniteImages = [...galleryImages, ...galleryImages];
  const galleryUrls = galleryImages.map((img) => img.src);

  return (
    <section id="galerie">
      <SectionTitle title="Galerie" subtitle="WAOUU" />
      <div className="w-full overflow-hidden bg-black/50 py-4 border-y border-gray-800">
        <div className="flex animate-marquee w-max">
          {infiniteImages.map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2 md:px-4 flex items-center cursor-pointer"
              onClick={() => setSelectedIndex(index % galleryImages.length)}
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

      <ImageModal
        images={galleryUrls}
        currentIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNavigate={(newIndex) => setSelectedIndex(newIndex)}
        altPrefix="Photo Galerie"
      />
    </section>
  );
};

export default Gallery;
