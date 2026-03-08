import { PageLayout } from "@/shared/components/PageLayout";
// @ts-ignore
import styles from "./menu-view.module.css";
import { Menu } from "lucide-react";

export function Study4Menu() {
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
        <button>
          <Menu color="#fff" size={24} />
        </button>
      </header>
    </PageLayout>
  );
}
