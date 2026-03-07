import { PageLayout } from "@/shared/components/PageLayout";
import { useScrollAnimation } from "@/shared/hooks/useGsapAnimation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
// @ts-ignore
import styles from "./Study02View.module.css";

gsap.registerPlugin(ScrollTrigger);

export function Study02View() {
  const containerRef = useScrollAnimation((ctx) => {
    // Fade in cards on scroll
    ctx.add(() => {
      gsap.utils.toArray<HTMLElement>(".scroll-card").forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    // Horizontal scrub
    ctx.add(() => {
      const track = document.querySelector(".h-track") as HTMLElement;
      if (!track) return;

      const items = gsap.utils.toArray<HTMLElement>(".h-item");
      const totalWidth = items.reduce(
        (acc, el) => acc + el.offsetWidth + 24,
        0,
      );

      gsap.to(track, {
        x: -(totalWidth - window.innerWidth + 96),
        ease: "none",
        scrollTrigger: {
          trigger: ".h-scroll-section",
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
        },
      });
    });

    // Progress bar
    ctx.add(() => {
      gsap.to(".progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    });
  });

  const CARDS = [
    { title: "Fade In", desc: "Elemento aparece ao entrar na viewport" },
    { title: "Toggle Actions", desc: "play / pause / resume / reverse" },
    { title: "Start & End", desc: "Controle preciso do gatilho de scroll" },
    { title: "Scrub", desc: "Sincroniza a animação com o scroll" },
    { title: "Pin", desc: "Fixa o elemento durante o scroll" },
    { title: "Markers", desc: "Visualize start/end durante dev" },
  ];

  return (
    <PageLayout
      title="ScrollTrigger"
      description="Animações acionadas e controladas pelo scroll"
      tag="scroll"
      tagColor="#ff6b35"
    >
      <div ref={containerRef}>
        {/* Progress bar */}
        <div className={styles.progressTrack}>
          <div className={`${styles.progressBar} progress-bar`} />
        </div>

        {/* Fade cards */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Scroll para revelar</h2>
          <div className={styles.cardGrid}>
            {CARDS.map((c) => (
              <div key={c.title} className={`${styles.scrollCard} scroll-card`}>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Horizontal scroll section */}
        <section className={`${styles.hScrollSection} h-scroll-section`}>
          <div className={`${styles.hTrack} h-track`}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`${styles.hItem} h-item`}
                style={{ "--hue": `${i * 45}deg` } as React.CSSProperties}
              >
                <span className={styles.hItemNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.hItemLabel}>Item</span>
              </div>
            ))}
          </div>
        </section>

        <div className={styles.spacer} />
      </div>
    </PageLayout>
  );
}
