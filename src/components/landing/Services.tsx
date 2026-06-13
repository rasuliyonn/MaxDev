"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Code, Database, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Globe,
    title: "Разработка сайтов",
    description:
      "Создаем современные, адаптивные и быстрые веб-сайты любой сложности с упором на конверсию и пользовательский опыт.",
    items: ["Landing Page", "Корпоративные сайты", "Интернет-магазины", "Сервисы и SaaS"],
    gradient: "from-purple-500 to-blue-500",
    glow: "group-hover:shadow-purple-500/20",
  },
  {
    icon: Code,
    title: "Разработка скриптов",
    description:
      "Пишем скрипты и утилиты для автоматизации любых задач: от парсинга данных до управления браузером.",
    items: ["Python", "JavaScript", "Browser Automation Studio", "Telegram-боты", "Парсеры"],
    gradient: "from-blue-500 to-cyan-500",
    glow: "group-hover:shadow-blue-500/20",
  },
  {
    icon: Database,
    title: "CRM-системы",
    description:
      "Разрабатываем кастомные CRM-системы для полного контроля над бизнес-процессами и аналитикой.",
    items: ["Управление товарами", "Аналитика", "Склад", "Продажи"],
    gradient: "from-violet-500 to-purple-500",
    glow: "group-hover:shadow-violet-500/20",
  },
  {
    icon: Zap,
    title: "Автоматизация бизнеса",
    description:
      "Автоматизируем рутинные процессы и интегрируем сервисы между собой для экономии времени и ресурсов.",
    items: ["Интеграции", "API", "Чат-боты", "Автоматизация процессов"],
    gradient: "from-amber-500 to-orange-500",
    glow: "group-hover:shadow-amber-500/20",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Наши{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              услуги
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/50">
            Полный спектр услуг для создания и развития вашего цифрового присутствия
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/5",
                "bg-white/[0.03] p-6 backdrop-blur-sm",
                "shadow-xl transition-shadow duration-500",
                service.glow
              )}
            >
              {/* Glow border on hover */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                  "bg-gradient-to-b p-px",
                  service.gradient
                )}
                style={{
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: "1px",
                }}
              />

              {/* Icon */}
              <div
                className={cn(
                  "mb-4 flex h-12 w-12 items-center justify-center rounded-xl",
                  "bg-gradient-to-br",
                  service.gradient,
                  "shadow-lg"
                )}
              >
                <service.icon className="size-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="mb-2 text-lg font-semibold text-white">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mb-4 text-sm leading-relaxed text-white/50">
                {service.description}
              </p>

              {/* Items */}
              <ul className="space-y-1.5">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-white/70"
                  >
                    <span
                      className={cn(
                        "h-1 w-1 rounded-full bg-gradient-to-r",
                        service.gradient
                      )}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
