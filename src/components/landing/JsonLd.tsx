export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MaxDev",
    description:
      "Создаем современные сайты, CRM-системы, Telegram-ботов и скрипты автоматизации",
    url: "https://maxdev.com",
    logo: "https://maxdev.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Russian",
    },
    sameAs: ["https://t.me/maxdev", "https://github.com/maxdev"],
    service: [
      {
        "@type": "Service",
        name: "Разработка сайтов",
        description: "Landing Page, корпоративные сайты, интернет-магазины",
      },
      {
        "@type": "Service",
        name: "Разработка скриптов",
        description: "Python, JavaScript, Telegram-боты, парсеры",
      },
      {
        "@type": "Service",
        name: "CRM-системы",
        description: "Управление товарами, аналитика, склад, продажи",
      },
      {
        "@type": "Service",
        name: "Автоматизация бизнеса",
        description: "Интеграции, API, чат-боты, автоматизация процессов",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
