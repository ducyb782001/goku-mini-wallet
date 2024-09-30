"use client";

import BigNumber from "bignumber.js";
import {
  KeyframeOptions,
  animate,
  useInView,
  useIsomorphicLayoutEffect,
} from "framer-motion";
import { useRef } from "react";

type AnimatedCounterProps = {
  from: number;
  to: number;
  animationOptions?: KeyframeOptions;
};

const AnimatedCounter = ({
  from,
  to,
  animationOptions,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const calculatedDuration = new BigNumber(to)
      .minus(Number(from))
      .multipliedBy(3600)
      .toNumber();
    console.log(
      "🚀 ~ useIsomorphicLayoutEffect ~ calculatedDuration:",
      calculatedDuration
    );
    if (!calculatedDuration) return;
    if (Number(from) >= Number(to)) {
      element.textContent = String(to);
      return;
    }

    if (!inView) return;
    element.textContent = String(from);

    const controls = animate(from, to, {
      duration: calculatedDuration,
      ease: "linear",
      ...animationOptions,
      onUpdate(value) {
        // Set the value with the correct number of decimal places
        element.textContent = value.toFixed(4);
      },
    });

    // Cancel on unmount
    return () => {
      controls.stop();
    };
  }, [ref, inView, from, to]);

  return <span ref={ref} className="text-3xl font-semibold" />;
};

export default AnimatedCounter;
