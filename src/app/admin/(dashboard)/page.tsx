import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FolderKanban,
  MessageSquareQuote,
  Mail,
  Briefcase,
  Clock,
  User,
} from "lucide-react";

export default async function AdminDashboard() {
  const [projectsCount, reviewsCount, servicesCount, unreadContacts, recentContacts] =
    await Promise.all([
      prisma.project.count(),
      prisma.review.count(),
      prisma.service.count(),
      prisma.contactRequest.count({ where: { read: false } }),
      prisma.contactRequest.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const stats = [
    {
      title: "Проекты",
      value: projectsCount,
      icon: FolderKanban,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      title: "Отзывы",
      value: reviewsCount,
      icon: MessageSquareQuote,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      title: "Заявки (непрочитанные)",
      value: unreadContacts,
      icon: Mail,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
    },
    {
      title: "Услуги",
      value: servicesCount,
      icon: Briefcase,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Обзор данных сайта
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Последние заявки
          </CardTitle>
          <CardDescription>
            Недавние обращения с сайта
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentContacts.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">
              Заявок пока нет
            </p>
          ) : (
            <div className="space-y-4">
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border"
                >
                  <div className="p-2 rounded-full bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{contact.name}</span>
                      {!contact.read && (
                        <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">
                          Новая
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 truncate">
                      {contact.message}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      {contact.email && <span>{contact.email}</span>}
                      {contact.telegram && <span>{contact.telegram}</span>}
                      <span>
                        {new Date(contact.createdAt).toLocaleDateString("ru-RU", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
