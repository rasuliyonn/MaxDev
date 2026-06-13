import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = crypto
    .createHash("sha256")
    .update(process.env.ADMIN_PASSWORD || "admin123")
    .digest("hex");

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@example.com" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  // Create default site settings
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      companyName: "MaxDev",
      description:
        "Создаем современные сайты, CRM-системы, Telegram-ботов и скрипты автоматизации",
      telegram: "https://t.me/maxdev",
      whatsapp: "",
      email: "info@maxdev.com",
      github: "https://github.com/maxdev",
    },
  });

  // Seed sample projects
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Полнофункциональный интернет-магазин с корзиной, оплатой и личным кабинетом",
      category: "Сайты",
      technologies: JSON.stringify(["Next.js", "TypeScript", "PostgreSQL", "Stripe"]),
      featured: true,
      order: 1,
    },
    {
      title: "CRM для автосалона",
      description:
        "Система управления клиентами, складом и продажами для автодилера",
      category: "CRM",
      technologies: JSON.stringify(["React", "Node.js", "MongoDB", "Redis"]),
      featured: true,
      order: 2,
    },
    {
      title: "Telegram-бот для доставки",
      description:
        "Бот для заказа еды с интеграцией оплаты и трекингом доставки",
      category: "Боты",
      technologies: JSON.stringify(["Python", "aiogram", "PostgreSQL", "Redis"]),
      featured: true,
      order: 3,
    },
    {
      title: "Парсер маркетплейсов",
      description:
        "Автоматический сбор данных о товарах и ценах с популярных площадок",
      category: "Скрипты",
      technologies: JSON.stringify(["Python", "Selenium", "BeautifulSoup", "PostgreSQL"]),
      featured: false,
      order: 4,
    },
    {
      title: "Корпоративный портал",
      description:
        "Внутренний портал компании с документооборотом и задачами",
      category: "Сайты",
      technologies: JSON.stringify(["Next.js", "Prisma", "PostgreSQL", "S3"]),
      featured: true,
      order: 5,
    },
    {
      title: "Система аналитики продаж",
      description:
        "Дашборд с графиками, отчетами и прогнозированием продаж",
      category: "CRM",
      technologies: JSON.stringify(["React", "D3.js", "Python", "FastAPI"]),
      featured: false,
      order: 6,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  // Seed sample reviews
  const reviews = [
    {
      name: "Александр Петров",
      text: "Отличная команда! Сделали сайт быстро и качественно. Дизайн превзошел все ожидания.",
      rating: 5,
      company: "ООО «ТехноСтарт»",
      order: 1,
    },
    {
      name: "Мария Иванова",
      text: "Заказывали CRM-систему. Работает отлично, поддержка на высоте. Рекомендую!",
      rating: 5,
      company: "АвтоДилер Плюс",
      order: 2,
    },
    {
      name: "Дмитрий Козлов",
      text: "Telegram-бот для нашего ресторана работает безупречно. Клиенты довольны, заказы растут.",
      rating: 5,
      company: "Ресторан «Вкусно»",
      order: 3,
    },
    {
      name: "Елена Сидорова",
      text: "Парсер данных экономит нам часы работы каждый день. Очень довольны результатом.",
      rating: 4,
      company: "МаркетАналитикс",
      order: 4,
    },
    {
      name: "Игорь Новиков",
      text: "Профессиональный подход к разработке. Все сроки соблюдены, бюджет не превышен.",
      rating: 5,
      company: "StartUp Hub",
      order: 5,
    },
  ];

  for (const review of reviews) {
    await prisma.review.create({ data: review });
  }

  // Seed services
  const services = [
    {
      title: "Разработка сайтов",
      description:
        "Создаем современные веб-сайты любой сложности с адаптивным дизайном",
      icon: "Globe",
      items: JSON.stringify([
        "Landing Page",
        "Корпоративные сайты",
        "Интернет-магазины",
        "Сервисы и SaaS",
      ]),
      order: 1,
    },
    {
      title: "Разработка скриптов",
      description:
        "Автоматизация рутинных задач и обработка данных",
      icon: "Code",
      items: JSON.stringify([
        "Python",
        "JavaScript",
        "Browser Automation Studio",
        "Telegram-боты",
        "Парсеры",
      ]),
      order: 2,
    },
    {
      title: "CRM-системы",
      description:
        "Разрабатываем системы управления бизнесом под ваши задачи",
      icon: "Database",
      items: JSON.stringify(["Управление товарами", "Аналитика", "Склад", "Продажи"]),
      order: 3,
    },
    {
      title: "Автоматизация бизнеса",
      description:
        "Интеграция сервисов и автоматизация бизнес-процессов",
      icon: "Zap",
      items: JSON.stringify([
        "Интеграции",
        "API",
        "Чат-боты",
        "Автоматизация процессов",
      ]),
      order: 4,
    },
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
