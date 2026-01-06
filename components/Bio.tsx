
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
        
        {/* Modification de la taille : utilisation de max-w-sm pour mobile (contenu) au lieu de w-64 figé */}
        <div className="md:col-span-1 w-full max-w-sm md:max-w-full mx-auto relative group">
          
          {/* Conteneur avec effet "Vieux Film" : Bordure retirée, coins arrondis conservés */}
          <div className="relative rounded-lg overflow-hidden shadow-2xl bg-black transform rotate-1 hover:rotate-0 transition-transform duration-500">
            
            {/* Vignette pour effet vieilli (ombre intérieure sombre sur les bords) */}
            <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]"></div>
            
            {/* Calque de bruit statique léger pour simuler le grain de pellicule */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[url('/assets/images/bio-stardust.png')]"></div>

            {/* Utilisation de aspect-video natif et relative/absolute pour l'iframe */}
            <div className="w-full aspect-video relative">
               <iframe
               src="https://www.youtube.com/embed/U3tsXwTQ-d0?autoplay=1&mute=1&loop=1&playlist=U3tsXwTQ-d0&controls=0&rel=0&modestbranding=1&disablekb=1&fs=0"
               title="Kipukipet Bio Video"
               frameBorder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               // Filtres CSS : Grayscale (N&B), Sepia (Vieilli), Contrast (Film), Brightness (Sombre)
               className="absolute inset-0 w-full h-full object-cover pointer-events-none grayscale contrast-125 sepia-[0.4] brightness-90"
             ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bio;
