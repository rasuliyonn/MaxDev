"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  name: string;
  company: string;
  avatar?: string;
  text: string;
  rating: number;
}

const sampleReviews: Review[] = [
  {
    id: "1",
    name: "Алексей Петров",
    company: "TechStart",
    text: "Отличная работа! Сайт сделали быстро, качественно и с вниманием к каждой детали. Конверсия выросла на 40% после запуска.",
    rating: 5,
  },
  {
    id: "2",
    name: "Мария Иванова",
    company: "FoodDelivery",
    text: "Заказывали CRM-систему для нашей доставки. Все процессы автоматизированы, работать стало намного удобнее. Рекомендую!",
    rating: 5,
  },
  {
    id: "3",
    name: "Дмитрий Козлов",
    company: "AutoParts",
    text: "Сделали интернет-магазин и бота для Telegram. Клиенты довольны, заказы идут. Спасибо команде MaxDev!",
    rating: 5,
  },
  {
    id: "4",
    name: "Елена Смирнова",
    company: "Beauty Space",
    text: "Потрясающий лендинг для нашей студии красоты. Дизайн современный, сайт загружается мгновенно. Очень довольны результатом.",
    rating: 5,
  },
  {
    id: "5",
    name: "Игорь Волков",
    company: "LogiTrans",
    text: "Разработали парсер и систему аналитики для нашего бизнеса. Экономим часы работы каждый день. Профессиональный подход.",
    rating: 4,
  },
  {
    id: "6",
    name: "Анна Белова",
    company: "EduOnline",
    text: "Создали образовательную платформу с нуля. Функционал превзошел ожидания. Поддержка на высшем уровне.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setReviews(data);
          }
        }
      } catch {
        // Keep sample data
      }
    };
    fetchReviews();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextSlide]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  // Show 3 cards on desktop, 1 on mobile
  const getVisibleReviews = () => {
    const visible: { review: Review; index: number }[] = [];
    for (let i = 0; i < Math.min(3, reviews.length); i++) {
      const idx = (currentIndex + i) % reviews.length;
      visible.push({ review: reviews[idx], index: idx });
    }
    return visible;
  };

  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
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
            Что говорят{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              клиенты
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/50">
            Отзывы наших довольных клиентов
          </p>
        </motion.div>

        {/* Cards carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="grid gap-6 md:grid-cols-3"
            key={currentIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {getVisibleReviews().map(({ review }, i) => (
              <div
                key={`${review.id}-${currentIndex}-${i}`}
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-white/5",
                  "bg-white/[0.03] p-6 backdrop-blur-sm",
                  i > 0 && "hidden md:block"
                )}
              >
                {/* Quote icon */}
                <Quote className="mb-4 size-8 text-purple-500/30" />

                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className={cn(
                        "size-4",
                        starIdx < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-white/20"
                      )}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="mb-6 text-sm leading-relaxed text-white/70">
                  &laquo;{review.text}&raquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-semibold text-white">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {review.name}
                    </p>
                    <p className="text-xs text-white/40">{review.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentIndex === i
                  ? "w-8 bg-gradient-to-r from-purple-500 to-blue-500"
                  : "w-2 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
