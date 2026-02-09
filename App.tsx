
import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dates from './components/Dates';
import Music from './components/Music';
import Gallery from './components/Gallery';
import Bio from './components/Bio';
import Posters from './components/Posters';
import Footer from './components/Footer';
import BackgroundSnake from './components/BackgroundSnake';

function App() {
  const [isShaking, setIsShaking] = useState(false);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500); // Animation duration
  };

  return (
    <div className={`bg-black text-white min-h-screen relative overflow-hidden ${isShaking ? 'animate-shake' : ''}`}>
      {/* Background with shake handler */}
      <div className="fixed inset-0 z-0">
        <BackgroundSnake onShake={triggerShake} />
      </div>
      
      <Header />
      
      {/* 
         Main content logic:
         z-10 to be above the snake.
         pointer-events-none on the container so clicks on 'empty' areas (padding, margins) pass through.
      */}
      <main className="relative z-10 pointer-events-none">
        
        {/* Hero manages its own pointer events internally (text clickable, background not) */}
        <Hero />
        
        {/* 
            Container for sections.
            The space-y-24 creates margins. Since the parent is pointer-events-none, 
            these margins are not clickable, so they trigger the snake.
        */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32 py-24 md:py-32 pointer-events-none">
          
          {/* We wrap each section in pointer-events-auto to make the content interactive */}
          <div className="pointer-events-auto">
            <Dates />
          </div>
          
          <div className="pointer-events-auto">
            <Music />
          </div>
          
          <div className="pointer-events-auto">
            <Gallery />
          </div>
          
          <div className="pointer-events-auto">
            <Bio />
          </div>
          
          <div className="pointer-events-auto">
            <Posters />
          </div>
          
        </div>
      </main>
      
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
