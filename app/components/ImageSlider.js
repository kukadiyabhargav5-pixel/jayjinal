"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../page.module.css";

const SLIDES = [
  { src: "/slider_1.png", caption: "Engagement Rings", sub: "A symbol of eternal love" },
  { src: "/slider_2.png", caption: "The Stage", sub: "Where two hearts become one" },
  { src: "/slider_3.png", caption: "Sacred Traditions", sub: "Blessings for a beautiful journey" },
  { src: "/slider_4.png", caption: "Ring Exchange", sub: "The moment that bonds forever" },
  { src: "/slider_5.png", caption: "Floral Dreams", sub: "Beauty in every detail" },
];

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.92 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.92, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }),
};

export default function ImageSlider() {
  const [[idx, dir], setIdx] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  const go = useCallback((d) => {
    setIdx(([prev]) => [(prev + d + SLIDES.length) % SLIDES.length, d]);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => go(1), 4000);
    return () => clearInterval(timer.current);
  }, [paused, go]);

  return (
    <section className={styles.sliderSec}>
      <motion.div
        className={styles.sliderHeader}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.sliderIcon}>💍</div>
        <h2 className={styles.sliderTitle}>Engagement Gallery</h2>
        <div className={styles.sliderSubtitle}>Moments to Cherish Forever</div>
        <div className={styles.divider} style={{ margin: "1rem auto 0", width: "40%" }}>
          <div className={styles.divLine} /><span className={styles.divIcon}>❖</span><div className={styles.divLine} />
        </div>
      </motion.div>

      <motion.div
        className={styles.sliderWrap}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring", stiffness: 60 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={styles.cTL} /><div className={styles.cTR} />
        <div className={styles.cBL} /><div className={styles.cBR} />

        <div className={styles.sliderViewport}>
          <AnimatePresence initial={false} custom={dir} mode="wait">
            <motion.div
              key={idx}
              className={styles.slide}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <img src={SLIDES[idx].src} alt={SLIDES[idx].caption} className={styles.slideImg} />
              <div className={styles.slideOverlay} />
              <motion.div
                className={styles.slideCaption}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className={styles.slideCaptionTitle}>{SLIDES[idx].caption}</div>
                <div className={styles.slideCaptionSub}>{SLIDES[idx].sub}</div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <motion.button
          className={`${styles.sliderArrow} ${styles.sliderArrowL}`}
          onClick={() => go(-1)}
          whileHover={{ scale: 1.15, x: -3 }}
          whileTap={{ scale: 0.9 }}
        >
          ❮
        </motion.button>
        <motion.button
          className={`${styles.sliderArrow} ${styles.sliderArrowR}`}
          onClick={() => go(1)}
          whileHover={{ scale: 1.15, x: 3 }}
          whileTap={{ scale: 0.9 }}
        >
          ❯
        </motion.button>

        {/* Dots */}
        <div className={styles.sliderDots}>
          {SLIDES.map((_, i) => (
            <motion.button
              key={i}
              className={`${styles.sliderDot} ${i === idx ? styles.sliderDotActive : ""}`}
              onClick={() => setIdx([i, i > idx ? 1 : -1])}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className={styles.sliderProgress}>
          <motion.div
            className={styles.sliderProgressBar}
            key={`prog-${idx}-${paused}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: paused ? undefined : 1 }}
            transition={{ duration: 4, ease: "linear" }}
          />
        </div>
      </motion.div>

    </section>
  );
}
