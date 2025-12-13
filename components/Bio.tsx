
import React, { useState } from 'react';
import SectionTitle from './SectionTitle';

const Bio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="bio">
      <SectionTitle title="Bio" subtitle="AU DÉBUT..." />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
        <div className="md:col-span-2 text-lg text-gray-300 leading-relaxed space-y-4 px-4 md:px-0">
            <p>
                Trio acoustique de chansons déglinguées, Kipukipet est né sur un balcon du 13ème arrondissement de Paris quand Steph a proposé à Ricet de jouer Boys boys boys à l'accordéon et au Ukulélé. 
            </p>
            <p>
                Puis Sonia les a enchantés de sa flûte magique... Et leurs covers eurent beaucoup d'enfants !
            </p>
        </div>
        
        {/* Style exact match with Music.tsx */}
        <div className="md:col-span-1 aspect-w-16 aspect-h-9 rounded-lg shadow-lg relative group border border-gray-800 bg-black p-2">
          <div className="w-full h-full overflow-hidden rounded relative">
             {isPlaying ? (
               <iframe
               width="100%"
               height="100%"
               src="https://www.youtube.com/embed/U3tsXwTQ-d0?autoplay=1&rel=0"
               title="Kipukipet Bio Video"
               frameBorder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
               className="w-full h-full"
             ></iframe>
             ) : (
                <div 
                    className="cursor-pointer w-full h-full relative"
                    onClick={() => setIsPlaying(true)}
                >
                    <img 
                        src="https://img.youtube.com/vi/U3tsXwTQ-d0/hqdefault.jpg" 
                        alt="Bio Video Thumbnail"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <svg className="w-16 h-16 text-white/80 group-hover:text-white transition-all duration-300 transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                    </div>
                </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bio;
