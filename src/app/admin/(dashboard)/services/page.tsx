"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, CheckCircle } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  items: string[];
  order: number;
  createdAt: string;
}

const emptyForm = {
  title: "",
  description: "",
  icon: "",
  items: "",
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch("/api/services");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setServices(data);
    } catch {
      toast("Ошибка загрузки услуг");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (service: Service) => {
    setEditingId(service.id);
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon || "",
      items: service.items.join("\n"),
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const body = {
      title: form.title,
      description: form.description,
      icon: form.icon || null,
      items: form.items
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      const url = editingId ? `/api/services/${editingId}` : "/api/services";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error();

      toast(editingId ? "Услуга обновлена" : "Услуга добавлена");
      setDialogOpen(false);
      fetchServices();
    } catch {
      toast("Ошибка сохранения услуги");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить эту услугу?")) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();

      toast("Услуга удалена");
      fetchServices();
    } catch {
      toast("Ошибка удаления услуги");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Услуги</h1>
          <p className="text-muted-foreground mt-1">
            Управление списком услуг
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить услугу
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Редактировать услугу" : "Новая услуга"}
              </DialogTitle>
              <DialogDescription>
                {editingId
                  ? "Измените данные услуги"
                  : "Заполните информацию о новой услуге"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Название</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Название услуги"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Описание услуги"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Иконка (название из Lucide)</Label>
                <Input
                  id="icon"
                  value={form.icon}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, icon: e.target.value }))
                  }
                  placeholder="Например: Code, Globe, Smartphone"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="items">
                  Пункты услуги (каждый с новой строки)
                </Label>
                <Textarea
                  id="items"
                  value={form.items}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, items: e.target.value }))
                  }
                  placeholder={"Адаптивный дизайн\nSEO-оптимизация\nТехподдержка"}
                  rows={5}
                />
              </div>

              <DialogFooter>
                <DialogClose>
                  <Button type="button" variant="outline">
                    Отмена
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={submitting}>
                  {submitting
                    ? "Сохранение..."
                    : editingId
                    ? "Сохранить"
                    : "Создать"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          Услуг пока нет. Добавьте первую услугу.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Card key={service.id} className="group relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    {service.icon && (
                      <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded">
                        {service.icon}
                      </span>
                    )}
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEdit(service)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              {service.items.length > 0 && (
                <CardContent>
                  <ul className="space-y-1.5">
                    {service.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
