"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "../page.module.css";

function FlipNum({ value, label }) {
  const [val, setVal] = useState(value);
  const [flip, setFlip] = useState(false);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value) {
      setFlip(true);
      const t = setTimeout(() => { setVal(value); setFlip(false); prev.current = value; }, 200);
      return () => clearTimeout(t);
    }
  }, [value]);
  return (
    <motion.div className={styles.countItem} whileHover={{ y: -6, scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <div className={styles.countNum} style={{ transform: flip ? "rotateX(-90deg)" : "rotateX(0)", transition: "transform .25s cubic-bezier(.4,0,.2,1)", opacity: flip ? 0.3 : 1 }}>
        {String(val).padStart(2, "0")}
      </div>
      <div className={styles.countLbl}>{label}</div>
    </motion.div>
  );
}

export default function Countdown({ targetDate }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return setT({ d: 0, h: 0, m: 0, s: 0 });
      setT({ d: Math.floor(diff / 864e5), h: Math.floor((diff % 864e5) / 36e5), m: Math.floor((diff % 36e5) / 6e4), s: Math.floor((diff % 6e4) / 1e3) });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <section className={styles.countSec}>
      <motion.h2 className={styles.countHead} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        Counting Down to <span>Our Special Day</span>
      </motion.h2>
      <div className={styles.countGrid}>
        {[{ v: t.d, l: "Days" }, { v: t.h, l: "Hours" }, { v: t.m, l: "Minutes" }, { v: t.s, l: "Seconds" }].map((item, i) => (
          <motion.div key={item.l} initial={{ opacity: 0, scale: 0.5, y: 40 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12, type: "spring", stiffness: 120 }}>
            <FlipNum value={item.v} label={item.l} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
