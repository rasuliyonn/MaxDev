"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Eye, Trash2, Mail, MessageSquare } from "lucide-react";

interface ContactRequest {
  id: string;
  name: string;
  telegram: string | null;
  email: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [selected, setSelected] = useState<ContactRequest | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchContacts() {
    try {
      const res = await fetch("/api/contacts");
      if (res.ok) setContacts(await res.json());
    } catch {
      toast.error("Ошибка загрузки заявок");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchContacts(); }, []);

  async function markAsRead(id: string) {
    try {
      await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      fetchContacts();
    } catch {
      toast.error("Ошибка");
    }
  }

  async function deleteContact(id: string) {
    if (!confirm("Удалить заявку?")) return;
    try {
      await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      toast.success("Заявка удалена");
      fetchContacts();
      setSelected(null);
    } catch {
      toast.error("Ошибка удаления");
    }
  }

  if (loading) return <div className="p-8 text-muted-foreground">Загрузка...</div>;

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Заявки</h1>
          <p className="text-muted-foreground">
            {contacts.filter((c) => !c.read).length} непрочитанных
          </p>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Заявок пока нет</p>
        </div>
      ) : (
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Статус</TableHead>
                <TableHead>Имя</TableHead>
                <TableHead>Telegram</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Сообщение</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow
                  key={contact.id}
                  className={!contact.read ? "bg-primary/5" : ""}
                >
                  <TableCell>
                    <Badge variant={contact.read ? "secondary" : "default"}>
                      {contact.read ? "Прочитано" : "Новое"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.telegram || "—"}</TableCell>
                  <TableCell>{contact.email || "—"}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                    {contact.message}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(contact.createdAt).toLocaleDateString("ru-RU")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setSelected(contact);
                          if (!contact.read) markAsRead(contact.id);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => deleteContact(contact.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Заявка от {selected?.name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              {selected.telegram && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>Telegram: {selected.telegram}</span>
                </div>
              )}
              {selected.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>Email: {selected.email}</span>
                </div>
              )}
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="whitespace-pre-wrap">{selected.message}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date(selected.createdAt).toLocaleString("ru-RU")}
              </p>
              <Button
                variant="destructive"
                onClick={() => deleteContact(selected.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Удалить заявку
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
