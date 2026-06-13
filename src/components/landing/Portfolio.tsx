"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const sampleProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce платформа",
    description: "Полнофункциональный интернет-магазин с корзиной, оплатой и личным кабинетом",
    image: "/projects/ecommerce.jpg",
    category: "Сайты",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
    liveUrl: "#",
  },
  {
    id: "2",
    title: "CRM для логистики",
    description: "Система управления заказами, складом и курьерами с аналитикой в реальном времени",
    image: "/projects/crm.jpg",
    category: "CRM",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
    liveUrl: "#",
  },
  {
    id: "3",
    title: "Telegram-бот для продаж",
    description: "Автоматизированный бот с каталогом товаров, оплатой и уведомлениями",
    image: "/projects/bot.jpg",
    category: "Боты",
    technologies: ["Python", "aiogram", "Redis", "PostgreSQL"],
  },
  {
    id: "4",
    title: "Парсер маркетплейсов",
    description: "Скрипт для сбора и анализа цен с автоматическим обновлением и отчетами",
    image: "/projects/parser.jpg",
    category: "Скрипты",
    technologies: ["Python", "Selenium", "BeautifulSoup", "Pandas"],
  },
  {
    id: "5",
    title: "Корпоративный сайт",
    description: "Современный лендинг для IT-компании с анимациями и CMS для управления контентом",
    image: "/projects/corporate.jpg",
    category: "Сайты",
    technologies: ["Next.js", "Framer Motion", "Sanity"],
    liveUrl: "#",
  },
  {
    id: "6",
    title: "CRM для автосервиса",
    description: "Учет клиентов, запчастей, заказ-нарядов и финансовая аналитика",
    image: "/projects/autocrm.jpg",
    category: "CRM",
    technologies: ["React", "Express", "MongoDB", "Chart.js"],
    liveUrl: "#",
  },
];

const categories = ["Все", "Сайты", "CRM", "Скрипты", "Боты"];

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [activeCategory, setActiveCategory] = useState("Все");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          }
        }
      } catch {
        // Keep sample data on error
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects =
    activeCategory === "Все"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
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
              работы
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/50">
            Проекты, которыми мы гордимся
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 flex flex-wrap justify-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                activeCategory === cat
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20"
                  : "border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div ref={ref}>
          <AnimatePresence mode="popLayout">
            <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                    layout: { duration: 0.3 },
                  }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border border-white/5",
                    "bg-white/[0.03] backdrop-blur-sm",
                    "shadow-xl transition-shadow duration-500 hover:shadow-purple-500/10"
                  )}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Globe className="size-12 text-white/10" />
                    </div>
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="relative z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    )}
                    {/* Category badge */}
                    <div className="absolute left-3 top-3 z-20">
                      <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                    {/* Overlay with links */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                        >
                          <ExternalLink className="size-5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                        >
                          <Code2 className="size-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-semibold text-white">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-white/50">
                      {project.description}
                    </p>

                    {/* Technology badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
