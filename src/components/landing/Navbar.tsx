"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "Контакты", href: "#contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setScrolled(currentScrollY > 20);

    if (currentScrollY < 100) {
      setVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (href: string) => {
    setSheetOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            scrolled
              ? "border-b border-white/5 bg-black/60 shadow-lg shadow-purple-500/5 backdrop-blur-xl"
              : "bg-transparent"
          )}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 text-xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Max
              </span>
              <span className="text-white/90">Dev</span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="relative rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("#contact")}
                className="ml-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500"
                size="sm"
              >
                Связаться
              </Button>
            </nav>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger
                  render={
                    <Button variant="ghost" size="icon" className="text-white">
                      <Menu className="size-5" />
                    </Button>
                  }
                />
                <SheetContent
                  side="right"
                  className="border-white/5 bg-black/95 backdrop-blur-xl"
                >
                  <SheetHeader>
                    <SheetTitle className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-left text-lg font-bold text-transparent">
                      Max Dev
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="mt-8 flex flex-col gap-2 px-4">
                    {navLinks.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => scrollToSection(link.href)}
                        className="rounded-lg px-4 py-3 text-left text-base font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        {link.label}
                      </button>
                    ))}
                    <Button
                      onClick={() => scrollToSection("#contact")}
                      className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500"
                      size="lg"
                    >
                      Связаться
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
