import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export const useStudy4Menu = () => {
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const container = useRef(null);
  const { contextSafe } = useGSAP();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const onHoverLink = contextSafe(
    ({ left, right }: { left: number; right: number }) => {
      gsap.to(leftImageRef.current, { y: left });
      gsap.to(rightImageRef.current, { y: right });
    },
  );

  const openMenuAnimation = contextSafe(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        const { isMobile } = context.conditions as {
          isMobile: boolean;
          isDesktop: boolean;
        };

        const tl = gsap.timeline();
        tl.to(container.current, { opacity: 1 })
          .to(container.current, {
            y: 0,
            delay: -0.5,
          })
          .to(".title", {
            color: "#232428",
            x: isMobile ? 0 : "-140%",
            delay: -0.5,
          })
          .to(".removable", {
            display: isMobile ? "none" : "block",
            delay: -0.9,
          });
      },
    );
  });

  const handleMenuClose = contextSafe(() => {
    const tl = gsap.timeline();
    tl.to(container.current, {
      y: "-100%",
      ease: "power1.inOut",
    })
      .to(container.current, {
        opacity: 0,
      })
      .to(".title", {
        color: "#fff",
        x: 0,
        delay: -1,
        onComplete: () => setIsMenuOpen(false),
      });
  });

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
    openMenuAnimation();
  };

  return {
    onHoverLink,
    container,
    leftImageRef,
    rightImageRef,
    handleMenuOpen,
    handleMenuClose,
    isMenuOpen,
  };
};
