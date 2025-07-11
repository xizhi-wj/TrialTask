"use client";
import { LEFT_NAV_MENU_LIST, RIGHT_NAV_MENU_LIST } from "@/app/constant";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const [menuIndex, setMenuIndex] = useState(-1);

  const iconOffset = 47;

  const svgOffset = -480;

  const [ballPosition, setBallPosition] = useState(svgOffset);

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
                    duration: 1,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 0.1,
                    ease: "easeInOut",
                  },
                  opacity: {
                    duration: 1,
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
                        padding: "26px 10px",
                        marginLeft: 50,
                      }}
                      className="menu-list w-full flex flex-col gap-[15px] text-[#ffffff] relative"
                    >
                      {LEFT_NAV_MENU_LIST.map((item, index) => (
                        <motion.a
                          onClick={(e) => {
                            setMenuIndex(index);
                            setBallPosition(svgOffset + index * iconOffset);
                            if (item.path) {
                              router.push(item.path);
                            }
                          }}
                          onHoverStart={() => {
                            setBallPosition(svgOffset + index * iconOffset);
                          }}
                          key={index}
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
                            duration: 0.05,
                            ease: "easeInOut",
                          }}
                        >
                          {item.value}
                        </motion.a>
                      ))}
                      <motion.div className="menu-icon h-full absolute top-0 left-[-12%] overflow-hidden">
                        <motion.svg
                          width="33"
                          height="980"
                          viewBox="0 0 33 980"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          initial={{ y: ballPosition }}
                          animate={{ y: ballPosition }}
                          transition={{
                            duration: 0.03,
                            ease: "easeInOut",
                          }}
                        >
                          <path
                            d="M10 979.5V555.794C10.0002 551.61 13.9004 545.049 20.0479 541.463L20.0488 541.462C27.2976 537.251 31.9004 529.414 31.9004 520.995C31.9003 512.574 27.3952 504.74 20.0518 500.529L20.0479 500.527C13.9002 496.941 10 490.38 10 483.295V0.499023H9V483.295C9 490.714 13.0024 497.652 19.5508 501.464C26.5037 505.453 30.9003 513.016 30.9004 520.995C30.9004 529.073 26.6048 536.542 19.5459 540.531H19.5449C13.0051 544.241 9.00016 551.273 9 558.695V979.5H10Z"
                            fill="white"
                            stroke="white"
                          />
                          <path
                            d="M9.5 511.6C14.7467 511.6 19 515.853 19 521.1C19 526.347 14.7467 530.6 9.5 530.6C4.25329 530.6 0 526.347 0 521.1C0 515.853 4.25329 511.6 9.5 511.6Z"
                            fill="white"
                          />
                        </motion.svg>
                        {/* <motion.svg
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
                              duration: 0.03,
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
                              duration: 0.05,
                              ease: "easeInOut",
                            }}
                            fill="white"
                            animate={{
                              cy: ballPosition - iconOffset + 20,
                            }}
                          ></motion.circle>
                        </motion.svg> */}
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
              duration: 1,
              ease: "easeInOut",
            },
            opacity: {
              duration: 1,
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
                whileHover={{ scale: 1.1 }}
                transition={{
                  scale: {
                    duration: 0.1,
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
              duration: 1,
              ease: "easeInOut",
            }}
            className="nav flex items-center gap-x-[20px]"
          >
            {RIGHT_NAV_MENU_LIST.map((item, index) => {
              return (
                <div key={index} className="nav-item cursor-pointer ">
                  <motion.img
                    src={item.icon}
                    className="h-[32px] buy"
                    transition={{
                      scale: {
                        duration: 0.05,
                      },
                    }}
                    whileHover={{ scale: 1.12 }}
                  ></motion.img>
                </div>
              );
            })}
          </motion.nav>
        </div>
      </div>
    </motion.header>
  );
}
