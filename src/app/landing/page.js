"use client";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="h-screen w-screen bg-cover bg-no-repeat"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="video-container fixed top-0 left-0 h-screen w-screen z-[-9]"
        >
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            className="video-bg h-screen w-screen object-cover"
          >
            <source src="/index.mp4" type="video/mp4" />
          </motion.video>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
