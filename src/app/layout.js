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
      <body>
        <motion.div className="home">
          <Welcome onComplete={handleWelcomeComplete}></Welcome>
          {showIndex && (
            <motion.div className="layout">
              <Header></Header>
              <motion.main className="main-content w-screen h-screen">
                {children}
              </motion.main>
            </motion.div>
          )}
        </motion.div>
      </body>
    </html>
  );
}
