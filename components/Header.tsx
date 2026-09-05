
import React, { useState, useEffect, useRef } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  // Ref used to disable the scroll listener during a manual click on the menu
  const isManualScroll = useRef(false);
  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Manage background transparency
      setScrolled(window.scrollY > 10);

      // 2. Manage active section (Spy Scroll)
      if (isManualScroll.current) return;

      // If we are at the top of the page (Hero), no menu item should be active
      if (window.scrollY < 100) {
        setActiveSection('');
        return;
      }

      const sections = ['dates', 'musique', 'galerie', 'bio', 'affiches'];
      let currentSection = '';
      
      // We look for the section that occupies the middle of the screen
      const viewportMiddle = window.innerHeight / 3;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is above the middle line
          // AND the bottom is below the top of the viewport (it is visible)
          if (rect.top <= viewportMiddle && rect.bottom >= 0) {
            currentSection = sectionId;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set state on load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    // Disable listener temporarily
    isManualScroll.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    // Set active state manually
    setActiveSection(id.replace('#', ''));
    setIsMenuOpen(false);

    // Smooth scroll
    if (id === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Re-enable listener after animation
    scrollTimeout.current = window.setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);
  };

  const navLinks = [
    { href: '#dates', label: 'Dates', id: 'dates' },
    { href: '#musique', label: 'Musique', id: 'musique' },
    { href: '#galerie', label: 'Galerie', id: 'galerie' },
    { href: '#bio', label: 'Bio', id: 'bio' },
    { href: '#affiches', label: 'Affiches', id: 'affiches' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled || isMenuOpen ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <a href="#" onClick={(e) => handleNavClick(e, '#')} className="flex items-center gap-3 group">
            <img src="https://lh3.googleusercontent.com/UfjAPxtbJt-m-Kkf6p-75PbUVt8F_CCnwXusp43IaDHy6vhLlFEIWnU8_J7xtd1scl1sQUBwv_RUgnWSHdg=s100" alt="Kipukipet Logo" className="h-8 w-auto group-hover:scale-110 transition-transform"/>
            <span className="font-montserrat text-xl tracking-wider uppercase text-amber-400">Kipukipet</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`transition-colors font-bold ${activeSection === link.id ? 'text-amber-400' : 'text-white hover:text-amber-400'}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Burger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-black/80 backdrop-blur-sm">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map(link => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`transition-colors text-lg ${activeSection === link.id ? 'text-amber-400 font-bold' : 'text-white hover:text-amber-400'}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
