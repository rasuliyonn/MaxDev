"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    telegram: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", telegram: "", email: "", message: "" });
        toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        toast.error("Ошибка при отправке. Попробуйте позже.");
      }
    } catch {
      toast.error("Ошибка соединения. Проверьте интернет и попробуйте снова.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
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
            Свяжитесь{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              с нами
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/50">
            Расскажите о вашем проекте и мы предложим лучшее решение
          </p>
        </motion.div>

        <div ref={ref} className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-white/5",
              "bg-white/[0.03] p-8 backdrop-blur-sm sm:p-10"
            )}
          >
            {/* Glow effect */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-purple-500/10 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-500/10 blur-[80px]" />

            <form onSubmit={handleSubmit} className="relative space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-white/70"
                  >
                    Имя
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-purple-500/50 focus-visible:ring-purple-500/20"
                  />
                </div>

                {/* Telegram */}
                <div className="space-y-2">
                  <label
                    htmlFor="telegram"
                    className="text-sm font-medium text-white/70"
                  >
                    Telegram
                  </label>
                  <Input
                    id="telegram"
                    name="telegram"
                    placeholder="@username"
                    value={formData.telegram}
                    onChange={handleChange}
                    className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-purple-500/50 focus-visible:ring-purple-500/20"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-white/70"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-purple-500/50 focus-visible:ring-purple-500/20"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-white/70"
                >
                  Сообщение
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Расскажите о вашем проекте..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-purple-500/50 focus-visible:ring-purple-500/20"
                />
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={cn(
                  "w-full rounded-xl py-3 text-base font-semibold",
                  isSubmitted
                    ? "bg-emerald-600 hover:bg-emerald-600"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                )}
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Отправка...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="size-4" />
                    Отправлено!
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Отправить заявку
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
