"use client";

import { Send, MessageCircle, Mail, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "Контакты", href: "#contact" },
];

const socialLinks = [
  {
    label: "Telegram",
    href: "https://t.me/maxdev",
    icon: Send,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/",
    icon: MessageCircle,
  },
  {
    label: "GitHub",
    href: "https://github.com/maxdev",
    icon: Code2,
  },
  {
    label: "Email",
    href: "mailto:info@maxdev.com",
    icon: Mail,
  },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 bg-gradient-to-b from-transparent to-black/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Logo & description */}
          <div>
            <div className="mb-4 flex items-center gap-2 text-xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Max
              </span>
              <span className="text-white/90">Dev</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/40">
              Веб-студия полного цикла. Разрабатываем сайты, CRM-системы, ботов
              и скрипты для бизнеса любого масштаба.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              Навигация
            </h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="w-fit text-sm text-white/40 transition-colors hover:text-white"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              Контакты
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    "border border-white/10 bg-white/5 text-white/50",
                    "transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white"
                  )}
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider & copyright */}
        <div className="mt-10 border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} MaxDev. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
