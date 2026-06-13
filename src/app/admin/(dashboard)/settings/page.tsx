"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save } from "lucide-react";

interface Settings {
  companyName: string;
  description: string;
  telegram: string;
  whatsapp: string;
  email: string;
  github: string;
  phone: string;
  address: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    companyName: "",
    description: "",
    telegram: "",
    whatsapp: "",
    email: "",
    github: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Ошибка загрузки настроек");
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error();
      toast.success("Настройки сохранены");
    } catch {
      toast.error("Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-8 text-muted-foreground">Загрузка...</div>;

  const fields: { key: keyof Settings; label: string; type?: string }[] = [
    { key: "companyName", label: "Название компании" },
    { key: "description", label: "Описание" },
    { key: "telegram", label: "Telegram" },
    { key: "whatsapp", label: "WhatsApp" },
    { key: "email", label: "Email", type: "email" },
    { key: "github", label: "GitHub" },
    { key: "phone", label: "Телефон" },
    { key: "address", label: "Адрес" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Настройки сайта</h1>

      <div className="space-y-5">
        {fields.map(({ key, label, type }) => (
          <div key={key}>
            <Label>{label}</Label>
            {key === "description" ? (
              <Textarea
                value={settings[key]}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, [key]: e.target.value }))
                }
                className="mt-1.5"
                rows={3}
              />
            ) : (
              <Input
                type={type || "text"}
                value={settings[key]}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, [key]: e.target.value }))
                }
                className="mt-1.5"
              />
            )}
          </div>
        ))}

        <Button onClick={handleSave} disabled={saving} className="mt-4">
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Сохранение..." : "Сохранить настройки"}
        </Button>
      </div>
    </div>
  );
}
