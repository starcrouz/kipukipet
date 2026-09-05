
import React from 'react';
import SectionTitle from './SectionTitle';

const Bio: React.FC = () => {
  return (
    <section id="bio">
      <SectionTitle title="Bio" subtitle="AU DÉBUT..." />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
        <div className="md:col-span-2 text-base sm:text-lg text-gray-300 leading-relaxed space-y-4 px-4 md:px-0">
          <p>
            Tout a commencé sur un balcon du 13ème arrondissement de Paris, lorsqu'une tentative irrépressible de reprise de Boys Boys Boys a mal tourné. Depuis ce jour, Kipukipet s'est imposé comme le <strong className="font-bold text-white">trio débranché</strong> spécialiste de la <strong className="font-bold text-white">chanson déglinguée</strong> et du vandalisme de salon.
          </p>
          <div className="space-y-2">
            <p>
              Notre <strong className="font-bold text-white">commando acoustique</strong> réunit trois profils hautement qualifiés&nbsp;:
            </p>
            <ul className="space-y-1.5 pl-4 border-l-2 border-amber-400/50">
              <li>
                <span className="font-bold text-amber-400">Steph :</span> Accordéoniste de l'extrême et manieur d'une scie musicale pour les grands moments de tension dramatique.
              </li>
              <li>
                <span className="font-bold text-amber-400">Ricet :</span> Gardien du groove de proximité, jonglant entre son ukulélé et sa guitare.
              </li>
              <li>
                <span className="font-bold text-amber-400">So :</span> L'élément perturbateur indispensable, qui enchante (et achève) les morceaux à coups de flûte à bec et mélodica.
              </li>
            </ul>
          </div>
          <p>
            Ensemble, nous profanons joyeusement le patrimoine de la pop mondiale avec des instruments qu'on pensait réservés aux kermesses ou aux feux de camp. Nos mashups et <strong className="font-bold text-white">reprises décomplexées</strong> ont fait beaucoup d'enfants, et la plupart sont de <strong className="font-bold text-white">turbulents</strong> petits monstres.
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
