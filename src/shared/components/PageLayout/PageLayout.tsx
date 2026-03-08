import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
// @ts-ignore
import styles from "./PageLayout.module.css";

interface PageLayoutProps {
  title: string;
  description?: string;
  tag?: string;
  tagColor?: string;
  children: React.ReactNode;
  removePadding?: boolean;
}

export function PageLayout({
  title,
  description,
  tag,
  tagColor,
  children,
  removePadding,
}: PageLayoutProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-header-content > *", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.layout}>
      <header className={styles.header} ref={headerRef}>
        <div className={`${styles.headerContent} page-header-content`}>
          <Link to="/" className={styles.back}>
            <span className={styles.backArrow}>←</span>
            <span>voltar</span>
          </Link>
          <div className={styles.meta}>
            {tag && (
              <span
                className={styles.tag}
                style={{ "--tag-color": tagColor } as React.CSSProperties}
              >
                {tag}
              </span>
            )}
          </div>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </header>
      <main className={styles.main} style={removePadding ? { padding: 0 } : {}}>
        {children}
      </main>
    </div>
  );
}
