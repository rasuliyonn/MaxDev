"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgX = useTransform(mouseX, [0, 1], ["-2%", "2%"]);
  const bgY = useTransform(mouseY, [0, 1], ["-2%", "2%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Gradient mesh background with parallax */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ x: bgX, y: bgY }}
      >
        {/* Main gradient orbs */}
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[100px]" />
        {/* Accent glow */}
        <div className="absolute right-1/3 top-1/3 h-[300px] w-[300px] rounded-full bg-fuchsia-500/10 blur-[80px]" />
      </motion.div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-purple-500/20",
              "bg-purple-500/5 px-4 py-1.5 text-sm font-medium text-purple-300 backdrop-blur-sm"
            )}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
            </span>
            Веб-студия полного цикла
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Разрабатываем{" "}
          <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
            современные сайты
          </span>
          , CRM-системы, ботов и скрипты под любые задачи
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-2xl text-lg text-white/60 sm:text-xl"
        >
          Создаем быстрые, красивые и прибыльные решения для бизнеса.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => scrollTo("#portfolio")}
            className={cn(
              "group inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold text-white",
              "bg-gradient-to-r from-purple-600 to-blue-600",
              "shadow-lg shadow-purple-500/25 transition-all duration-300",
              "hover:shadow-xl hover:shadow-purple-500/30 hover:brightness-110",
              "active:scale-[0.98]"
            )}
          >
            Посмотреть работы
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border border-white/10 px-8 py-3.5 text-base font-semibold text-white/90",
              "bg-white/5 backdrop-blur-sm transition-all duration-300",
              "hover:border-white/20 hover:bg-white/10",
              "active:scale-[0.98]"
            )}
          >
            <MessageCircle className="size-4" />
            Связаться
          </button>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
