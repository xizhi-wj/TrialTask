"use client";
import { motion } from "framer-motion";
import Welcome from "./components/Welcome";
import { useState } from "react";
import Index from "./components/Index";

export default function Home() {
  const [showIndex, setShowIndex] = useState(false);
  const handleWelcomeComplete = () => {
    setShowIndex(true);
  };
  return (
    <motion.div className="home">
      <Welcome onComplete={handleWelcomeComplete}></Welcome>
      {showIndex && <Index></Index>}
    </motion.div>
  );
}
