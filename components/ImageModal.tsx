import React, { useEffect, useState, useCallback } from 'react';

interface ImageModalProps {
  images: string[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  altPrefix?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
  altPrefix = 'Image',
}) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const totalImages = images.length;
  const isOpen = currentIndex !== null && totalImages > 0;

  const goToNext = useCallback(() => {
    if (currentIndex === null || totalImages === 0) return;
    onNavigate((currentIndex + 1) % totalImages);
  }, [currentIndex, totalImages, onNavigate]);

  const goToPrev = useCallback(() => {
    if (currentIndex === null || totalImages === 0) return;
    onNavigate((currentIndex - 1 + totalImages) % totalImages);
  }, [currentIndex, totalImages, onNavigate]);

  // Bloquer le scroll de la page principale quand la modale est ouverte
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Navigation au clavier : Flèche Gauche, Flèche Droite, Échap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, goToNext, goToPrev, onClose]);

  // Gestion du Swipe tactile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
    setTouchDeltaX(0);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;

    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    const diffX = currentX - touchStartX;
    const diffY = currentY - touchStartY;

    // Si le mouvement horizontal est prédominant, on gère le swipe
    if (Math.abs(diffX) > Math.abs(diffY)) {
      setTouchDeltaX(diffX);
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;

    const swipeThreshold = 50; // Distance minimale en pixels pour déclencher le changement

    if (touchDeltaX < -swipeThreshold) {
      goToNext();
    } else if (touchDeltaX > swipeThreshold) {
      goToPrev();
    }

    setTouchStartX(null);
    setTouchStartY(null);
    setTouchDeltaX(0);
    setIsSwiping(false);
  };

  if (!isOpen || currentIndex === null) return null;

  const currentImageUrl = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in p-2 sm:p-6 select-none touch-none cursor-zoom-out"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-modal="true"
      role="dialog"
    >
      {/* Bouton Fermer */}
      <button
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-amber-400 z-[120] p-2 sm:p-2.5 rounded-full bg-black/70 hover:bg-black transition-all border border-gray-700 cursor-pointer shadow-lg"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Fermer"
      >
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Conteneur côte-à-côte : Flèche Gauche + Image + Flèche Droite */}
      <div
        className="relative flex items-center justify-center gap-2 sm:gap-4 max-w-full max-h-full cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton Précédent (directement collé à gauche de l'image) */}
        {totalImages > 1 && (
          <button
            className="z-[110] p-2 sm:p-3.5 rounded-full bg-black/80 hover:bg-amber-400 text-white hover:text-black transition-all border border-gray-600 backdrop-blur-md shadow-2xl hover:scale-110 active:scale-95 cursor-pointer flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            aria-label="Image précédente"
            title="Précédent (Flèche gauche)"
          >
            <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Image avec animation et translation fluide lors du swipe tactile */}
        <div
          className="relative flex items-center justify-center"
          style={{
            transform: isSwiping ? `translateX(${touchDeltaX}px)` : 'none',
            transition: isSwiping ? 'none' : 'transform 0.25s ease-out',
          }}
        >
          <img
            key={currentImageUrl}
            src={currentImageUrl}
            alt={`${altPrefix} ${currentIndex + 1}`}
            className="max-w-[75vw] sm:max-w-[70vw] md:max-w-[65vw] max-h-[82vh] object-contain rounded-lg shadow-2xl animate-[wave-in_0.35s_ease-out_forwards]"
          />
        </div>

        {/* Bouton Suivant (directement collé à droite de l'image) */}
        {totalImages > 1 && (
          <button
            className="z-[110] p-2 sm:p-3.5 rounded-full bg-black/80 hover:bg-amber-400 text-white hover:text-black transition-all border border-gray-600 backdrop-blur-md shadow-2xl hover:scale-110 active:scale-95 cursor-pointer flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Image suivante"
            title="Suivant (Flèche droite)"
          >
            <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Compteur d'images & indications navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-gray-700/80 text-xs sm:text-sm font-semibold text-gray-200 backdrop-blur-md pointer-events-none shadow-lg">
        <span>
          {currentIndex + 1} / {totalImages}
        </span>
        <span className="hidden sm:inline text-gray-500">•</span>
        <span className="hidden sm:inline text-xs text-gray-400 font-normal">
          ← → pour naviguer
        </span>
      </div>
    </div>
  );
};

export default ImageModal;
