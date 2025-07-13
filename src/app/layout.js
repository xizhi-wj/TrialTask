"use client";
import "./globals.css";
import Welcome from "./components/Welcome";
import Header from "./components/common/Header";
import { motion } from "framer-motion";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [showIndex, setShowIndex] = useState(false);

  const handleWelcomeComplete = () => {
    setShowIndex(true);
  };
  return (
    <html lang="en">
      <body id="body">
        <motion.div className="home h-full">
          <Welcome onComplete={handleWelcomeComplete}></Welcome>
          {showIndex && (
            <motion.div className="layout h-full">
              <Header></Header>
              <motion.main className="main-content h-full">
                {children}
              </motion.main>
            </motion.div>
          )}
        </motion.div>
      </body>
    </html>
  );
}
