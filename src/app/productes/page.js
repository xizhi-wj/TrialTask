"use client";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { RingModel } from "../utils";

export default function Productes() {
  const productesRef = useRef(null);
  useEffect(() => {
    const model = new RingModel();
    const productes = productesRef.current;
    window.addEventListener("scroll", () => {
      const scrollPercent =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      model.scroll(scrollPercent);
    });
  }, []);
  return (
    <AnimatePresence>
      <div
        id="productes"
        ref={productesRef}
        className="h-[500vh] w-full flex justify-center items-center"
      ></div>
    </AnimatePresence>
  );
}
