import { useRef, useState } from "react";
import { PageLayout } from "@/shared/components/PageLayout";
import { useTimeline } from "@/shared/hooks/useGsapAnimation";
// @ts-ignore
import styles from "./Study03View.module.css";

export function Study03View() {
  const [isPlaying, setIsPlaying] = useState(false);
  const externalTlRef = useRef<gsap.core.Timeline | null>(null);

  const { containerRef } = useTimeline((tl) => {
    externalTlRef.current = tl;

    tl.paused(true)
      .from(".tl-logo", {
        scale: 0,
        rotation: -180,
        duration: 0.6,
        ease: "back.out(2)",
      })
      .from(
        ".tl-title span",
        { y: "100%", duration: 0.5, stagger: 0.04, ease: "power3.out" },
        "-=0.2",
      )
      .from(".tl-subtitle", { opacity: 0, y: 12, duration: 0.4 }, "-=0.1")
      .from(
        ".tl-btn",
        { opacity: 0, y: 16, duration: 0.4, stagger: 0.08, ease: "power2.out" },
        "-=0.1",
      )
      .from(
        ".tl-bar",
        { scaleX: 0, duration: 0.8, stagger: 0.1, ease: "power2.inOut" },
        "-=0.3",
      );
  });

  function togglePlay() {
    const tl = externalTlRef.current;
    if (!tl) return;

    if (tl.paused() || tl.progress() === 1) {
      tl.restart();
      setIsPlaying(true);
      tl.eventCallback("onComplete", () => setIsPlaying(false));
    } else {
      tl.paused(!tl.paused());
      setIsPlaying(!tl.paused());
    }
  }

  function reverseTimeline() {
    externalTlRef.current?.reverse();
    setIsPlaying(false);
  }

  const BARS = [
    { label: "React", value: 92, color: "#06b6d4" },
    { label: "GSAP", value: 78, color: "#e8ff47" },
    { label: "TypeScript", value: 85, color: "#7c3aed" },
    { label: "CSS", value: 88, color: "#f43f5e" },
    { label: "Node.js", value: 71, color: "#10b981" },
  ];

  return (
    <PageLayout
      title="Timeline"
      description="Sequências orquestradas com gsap.timeline() e position parameter"
      tag="timeline"
      tagColor="#7c3aed"
    >
      <div ref={containerRef}>
        {/* Demo card */}
        <section className={styles.demoWrap}>
          <div className={styles.demoCard}>
            <div className={`${styles.logo} tl-logo`}>
              <span>TL</span>
            </div>

            <div className={styles.titleArea}>
              <h3 className={`${styles.tlTitle} tl-title`}>
                {"Timeline Demo".split("").map((ch, i) => (
                  <span
                    key={i}
                    style={{ display: "inline-block", overflow: "hidden" }}
                  >
                    <span style={{ display: "inline-block" }}>
                      {ch === " " ? "\u00A0" : ch}
                    </span>
                  </span>
                ))}
              </h3>
              <p className={`${styles.tlSubtitle} tl-subtitle`}>
                Cada elemento animado em sequência
              </p>
            </div>

            <div className={styles.btnRow}>
              {["Play", "Pause", "Restart"].map((label) => (
                <span key={label} className={`${styles.demoBtn} tl-btn`}>
                  {label}
                </span>
              ))}
            </div>

            <div className={styles.bars}>
              {BARS.map((bar) => (
                <div key={bar.label} className={styles.barRow}>
                  <span className={styles.barLabel}>{bar.label}</span>
                  <div className={styles.barTrack}>
                    <div
                      className={`${styles.barFill} tl-bar`}
                      style={{
                        width: `${bar.value}%`,
                        background: bar.color,
                        transformOrigin: "left",
                      }}
                    />
                  </div>
                  <span className={styles.barValue}>{bar.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className={styles.controls}>
          <button
            className={`${styles.btn} ${isPlaying ? styles.btnActive : ""}`}
            onClick={togglePlay}
          >
            {isPlaying ? "⏸ pausar" : "▶ play"}
          </button>
          <button className={styles.btn} onClick={reverseTimeline}>
            ↩ reverse
          </button>
        </section>

        {/* Position parameter explanation */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Position Parameter</h2>
          <div className={styles.posGrid}>
            {[
              { pos: '"+=0.5"', desc: "0.5s após o fim da última animação" },
              { pos: '"-=0.3"', desc: "0.3s antes do fim (overlap)" },
              { pos: '"<"', desc: "Junto com o início da anterior" },
              { pos: '"<0.2"', desc: "0.2s após o início da anterior" },
              { pos: "1.5", desc: "Exatamente em 1.5s da timeline" },
            ].map(({ pos, desc }) => (
              <div key={pos} className={styles.posCard}>
                <code className={styles.posCode}>{pos}</code>
                <p className={styles.posDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
