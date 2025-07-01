"use client";
import { motion } from "framer-motion";

export default function IndexBg() {
  return (
    <motion.div className="fixed top-0 left-0 z-0 h-screen w-screen">
      <motion.video
        autoPlay
        loop
        muted
        src="/bg.mp4"
        className="h-screen w-screen object-cover"
      ></motion.video>
    </motion.div>
  );
}
