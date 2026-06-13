"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, ImageIcon } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string | null;
  category: string;
  technologies: string[];
  siteUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  order: number;
  createdAt: string;
}

const categories = [
  "Веб-сайт",
  "Мобильное приложение",
  "Интернет-магазин",
  "Лендинг",
  "CRM-система",
  "Другое",
];

const emptyForm = {
  title: "",
  description: "",
  image: "",
  category: "",
  technologies: "",
  siteUrl: "",
  githubUrl: "",
  featured: false,
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProjects(data);
    } catch {
      toast("Ошибка загрузки проектов");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      image: project.image || "",
      category: project.category,
      technologies: project.technologies.join(", "),
      siteUrl: project.siteUrl || "",
      githubUrl: project.githubUrl || "",
      featured: project.featured,
    });
    setDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error();

      const data = await res.json();
      setForm((prev) => ({ ...prev, image: data.url }));
      toast("Изображение загружено");
    } catch {
      toast("Ошибка загрузки изображения");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const body = {
      title: form.title,
      description: form.description,
      image: form.image || null,
      category: form.category,
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      siteUrl: form.siteUrl || null,
      githubUrl: form.githubUrl || null,
      featured: form.featured,
    };

    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error();

      toast(editingId ? "Проект обновлён" : "Проект создан");
      setDialogOpen(false);
      fetchProjects();
    } catch {
      toast("Ошибка сохранения проекта");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить этот проект?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();

      toast("Проект удалён");
      fetchProjects();
    } catch {
      toast("Ошибка удаления проекта");
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
          <h1 className="text-3xl font-bold">Проекты</h1>
          <p className="text-muted-foreground mt-1">
            Управление портфолио проектов
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить проект
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Редактировать проект" : "Новый проект"}
              </DialogTitle>
              <DialogDescription>
                {editingId
                  ? "Измените данные проекта"
                  : "Заполните информацию о новом проекте"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Название</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="Название проекта"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Категория</Label>
                  <Select
                    value={form.category}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, category: value || "" }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Описание проекта"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologies">Технологии (через запятую)</Label>
                <Input
                  id="technologies"
                  value={form.technologies}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      technologies: e.target.value,
                    }))
                  }
                  placeholder="React, Next.js, TypeScript"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">URL сайта</Label>
                  <Input
                    id="siteUrl"
                    value={form.siteUrl}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, siteUrl: e.target.value }))
                    }
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    value={form.githubUrl}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        githubUrl: e.target.value,
                      }))
                    }
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Изображение</Label>
                <div className="flex items-center gap-4">
                  {form.image && (
                    <img
                      src={form.image}
                      alt="Preview"
                      className="w-20 h-14 object-cover rounded-lg border border-border"
                    />
                  )}
                  <label className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-muted hover:bg-muted/80 transition-colors text-sm">
                      <ImageIcon className="h-4 w-4" />
                      {uploading ? "Загрузка..." : "Загрузить"}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, featured: e.target.checked }))
                  }
                  className="rounded border-border"
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Избранный проект
                </Label>
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

      {projects.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          Проектов пока нет. Добавьте первый проект.
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Фото</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-12 h-8 object-cover rounded border border-border"
                      />
                    ) : (
                      <div className="w-12 h-8 rounded bg-muted flex items-center justify-center">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {project.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {project.category}
                  </TableCell>
                  <TableCell>
                    {project.featured && (
                      <Badge variant="secondary" className="bg-primary/20 text-primary">
                        Избранный
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(project)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(project.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
