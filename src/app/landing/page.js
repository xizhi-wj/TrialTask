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
        className="h-screen w-screen bg-[url('/bg.png')] bg-cover bg-no-repeat"
      ></motion.div>
    </AnimatePresence>
  );
}
