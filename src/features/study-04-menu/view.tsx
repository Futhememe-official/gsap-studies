import { PageLayout } from "@/shared/components/PageLayout";
// @ts-ignore
import styles from "./menu-view.module.css";
import { Menu } from "lucide-react";
import { useStudy4Menu } from "./view.model";

export function Study4Menu() {
  const {
    container,
    leftImageRef,
    rightImageRef,
    onHoverLink,
    isMenuOpen,
    handleMenuOpen,
    handleMenuClose,
  } = useStudy4Menu();

  return (
    <PageLayout
      title="Menu"
      description="Menu expansivo e animado via gsap"
      tag="advanced"
      tagColor="#D9D9D9"
      removePadding
    >
      <header className={`${styles.header}`}>
        <div />
        <p>WithGu</p>
        <button
          onClick={() => {
            if (isMenuOpen) {
              handleMenuClose();
            } else {
              handleMenuOpen();
            }
          }}
        >
          <Menu color="#fff" size={24} />
        </button>
      </header>
      <nav className={`${styles.nav}`} ref={container}>
        <div className={`${styles.navContent}`}>
          <div className={`${styles.leftImageHolder}`} ref={leftImageRef} />
          <div className={`${styles.links}`}>
            <h2
              onMouseEnter={() => {
                onHoverLink({ left: 25, right: -25 });
              }}
              onMouseLeave={() => {
                onHoverLink({ left: 0, right: 0 });
              }}
            >
              Portfolio
            </h2>
            <h2
              onMouseEnter={() => {
                onHoverLink({ left: 0, right: 0 });
              }}
              onMouseLeave={() => {
                onHoverLink({ left: 0, right: 0 });
              }}
            >
              About
            </h2>
            <h2
              onMouseEnter={() => {
                onHoverLink({ left: -25, right: 25 });
              }}
              onMouseLeave={() => {
                onHoverLink({ left: 0, right: 0 });
              }}
            >
              Contact
            </h2>
          </div>
          <div className={`${styles.rightImageHolder}`} ref={rightImageRef} />
        </div>
        <footer className={`${styles.navFooter}`}>
          <div>
            <a href="#">Instagram</a>
            <a href="#">Github</a>
          </div>
          <button>call to action</button>
        </footer>
      </nav>
    </PageLayout>
  );
}
