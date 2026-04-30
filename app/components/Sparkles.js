"use client";
import { useEffect, useRef } from "react";
export default function Sparkles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let anim;
    const particles = [];
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    class P {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * c.width; this.y = Math.random() * c.height;
        this.s = Math.random() * 2 + .5; this.vx = (Math.random() - .5) * .2; this.vy = Math.random() * -.3 - .1;
        this.o = 0; this.max = Math.random() * .6 + .2; this.sp = Math.random() * .006 + .003;
        this.ph = "in"; this.r = Math.random() * Math.PI * 2; this.rv = (Math.random() - .5) * .015;
        this.col = Math.random() > .5 ? "rgba(212,175,55," : "rgba(232,204,110,";
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.r += this.rv;
        if (this.ph === "in") { this.o += this.sp; if (this.o >= this.max) this.ph = "out"; }
        else { this.o -= this.sp; if (this.o <= 0) this.reset(); }
      }
      draw() {
        ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.r);
        ctx.globalAlpha = Math.max(0, this.o);
        const sp = 4, out = this.s * 2, inn = this.s * .6;
        ctx.beginPath();
        for (let i = 0; i < sp * 2; i++) { const rad = i % 2 === 0 ? out : inn; const a = (i * Math.PI) / sp; i === 0 ? ctx.moveTo(Math.cos(a)*rad, Math.sin(a)*rad) : ctx.lineTo(Math.cos(a)*rad, Math.sin(a)*rad); }
        ctx.closePath(); ctx.fillStyle = `${this.col}${this.o})`; ctx.fill();
        ctx.beginPath(); ctx.arc(0, 0, out * 2, 0, Math.PI * 2);
        ctx.fillStyle = `${this.col}${this.o * .08})`; ctx.fill();
        ctx.restore();
      }
    }
    const n = Math.min(40, Math.floor((c.width * c.height) / 20000));
    for (let i = 0; i < n; i++) { const p = new P(); p.o = Math.random() * p.max; particles.push(p); }
    const loop = () => { ctx.clearRect(0, 0, c.width, c.height); particles.forEach(p => { p.update(); p.draw(); }); anim = requestAnimationFrame(loop); };
    loop();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(anim); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 3 }} />;
}
