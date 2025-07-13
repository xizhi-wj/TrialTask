"use client";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CARTA_SECTION_CONTENT } from "../constant";
import "lenis/dist/lenis.css";
import Lenis from "lenis";
import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.cjs.jsx";

export default function CartaPage() {
  const cartaRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoPercentage, setVideoPercentage] = useState(0);
  const videoRef = useRef(null);
  const sections = [];
  useEffect(() => {
    // const carta = cartaRef.current;
    // const canvas = canvasRef.current;
    // const video = videoRef.current;
    // const lenis = new Lenis();
    // lenis.on("scroll", () => {
    //   console.log("object");
    // });
    document.body.addEventListener(
      "scroll",
      () => {
        let scrollPercent =
          document.body.scrollTop /
          (document.body.scrollHeight - document.body.clientHeight);
        if (scrollPercent >= 1) {
          scrollPercent = 1;
        }
        if (scrollPercent <= 0) {
          scrollPercent = 0;
        }
        setVideoPercentage(scrollPercent);
        // video.currentTime = video.duration * scrollPercent;
      },
      {
        passive: true,
      }
    );
  }, []);

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="carta h-full min-h-screen section-container"
          ref={cartaRef}
        >
          <motion.div
            id="3d-bg"
            className="3d-bg fixed top-0 left-0 w-full h-full z-[-100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <ScrollyVideo
              videoPercentage={videoPercentage}
              transitionSpeed={100}
              frameThreshold={0.01}
              full="true"
              src="/video/bg.mp4"
            />
            <canvas ref={canvasRef} id="canvas"></canvas>
          </motion.div>
          {CARTA_SECTION_CONTENT.map((section, index) => {
            return (
              <motion.section
                className="section"
                key={section.name}
                ref={(el) => (sections[index] = el)}
              >
                <motion.div className="section-content">
                  <motion.div
                    className={`section-left absolute ${section.left.position} ${section.left.width}`}
                  >
                    <motion.h1
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      viewport={{ once: false, margin: "-15%" }}
                      className={`year relative w-full ${section.left.textAlign}`}
                    >
                      <span
                        style={{ lineHeight: 0.8 }}
                        className={`font-bold text-[5rem] text-white opacity-[0.5] ${section.left.textAlign}`}
                      >
                        {section.left.year}
                      </span>
                      <span
                        style={{ paddingRight: "10px" }}
                        className={`absolute ${
                          section.left.textAlign === "text-left"
                            ? "left-0"
                            : "right-0"
                        } bottom-0 title text-white text-4xl font-bold`}
                      >
                        {section.left.title}
                      </span>
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      viewport={{ once: false, margin: "-15%" }}
                      className="description text-white text-2xl mt-10"
                    >
                      {section.left.description}
                    </motion.p>
                  </motion.div>

                  <motion.div
                    className={`section-right absolute ${section.right.position} ${section.right.width}`}
                  >
                    <motion.div
                      style={{ lineHeight: 0.8 }}
                      className={`title-list flex flex-col text-[80px] ${section.right.textAlign}`}
                    >
                      {section.right.contents.map((item, index) => (
                        <motion.span
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: false, margin: "-60px" }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          key={index}
                          className="text-white font-bold"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.section>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
