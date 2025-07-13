"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function scrollPage() {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="carta h-full min-h-screen"
        >
          <main className="section-container">
            <section className="section">
              <div className="section-content">
                <h1>section1</h1>
              </div>
            </section>
            <section className="section">
              <div className="section-content">
                <h1>section2</h1>
              </div>
            </section>
            <section className="section">
              <div className="section-content">
                <h1>section3</h1>
              </div>
            </section>
          </main>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
