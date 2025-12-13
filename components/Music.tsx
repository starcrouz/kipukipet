
import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from './SectionTitle';

const videos = [
  { id: 'pVD5OV8WBLg', title: 'Whisperz (mix Misirlou & Zobi la mouche)' },
  { id: '2M82MegNOI4', title: 'Poupée (Serge Gainsbourg)' },
  { id: 'c82HESiOTEU', title: 'Dominique (Soeur Sourire)' },
  { id: 'I1-av8K1D_g', title: 'au Bomby\'s Café' },
  { id: 'jucwIbsIQaI', title: 'Zug (17 hippies/ The Clash)' },
  { id: 'XzS8aI3620c', title: 'Toxic (Britney Spears)' },
  { id: '6oPgle7nk0M', title: 'Mix' }
];

const Music: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      // Ne change pas automatiquement si la vidéo est en cours de lecture
      if (!isPlaying) {
        setCurrentIndex(prevIndex => (prevIndex + 1) % videos.length);
      }
    }, 5000);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const handleVideoSelect = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false); // Reset player to thumbnail when changing video
    startInterval(); 
  };

  return (
    <section id="musique">
      <SectionTitle title="Notre Musique" subtitle="YEAH" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Colonne Vidéo */}
        <div className="md:col-span-2 aspect-w-16 aspect-h-9 rounded-lg shadow-2xl relative group border border-gray-800 bg-black p-2">
          <div className="w-full h-full overflow-hidden rounded relative">
            {isPlaying ? (
               <iframe
               width="100%"
               height="100%"
               src={`https://www.youtube.com/embed/${videos[currentIndex].id}?autoplay=1&rel=0`}
               title={videos[currentIndex].title}
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
                    key={videos[currentIndex].id}
                    src={`https://img.youtube.com/vi/${videos[currentIndex].id}/hqdefault.jpg`} 
                    alt={videos[currentIndex].title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <svg className="w-20 h-20 text-white/80 group-hover:text-white transition-all duration-300 transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                    </div>
                </div>
            )}
          </div>
        </div>

        {/* Colonne Playlist */}
        <div className="md:col-span-1 relative">
          <div className="bg-gray-900/50 p-4 rounded-lg flex flex-col md:absolute md:inset-0">
            <h3 className="font-montserrat text-2xl text-white mb-3 border-b-2 border-amber-400 pb-2 flex-shrink-0">Extraits</h3>
            <ul className="space-y-1 flex-1 pr-2 overflow-visible md:overflow-y-auto">
              {videos.map((video, index) => (
                <li key={video.id}>
                  <button
                    onClick={() => handleVideoSelect(index)}
                    className={`w-full text-left py-2 px-2 rounded-md transition-colors text-white text-sm md:text-base ${currentIndex === index ? 'bg-amber-500/30' : 'hover:bg-white/10'}`}
                  >
                    <span className={`font-bold ${currentIndex === index ? 'text-amber-400' : ''}`}>
                      {index + 1}.
                    </span> {video.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Music;
