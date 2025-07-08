"use client";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CARTA_SECTION_CONTENT } from "../constant";

export default function CartaPage() {
  const video = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  let oldScrolly = 0;
  let newScrollY = 0;

  useEffect(() => {
    document.body.addEventListener("scroll", () => {
      newScrollY = document.body.scrollTop;
      setScrollPercent(
        document.body.scrollTop /
          (document.body.scrollHeight - document.body.clientHeight)
      );
    });
    const animate = () => {
      if (newScrollY - oldScrolly > 1 || newScrollY - oldScrolly < -1) {
        oldScrolly = newScrollY;
        const scrollPercent =
          (document.body.scrollTop /
            (document.body.scrollHeight - document.body.clientHeight)) *
          100;
        if (video.current) {
          video.current.currentTime =
            video.current.duration * Math.min(scrollPercent / 100, 0.999);
        }
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="carta"
          style={{
            overflow: "auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="video-container fixed top-0 left-0 h-screen w-screen z-[-9]"
          >
            <motion.video
              loop
              preload="auto"
              muted
              src="/bg.mp4"
              className="video-bg h-screen w-screen object-cover"
              onLoadedData={() => {
                setVideoLoaded(true);
              }}
              ref={video}
            ></motion.video>
          </motion.div>
          <motion.div className="carta-content w-full h-full flex flex-col">
            {CARTA_SECTION_CONTENT.map((section) => {
              return (
                <motion.section
                  key={section.name}
                  className="section-1 w-screen h-screen relative cursor-default"
                >
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
                        style={{
                          lineHeight: 0.8,
                        }}
                        className={`font-bold text-[5rem] text-white opacity-[0.5] ${section.left.textAlign}`}
                      >
                        {section.left.year}
                      </span>
                      <span
                        style={{
                          paddingRight: "10px",
                        }}
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
                      className="description text-white text-xl mt-10"
                    >
                      {section.left.description}
                    </motion.p>
                  </motion.div>
                  <motion.div
                    className={`section-right absolute ${section.right.position} ${section.right.width}`}
                  >
                    <motion.div
                      style={{
                        lineHeight: 0.8,
                      }}
                      className={`title-list flex flex-col text-[80px] ${section.right.textAlign}`}
                    >
                      {section.right.contents.map((item, index) => {
                        return (
                          <motion.span
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{
                              once: false,
                              margin: "-60px",
                            }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            key={index}
                            className="text-white font-bold"
                          >
                            {item}
                          </motion.span>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                </motion.section>
              );
            })}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
