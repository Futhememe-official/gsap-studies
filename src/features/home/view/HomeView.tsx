import { useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { useHomeViewModel } from "../viewmodel/home.viewmodel";
import { STUDY_TAG_COLORS } from "@/shared/models/StudyRoute.model";
// @ts-ignore
import styles from "./HomeView.module.css";

export function HomeView() {
  const {
    filteredStudies,
    availableTags,
    activeFilter,
    setActiveFilter,
    totalCount,
  } = useHomeViewModel();

  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Hero entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-line", {
        y: "110%",
        duration: 0.9,
        stagger: 0.12,
        ease: "power4.out",
      })
        .from(
          ".hero-meta",
          {
            opacity: 0,
            y: 16,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".hero-badge",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(2)",
          },
          "-=0.3",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Cards entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".study-card", {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.6,
      });
    }, gridRef);

    return () => ctx.revert();
  }, [filteredStudies]);

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroInner}>
          <div className={styles.heroTop}>
            <span className={`${styles.badge} hero-badge`}>
              <span className={styles.dot} />
              {totalCount} estudos
            </span>
          </div>

          <div className={styles.titleWrap}>
            <div className={styles.titleLine}>
              <span className={`${styles.titleText} hero-line`}>GSAP</span>
            </div>
            <div className={styles.titleLine}>
              <span
                className={`${styles.titleText} ${styles.titleOutline} hero-line`}
              >
                Studies
              </span>
            </div>
          </div>

          <p className={`${styles.subtitle} hero-meta`}>
            Laboratório de animações com GSAP. Cada rota é um estudo
            <br />
            isolado — explore, modifique, quebre e aprenda.
          </p>

          <div className={`${styles.stack} hero-meta`}>
            {["Vite", "React 19", "TanStack Router", "GSAP 3"].map((tech) => (
              <span key={tech} className={styles.techPill}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.heroDecor}>
          <div className={styles.circle1} />
          <div className={styles.circle2} />
          <div className={styles.grid} />
        </div>
      </section>

      {/* Studies Section */}
      <section className={styles.studies}>
        <div className={styles.studiesHeader}>
          <h2 className={styles.sectionTitle}>
            Estudos
            <span className={styles.sectionCount}>
              {filteredStudies.length}
            </span>
          </h2>

          <div className={styles.filters}>
            {availableTags.map((tag) => (
              <button
                key={tag}
                className={`${styles.filterBtn} ${activeFilter === tag ? styles.filterActive : ""}`}
                onClick={() => setActiveFilter(tag)}
                style={
                  activeFilter === tag && tag !== "all"
                    ? ({
                        "--filter-color": STUDY_TAG_COLORS[tag],
                      } as React.CSSProperties)
                    : undefined
                }
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {filteredStudies.map((study, i) => (
            <Link
              key={study.id}
              to={study.path}
              className={`${styles.card} study-card`}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <span
                    className={styles.cardTag}
                    style={{ color: STUDY_TAG_COLORS[study.tag] }}
                  >
                    {study.tag}
                  </span>
                  <span className={styles.cardNumber}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className={styles.cardTitle}>{study.title}</h3>
                <p className={styles.cardDesc}>{study.description}</p>

                <div className={styles.cardFooter}>
                  <span
                    className={styles.difficulty}
                    data-level={study.difficulty}
                  >
                    {study.difficulty}
                  </span>
                  <span className={styles.cardArrow}>→</span>
                </div>
              </div>

              <div
                className={styles.cardAccent}
                style={{ background: STUDY_TAG_COLORS[study.tag] }}
              />
            </Link>
          ))}

          {/* Add new study placeholder */}
          <div className={`${styles.card} ${styles.cardAdd} study-card`}>
            <div className={styles.cardInner}>
              <span className={styles.addIcon}>+</span>
              <p className={styles.addText}>Adicionar estudo</p>
              <p className={styles.addHint}>
                Crie uma nova rota em <code>src/features</code>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
