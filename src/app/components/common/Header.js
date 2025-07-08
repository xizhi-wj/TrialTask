"use client";
import { LEFT_NAV_MENU_LIST } from "@/app/constant";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const [menuIndex, setMenuIndex] = useState(-1);

  const iconOffset = 47;

  const [ballPosition, setBallPosition] = useState(0);

  const router = useRouter();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <motion.header
      style={{ padding: 10 }}
      className="fixed top-0 left-0 z-[10] w-screen h-[60px] flex items-center"
    >
      <div className="header-content w-full flex justify-between items-center relative">
        <div className="left">
          <div className="menu">
            <motion.div
              style={{ marginLeft: 10 }}
              onClick={toggleMenu}
              className="menu-icon cursor-pointer"
            >
              <motion.img
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }} // 动画状态
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
                  opacity: {
                    duration: 2,
                    ease: "easeInOut",
                  },
                }}
                className="h-[20px]"
                src="/MENU BLANC.jpg"
              ></motion.img>
            </motion.div>
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  onClick={toggleMenu}
                  className="menu-content fixed top-0 left-0 w-screen h-screen"
                >
                  <motion.div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="absolute top-0 left-0 menu-list-container flex items-center justify-center w-[300px] h-full bg-[#FFFFFF33]"
                    initial={{ left: -300 }}
                    animate={{ left: 0 }}
                    exit={{ left: -300 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeIn",
                    }}
                  >
                    <div
                      style={{
                        padding: 20,
                        marginLeft: 50,
                      }}
                      className="menu-list w-full flex flex-col gap-[15px] text-[#ffffff] relative"
                    >
                      {LEFT_NAV_MENU_LIST.map((item, index) => (
                        <motion.a
                          onClick={(e) => {
                            setMenuIndex(index);
                            setBallPosition(index * iconOffset);
                            if (item.path) {
                              router.push(item.path);
                            }
                          }}
                          key={item.value}
                          style={{
                            width: "fit-content",
                            verticalAlign: "middle",
                          }}
                          className="text-left w-full h-[32px] font-bold cursor-pointer flex items-center w-[fit-content]"
                          whileHover={{ fontSize: "28px", color: "#FFFFFF" }}
                          initial={{
                            fontSize: menuIndex === index ? "28px" : "24px",
                            color:
                              menuIndex === index ? "#FFFFFF" : "#FFFFFFee",
                          }}
                          animate={{
                            fontSize: menuIndex === index ? "28px" : "24px",
                          }}
                          transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                          }}
                        >
                          {item.value}
                        </motion.a>
                      ))}
                      <motion.div className="menu-icon h-full absolute top-0 left-[-12%]">
                        <motion.svg
                          width="42" // 40（椭圆直径） + 2（描边溢出）
                          viewBox="79 0 42 280" // x=79（100-21），宽度42
                          className="h-full"
                        >
                          <motion.path
                            d={`M100,-2300  
                                L100,${ballPosition - iconOffset}             
                                A20,20 0 0,1 100,${ballPosition}
                                L100,2300`}
                            fill="none"
                            transition={{
                              duration: 0.5,
                              ease: "easeInOut",
                            }}
                            animate={{
                              d: `M100,-2300  
                                L100,${ballPosition - iconOffset}             
                                A20,20 0 0,1 100,${
                                  ballPosition - iconOffset + 40
                                }
                                L100,2300`,
                            }}
                            stroke="white"
                            strokeWidth="2"
                          ></motion.path>
                          <motion.circle
                            cx="100"
                            cy={ballPosition - iconOffset + 20}
                            r="8"
                            transition={{
                              duration: 0.5,
                              ease: "easeInOut",
                            }}
                            fill="white"
                            animate={{
                              cy: ballPosition - iconOffset + 20,
                            }}
                          ></motion.circle>
                        </motion.svg>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <motion.div
          initial={{ top: -40, opacity: 0 }}
          animate={{ top: 40, opacity: 1 }}
          transition={{
            top: {
              duration: 2,
              ease: "easeInOut",
            },
            opacity: {
              duration: 2,
              ease: "easeInOut",
            },
          }}
          className="center fixed top-0 left-[50%] translate-x-[-50%]"
        >
          <div
            className="brand"
            onClick={() => {
              router.push("/");
            }}
          >
            <motion.div>
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{
                  scale: {
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                }}
                className="h-[100px] cursor-pointer"
                src="/IMAGOTIP FINAL BLANC.jpg"
              ></motion.img>
            </motion.div>
          </div>
        </motion.div>
        <div style={{ paddingRight: 20, paddingTop: 20 }} className="right">
          <motion.nav
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              x: {
                duration: 2,
                ease: "easeInOut",
              },
              opacity: {
                duration: 2,
                ease: "easeInOut",
              },
            }}
            className="nav flex items-center gap-x-[20px]"
          >
            <div className="nav-item cursor-pointer">
              <motion.img
                src="/COMPRA BLANC.jpg"
                className="h-[30px] buy"
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
                className="h-[30px] user"
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
                className="h-[30px] language"
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
      </div>
    </motion.header>
  );
}
