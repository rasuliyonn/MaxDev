"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FolderKanban, Users, Clock, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    icon: FolderKanban,
    value: 150,
    suffix: "+",
    label: "проектов",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: Users,
    value: 120,
    suffix: "+",
    label: "клиентов",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Clock,
    value: 5,
    suffix: "+",
    label: "лет опыта",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Monitor,
    value: 50,
    suffix: "+",
    label: "поддерживаемых сайтов",
    gradient: "from-fuchsia-500 to-pink-500",
  },
];

function AnimatedCounter({
  target,
  suffix,
  isInView,
}: {
  target: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    let raf: number;

    const step = () => {
      start += increment;
      if (start >= target) {
        setCount(target);
        return;
      }
      setCount(Math.floor(start));
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 sm:py-32">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-blue-500/5" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div
                className={cn(
                  "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl",
                  "bg-gradient-to-br shadow-lg",
                  stat.gradient
                )}
              >
                <stat.icon className="size-7 text-white" />
              </div>

              <div className="mb-2 text-4xl font-bold tracking-tight text-white lg:text-5xl">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </div>

              <p className="text-sm font-medium uppercase tracking-wider text-white/40">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
