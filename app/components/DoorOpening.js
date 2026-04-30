"use client";
import { useState, useCallback, useEffect } from "react";
import styles from "../page.module.css";

export default function DoorOpening({ onOpen }) {
  const [opened, setOpened] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Using a reliable public sound library from Google Actions for a magical wooden door
    const snd = new Audio('https://actions.google.com/sounds/v1/doors/wood_door_open.ogg');
    snd.volume = 1.0;
    setAudio(snd);
  }, []);

  const handleOpen = useCallback(() => {
    if (opened) return;
    setOpened(true);
    
    // Play the door opening sound
    if (audio) {
      audio.play().catch(err => console.warn("Audio play blocked by browser interaction policy:", err));
    }

    // Wait for the smooth CSS transition (3s) before fully opening main content
    setTimeout(() => onOpen?.(), 2500);
  }, [opened, onOpen, audio]);

  return (
    <div className={`${styles.doorOverlay} ${opened ? styles.opened : ""}`}>
      <div className={styles.doorWrap}>
        <div className={styles.doorLeft}>
          <div className={styles.doorDiamond} style={{ top: "30%" }} />
          <div className={styles.doorDiamond} style={{ bottom: "30%" }} />
        </div>
        <div className={styles.doorRight}>
          <div className={styles.doorDiamond} style={{ top: "30%" }} />
          <div className={styles.doorDiamond} style={{ bottom: "30%" }} />
        </div>
      </div>
      <div className={styles.doorTitle}>Engagement Ceremony</div>
      <div className={styles.doorCenter} onClick={handleOpen}>
        <div className={styles.doorBtn}>
          <span className={styles.doorBtnIcon}>☙</span>
          <span className={styles.doorBtnText} style={{ textAlign: 'center' }}>Bharti Graphic</span>
        </div>
        <span className={styles.doorSubtext}>tap to open the doors</span>
      </div>
    </div>
  );
}
