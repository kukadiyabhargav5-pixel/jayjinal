"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../page.module.css";

const FLOWERS = ["🌸", "🌺", "🌷", "💐", "🌼", "💮", "✿", "❀"];
const SPARKS = ["✨", "🎆", "🎇", "💫", "⭐", "🌟", "🎊", "🎉"];

export default function ScratchDate() {
  const [revealed, setRevealed] = useState(false);
  const [particles, setParticles] = useState([]);
  const [audio, setAudio] = useState(null);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef(null);

  useEffect(() => {
    const snd = new Audio('https://actions.google.com/sounds/v1/crowds/crowd_cheer.ogg');
    snd.volume = 0.6;
    setAudio(snd);
  }, []);

  const spawnEffects = useCallback(() => {
    const p = [];
    for (let i = 0; i < 60; i++) {
      const isFlower = Math.random() > 0.4;
      const arr = isFlower ? FLOWERS : SPARKS;
      p.push({
        id: Date.now() + i,
        emoji: arr[Math.floor(Math.random() * arr.length)],
        x: Math.random() * 100, // starting X %
        y: isFlower ? -10 : 30 + Math.random() * 40, // starting Y %
        endY: isFlower ? 120 : -20 + Math.random() * 20, // ending Y %
        endX: (Math.random() - 0.5) * 60, // drift
        delay: Math.random() * 0.8,
        duration: 2 + Math.random() * 2.5,
        rotate: (Math.random() - 0.5) * 720,
        scale: 1 + Math.random() * 1.5,
      });
    }
    setParticles(p);
    setTimeout(() => setParticles([]), 6000);
  }, []);

  const handleReveal = useCallback(() => {
    if (revealed) return;
    setRevealed(true);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.log(e));
    }
    spawnEffects();
  }, [revealed, spawnEffects, audio]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    
    const resizeCanvas = () => {
        const parent = canvas.parentElement;
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width || 300;
        canvas.height = rect.height || 130;
        
        ctx.globalCompositeOperation = "source-over";
        
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, "#a68928"); 
        gradient.addColorStop(0.5, "#e8cc6e"); 
        gradient.addColorStop(1, "#a68928"); 
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = "bold 15px 'Montserrat', sans-serif";
        ctx.fillStyle = "#0a0a0a";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.letterSpacing = "4px";
        ctx.fillText("✦ SCRATCH TO REVEAL ✦", canvas.width / 2, canvas.height / 2);
    };

    resizeCanvas();
  }, []);

  const getPointerPos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    if (revealed) return;
    isDrawing.current = true;
    lastPos.current = getPointerPos(e);
  };

  const draw = (e) => {
    if (!isDrawing.current || revealed) return;
    if (e.cancelable) e.preventDefault();
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const currentPos = getPointerPos(e);
    
    if (!currentPos || !lastPos.current) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.lineWidth = 35;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    lastPos.current = currentPos;
    
    if (Math.random() < 0.25) {
      checkReveal();
    }
  };

  const stopDrawing = () => {
    if (isDrawing.current && !revealed) {
        checkReveal();
    }
    isDrawing.current = false;
  };

  const checkReveal = () => {
    if (revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    
    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;
      
      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] < 128) transparentPixels++;
      }
      
      const totalSampledPixels = Math.floor(pixels.length / 16);
      const percentScratched = (transparentPixels / totalSampledPixels) * 100;
      
      if (percentScratched > 40) {
        handleReveal();
      }
    } catch (e) {}
  };

  return (
    <>
      <section className={styles.scratchSec}>
        <motion.div
          className={styles.scratchTitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          ✦ Scratch to Reveal the Date ✦
        </motion.div>
        <motion.div
          className={styles.scratchBox}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.03 }}
        >
          <div className={styles.scratchContent}>
            <motion.div
              className={styles.scratchDateText}
              initial={{ scale: 0 }}
              animate={revealed ? { scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              10th May 2026
            </motion.div>
            <motion.div
              className={styles.scratchDayText}
              initial={{ opacity: 0 }}
              animate={revealed ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              Sunday · 04:30 PM
            </motion.div>
          </div>
          
          <canvas
            ref={canvasRef}
            className={`${styles.scratchCanvas} ${revealed ? styles.revealed : ""}`}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            onTouchCancel={stopDrawing}
            style={{ touchAction: 'none' }}
          />
        </motion.div>
      </section>

      <div className={styles.celebration} style={{ pointerEvents: "none", zIndex: 1000, position: "fixed", inset: 0 }}>
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ 
                opacity: 0, 
                x: `${p.x}vw`, 
                y: `${p.y}vh`, 
                scale: 0,
                rotate: 0 
              }}
              animate={{ 
                opacity: [0, 1, 1, 0], 
                x: `${p.x + p.endX}vw`, 
                y: `${p.endY}vh`,
                scale: p.scale,
                rotate: p.rotate
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: p.duration, 
                delay: p.delay,
                ease: "easeOut"
              }}
              style={{
                position: "absolute",
                fontSize: "2rem",
                display: "inline-block"
              }}
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
