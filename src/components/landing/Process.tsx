"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageSquare,
  Palette,
  Code2,
  TestTubeDiagonal,
  Rocket,
  HeadsetIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: MessageSquare,
    title: "Обсуждение",
    description:
      "Выясняем ваши цели, задачи и требования. Определяем объем работы и сроки.",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: Palette,
    title: "Проектирование",
    description:
      "Создаем прототипы и дизайн-макеты. Согласовываем структуру и визуальный стиль.",
    gradient: "from-violet-500 to-blue-500",
  },
  {
    icon: Code2,
    title: "Разработка",
    description:
      "Пишем чистый, производительный код. Регулярно показываем промежуточные результаты.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: TestTubeDiagonal,
    title: "Тестирование",
    description:
      "Тщательно тестируем на всех устройствах и браузерах. Исправляем все замечания.",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    icon: Rocket,
    title: "Запуск",
    description:
      "Разворачиваем проект на продакшн. Настраиваем домен, SSL, аналитику.",
    gradient: "from-teal-500 to-emerald-500",
  },
  {
    icon: HeadsetIcon,
    title: "Поддержка",
    description:
      "Обеспечиваем техническую поддержку, обновления и развитие проекта.",
    gradient: "from-emerald-500 to-green-500",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 sm:py-32">
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
            Как мы{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              работаем
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/50">
            Прозрачный и понятный процесс от идеи до готового продукта
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref}>
          {/* Desktop: horizontal */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connection line */}
              <div className="absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-emerald-500/30" />

              <div className="grid grid-cols-6 gap-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    className="relative flex flex-col items-center text-center"
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        "relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl",
                        "bg-gradient-to-br shadow-lg",
                        step.gradient
                      )}
                    >
                      <step.icon className="size-7 text-white" />
                    </div>

                    {/* Step number */}
                    <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/30">
                      Шаг {index + 1}
                    </span>

                    {/* Title */}
                    <h3 className="mb-2 text-base font-semibold text-white">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs leading-relaxed text-white/50">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet: vertical timeline */}
          <div className="lg:hidden">
            <div className="relative ml-4 border-l border-white/10 pl-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative mb-10 last:mb-0"
                >
                  {/* Dot on line */}
                  <div
                    className={cn(
                      "absolute -left-[calc(2rem+0.5rem+1px)] flex h-10 w-10 items-center justify-center rounded-xl",
                      "bg-gradient-to-br",
                      step.gradient
                    )}
                  >
                    <step.icon className="size-5 text-white" />
                  </div>

                  {/* Step number */}
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/30">
                    Шаг {index + 1}
                  </span>

                  {/* Title */}
                  <h3 className="mb-1 text-lg font-semibold text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-white/50">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
