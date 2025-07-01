"use client";

import { motion } from "framer-motion";
import IndexBg from "./IndexBg";
import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LEFT_NAV_MENU_LIST } from "../constant";

export default function Index() {
  const [isFadeIn, setIsFadeIn] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("CARTA");
  const [iconScrollHeight, setIconScrollHeight] = useState(203);
  const firstMenu = useRef(null);
  const initIconPosition = () => {
    if (firstMenu.current) {
      const height = firstMenu.current.offsetTop + 6;
      setIconScrollHeight(height);
    }
  };

  return (
    <motion.div className="h-screen w-screen">
      {isFadeIn && (
        <motion.div
          className="fixed top-0 left-0 h-screen w-screen bg-[#000000] pointer-events-none z-[100]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          onAnimationComplete={() => setIsFadeIn(false)}
        ></motion.div>
      )}
      <IndexBg></IndexBg>
      <header className="fixed top-0 left-0 w-full pt-[20px] mt-[20px] h-[60px] bg-transparent z-[20] flex justify-between items-center">
        <div className="header-left">
          <div
            className="menu cursor-pointer p-20"
            onClick={() => {
              setShowMenu(!showMenu);
              initIconPosition();
            }}
            style={{ paddingLeft: 20, paddingTop: 20 }}
          >
            <motion.img
              initial={{ x: -100 }}
              animate={{ x: 0 }} // 动画状态
              whileHover={{ scale: 1.1 }} // 悬停状态
              transition={{
                x: {
                  duration: 2,
                  ease: "easeInOut",
                },
                scale: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              }}
              className="h-[20px]"
              src="/MENU BLANC.jpg"
            ></motion.img>
          </div>
          <AnimatePresence>
            {showMenu && (
              <motion.div
                className="menu-container w-[300px] fixed top-0 left-0 h-full bg-[#FFFFFF77] z-[-10] flex items-center"
                initial={{ x: -300 }}
                exit={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{
                  x: {
                    duration: 1,
                    ease: "easeInOut",
                  },
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #2925256E 100%)",
                  }}
                  className="menu-container-wrapper w-full h-full flex items-center"
                >
                  <motion.div className="menu-left-icon w-[60px]">
                    <motion.div
                      animate={{
                        top: iconScrollHeight,
                      }}
                      transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 300,
                      }}
                      className="circle w-[16px] h-[16px] rounded-full bg-[#ffffff] absolute left-[30px]"
                    ></motion.div>
                  </motion.div>
                  <div className="menu-list flex flex-col items-center justify-center gap-[10px] text-[#ffffff]">
                    {LEFT_NAV_MENU_LIST.map((item, index) => (
                      <motion.a
                        className="text-left w-full h-[32px] font-bold cursor-pointer flex items-center"
                        ref={index === 0 ? firstMenu : null}
                        key={item.value}
                        transition={{
                          fontSize: {
                            duration: 0.3,
                            ease: "easeInOut",
                          },
                          fontWeight: {
                            duration: 0.3,
                            ease: "easeInOut",
                          },
                        }}
                        initial={{
                          fontSize:
                            currentMenu === item.value ? "24px" : "20px",
                          fontWeight: currentMenu === item.value ? 700 : 500,
                        }}
                        animate={{
                          fontSize:
                            currentMenu === item.value ? "24px" : "20px",
                          fontWeight: currentMenu === item.value ? 700 : 500,
                        }}
                        whileHover={{
                          fontSize: "24px",
                          fontWeight: 700,
                        }}
                        onClick={(e) => {
                          setCurrentMenu(item.value);
                          setIconScrollHeight(e.target.offsetTop + 6);
                        }}
                      >
                        {item.text}
                      </motion.a>
                    ))}
                  </div>
                </div>
                <div
                  style={{ marginLeft: 200 }}
                  className="menu-mask fixed top-0 left-0 h-screen w-screen z-[10]"
                  onClick={() => setShowMenu(false)}
                ></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="header-center fixed top-0 left-[50%] translate-x-[-50%]">
          <div className="brand cursor-pointer">
            <motion.img
              className="h-[100px]"
              src="/IMAGOTIP FINAL BLANC.jpg"
              whileHover={{ scale: 1.05 }}
              initial={{ y: -80 }}
              animate={{ y: 20 }}
              transition={{
                y: {
                  duration: 2,
                  ease: "easeInOut",
                },
                scale: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              }}
            ></motion.img>
          </div>
        </div>
        <div
          style={{ paddingRight: 20, paddingTop: 20 }}
          className="header-right"
        >
          <motion.nav
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{
              x: {
                duration: 2,
                ease: "easeInOut",
              },
            }}
            className="nav flex items-center gap-x-[20px]"
          >
            <div className="nav-item cursor-pointer">
              <motion.img
                src="/COMPRA BLANC.jpg"
                className="h-[36px] buy"
                transition={{
                  scale: {
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{ scale: 1.12 }}
              ></motion.img>
            </div>
            <div className="nav-item cursor-pointer">
              <motion.img
                src="/USER BLANC.jpg"
                className="h-[36px] user"
                transition={{
                  scale: {
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{ scale: 1.12 }}
              ></motion.img>
            </div>
            <div className="nav-item cursor-pointer">
              <motion.img
                src="/IDIOMES BLANC.jpg"
                className="h-[36px] language"
                transition={{
                  scale: {
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{ scale: 1.12 }}
              ></motion.img>
            </div>
          </motion.nav>
        </div>
      </header>
    </motion.div>
  );
}
