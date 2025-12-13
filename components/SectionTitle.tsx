
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2 className="font-montserrat text-3xl md:text-4xl font-bold uppercase tracking-widest">{title}</h2>
      <p className="font-codystar text-xl md:text-2xl text-gray-400 mt-2 tracking-wider">
        <span className="text-amber-400">✪</span> {subtitle} <span className="text-amber-400">✪</span>
      </p>
      <div className="w-24 h-0.5 bg-amber-400 mx-auto mt-4"></div>
    </div>
  );
};

export default SectionTitle;
