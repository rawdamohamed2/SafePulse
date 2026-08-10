import { Card, CardContent } from "@/components/ui/Card.tsx";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar.tsx";
import { Button } from "@/components/ui/Button.tsx";
import { Mail, Phone, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge.tsx";
import type { contact } from "@/types";
import { toast } from "sonner";
import { useDeleteContact } from "@/hooks/useContacts.ts";
import ConfirmationModel from "@/components/ConfirmationModel.tsx";
import { useState } from "react";

interface ContactCardProps {
  contact: contact;
}
const ContactCard = ({ contact }: ContactCardProps) => {
  const { mutateAsync: deleteContact, isPending } = useDeleteContact();
  const [open, setOpen] = useState(false);
  const onDelete = async (contact_id: string) => {
    try {
      await deleteContact(contact_id);

      toast.success("Contact deleted successfully");
    } catch (error) {
      toast.error("Failed to delete contact");
    }
  };

  const initials = contact.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="overflow-hidden border-slate-100 bg-white transition-shadow hover:shadow-md">
      <CardContent className="p-0">
        <div className="p-6">
          {/* Header */}
          <div className="mb-5 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 bg-purple-100 text-purple-700">
                <AvatarFallback className="bg-purple-100 text-purple-700">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {contact.name}
                </h3>

                <p className="text-sm capitalize text-slate-500">
                  {contact.relation}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/*<Button*/}
              {/*  variant="ghost"*/}
              {/*  size="icon"*/}
              {/*  className="h-8 w-8 text-slate-400 hover:text-slate-600"*/}
              {/*  onClick={() => onEdit(contact)}*/}
              {/*>*/}
              {/*  <Edit2 className="h-4 w-4" />*/}
              {/*</Button>*/}

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-red-600"
                onClick={() => setOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
              <Phone className="h-4 w-4 shrink-0 text-slate-400" />
              <span className="truncate">{contact.phone}</span>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
              <Mail className="h-4 w-4 shrink-0 text-slate-400" />
              <span className="truncate">{contact.email}</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <Badge
              variant={
                parseInt(contact?.priority_order) ? "default" : "secondary"
              }
            >
              {parseInt(contact?.priority_order) === 1
                ? "Primary"
                : "Secondary"}
            </Badge>
          </div>
        </div>
      </CardContent>
      <ConfirmationModel
        open={open}
        setOpen={setOpen}
        onConfirm={() => {
          onDelete(contact.id);
        }}
        isPending={isPending}
      />
    </Card>
  );
};
export default ContactCard;
