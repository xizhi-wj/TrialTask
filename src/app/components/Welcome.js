"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Welcome({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  const hide = (o) => {
    if (o.opacity === 0) {
      onComplete();
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div className="h-screen w-screen flex flex-col justify-center items-center bg-black text-white z-100">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={(o) => hide(o)}
            transition={{ duration: 1.5 }}
            src="/IMAGOTIP FINAL BLANC.svg"
            className="w-256 h-256 max-h-full max-w-full"
          ></motion.img>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
