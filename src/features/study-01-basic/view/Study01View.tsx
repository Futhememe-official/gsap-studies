import { useState } from "react";
import { PageLayout } from "@/shared/components/PageLayout";
import { useGsapAnimation } from "@/shared/hooks/useGsapAnimation";
import { useStudy01ViewModel } from "../viewmodel/study01.viewmodel";
import gsap from "gsap";
// @ts-ignore
import styles from "./Study01View.module.css";

export function Study01View() {
  const { boxes, easings, selectedEasing, setSelectedEasing } =
    useStudy01ViewModel();
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useGsapAnimation(() => {});

  function runDemo(type: "from" | "to" | "fromTo") {
    if (isAnimating) return;
    setIsAnimating(true);

    const targets = ".demo-box";

    if (type === "to") {
      gsap.to(targets, {
        x: 260,
        rotation: 360,
        duration: 1,
        stagger: 0.1,
        ease: selectedEasing,
        onComplete: () => setIsAnimating(false),
      });
    } else if (type === "from") {
      gsap.from(targets, {
        x: 260,
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        stagger: 0.08,
        ease: selectedEasing,
        onComplete: () => setIsAnimating(false),
      });
    } else {
      gsap.fromTo(
        targets,
        { x: 0, scale: 1 },
        {
          x: 260,
          scale: 1.3,
          duration: 0.6,
          stagger: 0.07,
          ease: selectedEasing,
          yoyo: true,
          repeat: 1,
          onComplete: () => setIsAnimating(false),
        },
      );
    }
  }

  function resetBoxes() {
    gsap.set(".demo-box", { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
  }

  return (
    <PageLayout
      title="Basic Animations"
      description="gsap.to(), gsap.from(), gsap.fromTo() e as funções de easing"
      tag="basic"
      tagColor="#e8ff47"
    >
      <div className={styles.content} ref={containerRef}>
        {/* Easing selector */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Easing</h2>
          <div className={styles.easingGrid}>
            {easings.map((ease) => (
              <button
                key={ease}
                className={`${styles.easingBtn} ${selectedEasing === ease ? styles.easingActive : ""}`}
                onClick={() => setSelectedEasing(ease)}
              >
                {ease}
              </button>
            ))}
          </div>
        </section>

        {/* Demo area */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Demo</h2>
          <div className={styles.demoArea}>
            <div className={styles.boxes}>
              {boxes.map((box) => (
                <div
                  key={box.id}
                  className={`${styles.box} demo-box`}
                  style={{ background: box.color }}
                />
              ))}
            </div>
          </div>

          <div className={styles.controls}>
            <button
              className={styles.btn}
              onClick={() => runDemo("from")}
              disabled={isAnimating}
            >
              gsap.from()
            </button>
            <button
              className={styles.btn}
              onClick={() => runDemo("to")}
              disabled={isAnimating}
            >
              gsap.to()
            </button>
            <button
              className={styles.btn}
              onClick={() => runDemo("fromTo")}
              disabled={isAnimating}
            >
              gsap.fromTo()
            </button>
            <button
              className={`${styles.btn} ${styles.btnReset}`}
              onClick={resetBoxes}
            >
              reset
            </button>
          </div>
        </section>

        {/* Code snippet */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Código</h2>
          <pre className={styles.code}>{`gsap.to('.demo-box', {
  x: 260,
  rotation: 360,
  duration: 1,
  stagger: 0.1,
  ease: '${selectedEasing}',
})`}</pre>
        </section>
      </div>
    </PageLayout>
  );
}
