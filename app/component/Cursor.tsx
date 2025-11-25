'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  // Initialize off-screen so it doesn't flash in the corner
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring config: smooth follow
  const springConfig = { damping: 20, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: { clientX: number; clientY: number; }) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      // FIX 1: z-50 ensures it sits ON TOP of your text/images
      // FIX 2: pointer-events-none is CRITICAL so you can click through the glow
      className="fixed top-0 left-0 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none z-50"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
        // FIX 3: mix-blend-mode helps it look like light rather than paint
        mixBlendMode: "screen" 
      }}
    />
  );
}