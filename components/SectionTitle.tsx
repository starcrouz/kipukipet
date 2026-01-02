
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2 className="font-bangers text-5xl md:text-6xl text-white uppercase tracking-wider rotate-[-1deg] inline-block mb-2">{title}</h2>
      <p className="font-special-elite text-lg md:text-xl text-amber-400 mt-2 tracking-widest uppercase">
        {subtitle}
      </p>
      <div className="w-24 h-1 bg-amber-400 mx-auto mt-4 transform skew-x-[-20deg]"></div>
    </div>
  );
};

export default SectionTitle;
