import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

export function ImageModal({ isOpen, imageSrc, imageAlt, onClose }: ImageModalProps) {
  // Close modal on escape key press
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={onClose}
        >
          <div className="relative max-w-[95vw] max-h-[95vh] p-4">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close image modal"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={imageSrc}
              alt={imageAlt}
              className="max-h-full max-w-full rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image
            />
          </div>

          {/* Instructions text */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-75">
            Click outside image or press ESC to close
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}