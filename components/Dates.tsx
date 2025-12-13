
import React from 'react';
import SectionTitle from './SectionTitle';
import { concerts } from '../constants';

const Dates: React.FC = () => {
  return (
    <section id="dates">
      <SectionTitle title="Nos Dates" subtitle="KONCERTS" />
      <p className="text-center text-gray-400 -mt-10 mb-12 max-w-md mx-auto">
        Nos concerts à venir et une sélection de nos concerts passés
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {concerts.map((concert, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
            {/* Ajout de 'grayscale' pour le noir et blanc, et 'group-hover:grayscale-0' pour remettre la couleur au survol */}
            <img src={concert.imageUrl} alt={concert.title} className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/75 transition-colors"></div>
            <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end">
              <h3 className="font-montserrat text-xl lg:text-2xl font-bold">{concert.date}</h3>
              <p className="text-md lg:text-lg mt-1">{concert.title}</p>
              <p className="text-sm lg:text-base text-gray-300">{concert.location}</p>
              {concert.past && (
                <p className="text-xs text-amber-400 mt-2">C'est passé...</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dates;
