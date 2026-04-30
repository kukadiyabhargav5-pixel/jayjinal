"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import DoorOpening from "./components/DoorOpening";
import Countdown from "./components/Countdown";
import Sparkles from "./components/Sparkles";
import ScratchDate from "./components/ScratchDate";
import ImageSlider from "./components/ImageSlider";

const DATE = "2026-05-10T16:30:00";
const d = (delay) => ({ duration: 1, delay, ease: [.16, 1, .3, 1] });
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [.16, 1, .3, 1] } } };

export default function Home() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (newTheme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  };

  return (
    <>
      {!open && <DoorOpening onOpen={() => setOpen(true)} />}
      {open && <Sparkles />}
      
      {open && (
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      )}

      <main className={`${styles.main} ${open ? styles.visible : ""}`}>
        {/* ═══════════════ HERO ═══════════════ */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={styles.heroGrad} />
          <div className={styles.heroParticles}>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.floatingOrb}
                style={{ left: `${15 + i * 15}%`, animationDelay: `${i * 0.8}s` }}
                animate={{ y: [0, -40, 0], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>

          <motion.div className={styles.frame}
            initial={{ opacity: 0, scale: .85, y: 20 }}
            animate={open ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.5, delay: .3, type: "spring", stiffness: 50, damping: 15 }}>

            <div className={styles.cTL} /><div className={styles.cTR} />
            <div className={styles.cBL} /><div className={styles.cBR} />
            <div className={styles.flourishTL} /><div className={styles.flourishTR} />
            <div className={styles.flourishBL} /><div className={styles.flourishBR} />

            <motion.div className={styles.headerLabel}
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={open ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ ...d(.8), type: "spring", stiffness: 100 }}>
              ✦ You Are Cordially Invited ✦
            </motion.div>

            <motion.div className={styles.headerSub}
              initial={{ opacity: 0, letterSpacing: "0px" }}
              animate={open ? { opacity: 1, letterSpacing: "3px" } : {}}
              transition={{ ...d(1), duration: 1.5 }}>
              to the Ring Ceremony of
            </motion.div>

            <motion.div className={styles.divider}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={open ? { opacity: 1, scaleX: 1 } : {}}
              transition={d(1.2)}>
              <div className={styles.divLine} /><span className={styles.divIcon}>❖</span><div className={styles.divLine} />
            </motion.div>

            <motion.div className={styles.namesWrap}
              initial={{ opacity: 0, scale: .3 }}
              animate={open ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.5, delay: 1.5, type: "spring", stiffness: 60, damping: 12 }}>
              <motion.span className={styles.groom}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}>Jay</motion.span>
              <motion.span className={styles.amp}
                initial={{ opacity: 0, rotate: -180, scale: 0 }}
                animate={open ? { opacity: .7, rotate: 0, scale: 1 } : {}}
                transition={{ ...d(2), type: "spring", stiffness: 80 }}>&amp;</motion.span>
              <motion.span className={styles.bride}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}>Jinal</motion.span>
            </motion.div>

            <motion.div className={styles.eventLabel}
              initial={{ opacity: 0, y: 20, letterSpacing: "0px" }}
              animate={open ? { opacity: 1, y: 0, letterSpacing: "7px" } : {}}
              transition={{ ...d(2.3), duration: 1.5 }}>
              ❦ Engagement Ceremony ❦
            </motion.div>

          </motion.div>

          <motion.div className={styles.scrollHint}
            initial={{ opacity: 0, y: 20 }}
            animate={open ? { opacity: 1, y: 0 } : {}}
            transition={d(3.5)}
            whileHover={{ y: 5 }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}>
            <span className={styles.scrollArrow}>▼</span>
            <span className={styles.scrollText}>Scroll Down</span>
          </motion.div>
        </section>

        {/* ═══════════════ SCRATCH DATE ═══════════════ */}
        <ScratchDate />

        {/* ═══════════════ COUNTDOWN ═══════════════ */}
        <Countdown targetDate={DATE} />

        {/* ═══════════════ LOVE STORY QUOTE ═══════════════ */}
        <section className={styles.quoteSec}>
          <div className={styles.quoteGlow} />
          <motion.div className={styles.quoteFrame}
            initial={{ opacity: 0, y: 60, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
            whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(212,175,55,0.2)" }}>
            <div className={styles.cTL} /><div className={styles.cTR} />
            <div className={styles.cBL} /><div className={styles.cBR} />

            <motion.div className={styles.quoteIcon}
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 80 }}>
              ❝
            </motion.div>

            <motion.p className={styles.quoteText}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}>
              Two souls, two hearts, one beautiful journey that begins with a promise of forever. Love found its way, and now we celebrate the moment their stars aligned.
            </motion.p>

            <motion.div className={styles.quoteDivider}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}>
              <div className={styles.divLine} /><span className={styles.divIcon}>♥</span><div className={styles.divLine} />
            </motion.div>

            <motion.p className={styles.quoteBody}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 1 }}>
              With the blessings of our beloved families, we are delighted to invite you to witness the sacred moment when <strong>Jay</strong> and <strong>Jinal</strong> begin their beautiful journey together. Your presence will add warmth and joy to this auspicious occasion. Join us as we celebrate the union of two hearts bound by love, respect, and an everlasting promise.
            </motion.p>

            <motion.div className={styles.quoteSignature}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.8 }}>
              — Jay & Jinal ♥
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════ IMAGE SLIDER ═══════════════ */}
        <ImageSlider />

        {/* ═══════════════ EVENT DETAILS ═══════════════ */}
        <section className={styles.eventSec}>
          <motion.div className={styles.eventHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <div className={styles.eventHeaderIcon}>📅</div>
            <h2 className={styles.eventHeaderTitle}>Event Details</h2>
            <div className={styles.eventHeaderSub}>Everything you need to know</div>
            <div className={styles.divider} style={{ margin: "1rem auto 0", width: "35%" }}>
              <div className={styles.divLine} /><span className={styles.divIcon}>✦</span><div className={styles.divLine} />
            </div>
          </motion.div>

          <div className={styles.eventGrid}>
            {[
              { icon: "📅", title: "Date", value: "10th May 2026", sub: "Sunday" },
              { icon: "⏰", title: "Time", value: "04:30 PM", sub: "Onwards" },
              { icon: "👗", title: "Dress Code", value: "Traditional", sub: "Indian Ethnic Wear" },
              { icon: "🎊", title: "Event", value: "Ring Ceremony", sub: "Engagement" },
            ].map((item, i) => (
              <motion.div key={i} className={styles.eventCard}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.04, boxShadow: "0 15px 50px rgba(212,175,55,0.2)" }}>
                <div className={styles.cTL} /><div className={styles.cTR} />
                <div className={styles.cBL} /><div className={styles.cBR} />
                <motion.div className={styles.eventCardIcon}
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}>{item.icon}</motion.div>
                <div className={styles.eventCardTitle}>{item.title}</div>
                <div className={styles.eventCardValue}>{item.value}</div>
                <div className={styles.eventCardSub}>{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════ BHOJAN SAMARAMBH ═══════════════ */}
        <section className={styles.bhojanSec}>
          <motion.div className={styles.bhojanFrame}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 60 }}
            whileHover={{ y: -6, borderColor: "rgba(212,175,55,.45)", boxShadow: "0 0 40px rgba(212,175,55,.12)" }}>
            <div className={styles.cTL} /><div className={styles.cTR} />
            <div className={styles.cBL} /><div className={styles.cBR} />
            
            <motion.div className={styles.bhojanIcon}
              whileHover={{ scale: 1.3, rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}>🍽️</motion.div>
            <h2 className={styles.bhojanTitle}>ભોજન સમારંભ</h2>
            <div className={styles.divider} style={{ margin: "0.5rem auto 1.5rem", width: "40%" }}>
              <div className={styles.divLine} /><span className={styles.divIcon}>✦</span><div className={styles.divLine} />
            </div>
            <div className={styles.bhojanText}>
              આ શુભ પ્રસંગે યોજેલ ભોજન<br />
              સમારભમાં સાંજે ૦૭:૦૦ કલાકે<br />
              આપ શ્રી <span className={styles.bhojanHighlight}>સર્વો</span> પધારશોજી.
            </div>
          </motion.div>
        </section>

        {/* ═══════════════ VENUE ═══════════════ */}
        <section className={styles.venueSec}>
          <motion.div className={styles.venueHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <div className={styles.venueHeaderIcon}>📍</div>
            <h2 className={styles.venueHeaderTitle}>Venue</h2>
            <div className={styles.venueHeaderSub}>Where the magic happens</div>
          </motion.div>

          <motion.div className={styles.venueFrame}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 60 }}
            whileHover={{ y: -6 }}>
            <div className={styles.cTL} /><div className={styles.cTR} />
            <div className={styles.cBL} /><div className={styles.cBR} />

            <div className={styles.venueInner}>
              <motion.div className={styles.venueIcon}
                whileHover={{ scale: 1.3, rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}>🏛️</motion.div>
              <div className={styles.venueName}>&ldquo;બંસરી રીસોર્ટ&rdquo;</div>
              <div className={styles.divider} style={{ margin: "0.5rem auto", width: "50%" }}>
                <div className={styles.divLine} /><span className={styles.divIcon}>✦</span><div className={styles.divLine} />
              </div>
              <div className={styles.venueAddr}>ચેહર માતા મંદિરની આગળ,<br />પાસોદરા રોડ, સુરત.</div>
              <div className={styles.venueTime}>Sunday · 10 May 2026 · 04:30 PM Onwards</div>
            </div>

            <motion.div className={styles.venueMapWrap}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}>
              <iframe
                className={styles.venueMap}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.0!2d72.85!3d21.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sin!4v1"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue Map"
              />
            </motion.div>

            <motion.a href="https://maps.app.goo.gl/KwRQPzkFugx6Ztvz7" target="_blank" rel="noopener noreferrer" className={styles.mapBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              📍 Get Directions on Google Maps
            </motion.a>
          </motion.div>
        </section>

        {/* ═══════════════ NIMANTRAK ═══════════════ */}
        <section className={styles.nimantrakSec}>
          <motion.div className={styles.nimantrakHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <div className={styles.nimantrakHeaderIcon}>🙏</div>
            <h2 className={styles.nimantrakHeaderTitle}>નિમંત્રક</h2>
            <div className={styles.nimantrakHeaderSub}>With the blessings of our elders</div>
            <div className={styles.divider} style={{ margin: "1rem auto 0", width: "35%" }}>
              <div className={styles.divLine} /><span className={styles.divIcon}>✦</span><div className={styles.divLine} />
            </div>
          </motion.div>

          <motion.div className={styles.nimantrakFrame}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 60 }}
            whileHover={{ y: -6 }}>
            <div className={styles.cTL} /><div className={styles.cTR} />
            <div className={styles.cBL} /><div className={styles.cBR} />

            <motion.div className={styles.nimantrakList}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}>
              {[
                "શ્રી ગોબરભાઈ નરસિંહભાઈ પાઘડાળ",
                "શ્રી મનસુખભાઈ ગોબરભાઈ પાઘડાળ",
                "સ્વ. કમલેશભાઈ ગોબરભાઈ પાઘડાળ",
                "શ્રી અશ્વિનભાઈ ગોબરભાઈ પાઘડાળ",
              ].map((name, i) => (
                <motion.div key={i} className={styles.nimantrakName} variants={fadeUp}
                  whileHover={{ x: 8, backgroundColor: "rgba(212,175,55,0.06)" }}
                  transition={{ type: "spring", stiffness: 200 }}>
                  <div className={styles.nimantrakNameText}>{name}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════ BLESSINGS MESSAGE ═══════════════ */}
        <section className={styles.msgSec}>
          <motion.div className={styles.msgHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <div className={styles.msgHeaderIcon}>✉</div>
            <h2 className={styles.msgHeaderTitle}>A Heartfelt Message</h2>
            <div className={styles.divider} style={{ margin: "1rem auto 0", width: "30%" }}>
              <div className={styles.divLine} /><span className={styles.divIcon}>♥</span><div className={styles.divLine} />
            </div>
          </motion.div>

          <motion.div className={styles.msgCard}
            initial={{ opacity: 0, y: 60, rotateX: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            whileHover={{ y: -6 }}>
            <div className={styles.cTL} /><div className={styles.cTR} />
            <div className={styles.cBL} /><div className={styles.cBR} />

            <motion.p className={styles.msgQuote}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: .3, type: "spring", stiffness: 80 }}>
              &ldquo;Where there is love, there is life.&rdquo;
            </motion.p>

            <motion.p className={styles.msgBody}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: .5, duration: 1 }}>
              Your blessings and good wishes mean the world to us. We are truly grateful for the love and support you have shown us throughout our journey. As we take this beautiful step together, we humbly request your presence to shower us with your love and blessings. Together, let us create beautiful memories that will last a lifetime.
            </motion.p>

            <motion.p className={styles.msgBody}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: .7, duration: 1 }}>
              This celebration is a moment of immense joy for our families. The bond between <strong>Jay</strong> and <strong>Jinal</strong> is not just a union of two hearts but a coming together of two families, two dreams, and two souls destined to walk this path of life together.
            </motion.p>

            <motion.div className={styles.msgEmoji}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.3, rotate: 15 }}>
              💍
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════ FOOTER ═══════════════ */}
        <footer className={styles.footer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}>

            <motion.div className={styles.footBrand}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 80 }}>
              Bharti Graphic
            </motion.div>

            <motion.div className={styles.footNames}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}>Jay & Jinal</motion.div>

            <motion.div className={styles.footHeart}
              whileHover={{ scale: 1.6, rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}>♥</motion.div>

            <div className={styles.footDate}>Sunday · 10 May 2026 · 04:30 PM</div>

            <div className={styles.divider} style={{ margin: "1.5rem auto", width: "25%" }}>
              <div className={styles.divLine} /><span className={styles.divIcon}>✦</span><div className={styles.divLine} />
            </div>

            <motion.div className={styles.footTagline}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}>
              Made with ♥ by Bharti Graphic
            </motion.div>

            <motion.div className={styles.footRings}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              💍
            </motion.div>
          </motion.div>
        </footer>
      </main>
    </>
  );
}
