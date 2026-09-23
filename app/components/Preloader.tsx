'use client';

import { motion, AnimatePresence } from 'motion/react';
import { createContext, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { SlidingNumber } from '@/components/core/sliding-number';

interface PreloaderContextType {
  isLoaded: boolean;
}

const PreloaderContext = createContext<PreloaderContextType>({ isLoaded: false });

export function usePreloader() {
  return useContext(PreloaderContext);
}

export function SlidingNumberBasic({
  onComplete,
  className = '',
}: {
  onComplete?: () => void;
  className?: string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (value === 100) {
      if (onComplete) {
        const timer = setTimeout(() => {
          onComplete();
        }, 300);
        return () => clearTimeout(timer);
      }
      return;
    }

    const interval = setInterval(() => {
      setValue((prev) => {
        const next = prev + 1;
        return next > 100 ? 100 : next;
      });
    }, 14);
    return () => clearInterval(interval);
  }, [value, onComplete]);

  return (
    <motion.div
      initial={{ y: 0, fontSize: `${24}px` }}
      animate={{ y: 0, fontSize: `${24}px` }}
      transition={{
        ease: [1, 0, 0.35, 0.95],
        duration: 1.5,
        delay: 0.3,
      }}
      className={`leading-none text-black ${className}`}
    >
      <div className='inline-flex items-center gap-1 font-mono font-bold'>
        <SlidingNumber value={value} />%
      </div>
    </motion.div>
  );
}

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 150);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <PreloaderContext.Provider value={{ isLoaded }}>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="preloader"
            initial={{ y: 0 }}
            exit={{
              y: '-100%',
              transition: {
                duration: 0.85,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white text-black px-8 py-12 select-none pointer-events-auto"
          >
            {/* Center Brand & Counter */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <Image
                  src="/logo3.png"
                  alt="ElevenX Logo"
                  width={112}
                  height={112}
                  priority
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col items-center">
                <div className="py-2 px-4">
                  <SlidingNumberBasic onComplete={() => setLoading(false)} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </PreloaderContext.Provider>
  );
}

export default PreloaderProvider;
