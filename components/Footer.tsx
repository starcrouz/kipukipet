
import React from 'react';

const Footer: React.FC = () => {
  
  // Fonction pour reconstituer l'email au clic (protection anti-spam)
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const user = 'kipukipet0';
    const domain = 'gmail.com';
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <footer className="bg-gray-900/50 py-12 relative z-20 pointer-events-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <div className="flex flex-col items-center">
          <img src="https://lh3.googleusercontent.com/UfjAPxtbJt-m-Kkf6p-75PbUVt8F_CCnwXusp43IaDHy6vhLlFEIWnU8_J7xtd1scl1sQUBwv_RUgnWSHdg=s100" alt="Kipukipet Logo" className="h-12 w-auto mb-4"/>
          <p className="font-montserrat text-3xl text-white tracking-widest uppercase">
            Kipukipet
          </p>
          <p className="font-codystar text-2xl mt-2 mb-12">
            <span className="text-amber-400">✪</span> <span className="animate-float-wind">BON VENT !</span> <span className="text-amber-400">✪</span>
          </p>
          
          {/* Bouton avec obfuscation JS pour l'email */}
          <button 
            onClick={handleContactClick}
            className="inline-flex items-center px-6 py-3 border border-amber-400 text-white hover:bg-amber-400 hover:text-black transition-colors rounded-full font-medium tracking-wider mb-2 cursor-pointer"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            NOUS ÉCRIRE
          </button>
        </div>
        <p className="text-xs mt-4">&copy; {new Date().getFullYear()} Kipukipet. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
