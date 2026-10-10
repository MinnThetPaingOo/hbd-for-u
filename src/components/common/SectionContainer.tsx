"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { cn, staggerContainer } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  noPadding?: boolean;
}

export default function SectionContainer({
  children,
  className,
  id,
  noPadding = false,
}: SectionContainerProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden",
        !noPadding && "section-padding",
        className
      )}
    >
      <motion.div
        className="section-container"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {children}
      </motion.div>
    </section>
  );
}
