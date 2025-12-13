
import React from 'react';
import SectionTitle from './SectionTitle';

const Bio: React.FC = () => {
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
        
        {/* Modification de la taille sur mobile (w-64 centré) et plein écran relatif sur desktop (md:w-full) */}
        <div className="md:col-span-1 w-64 sm:w-80 md:w-full mx-auto relative group">
          
          {/* Conteneur avec effet "Vieux Film" : Bordure épaisse, fond noir */}
          <div className="relative rounded-lg overflow-hidden border-4 border-gray-900 shadow-2xl bg-black transform rotate-1 hover:rotate-0 transition-transform duration-500">
            
            {/* Vignette pour effet vieilli (ombre intérieure sombre sur les bords) */}
            <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]"></div>
            
            {/* Calque de bruit statique léger pour simuler le grain de pellicule */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            <div className="aspect-w-16 aspect-h-9">
               <iframe
               width="100%"
               height="100%"
               // Autoplay + Mute (obligatoire pour autoplay mobile) + Loop (playlist=ID nécessaire pour boucler un embed unique)
               src="https://www.youtube.com/embed/U3tsXwTQ-d0?autoplay=1&mute=1&loop=1&playlist=U3tsXwTQ-d0&controls=0&rel=0&modestbranding=1&disablekb=1&fs=0"
               title="Kipukipet Bio Video"
               frameBorder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               // Filtres CSS : Grayscale (N&B), Sepia (Vieilli), Contrast (Film), Brightness (Sombre)
               className="w-full h-full object-cover pointer-events-none grayscale contrast-125 sepia-[0.4] brightness-90"
             ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bio;
