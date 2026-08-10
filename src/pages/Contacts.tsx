import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useContacts, useCreateContact } from "@/hooks/useContacts.ts";
import { MdError } from "react-icons/md";
import ContactCard from "@/components/contacts/ContactCard.tsx";
import LoadingCard from "@/components/LoadingCard.tsx";
import { FaUsers } from "react-icons/fa";
import ContactModel from "@/components/contacts/ContactModel.tsx";
import { useState } from "react";
import type { CreateContactData } from "@/schemas/contacts.schema.ts";
import { toast } from "sonner";

export function Contacts() {
  const [open, setOpen] = useState(false);
  const { data: contacts = [], isLoading, isError, error } = useContacts();
  const { mutateAsync: createContact, isPending } = useCreateContact();

  const isEdit = false;

  const handleAddContact = async (data: CreateContactData) => {
    try {
      await createContact(data);

      toast.success("Contact added successfully");
    } catch (error) {
      toast.error("Failed to add contact");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Emergency Contacts
          </h1>
          <p className="text-slate-500 mt-1">
            Manage who gets notified if you miss a check-in.
          </p>
        </div>
        <Button className="rounded-xl shrink-0" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Contact
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <LoadingCard key={item} />
          ))}
        </div>
      ) : isError ? (
        <div className="flex h-64 w-full flex-col items-center justify-center gap-3">
          <MdError size={48} className="text-danger-500" />

          <h2 className="text-xl font-semibold text-slate-900">
            Failed to load contacts
          </h2>

          <p className="max-w-md text-center text-sm text-slate-500">
            {error instanceof Error
              ? error.message
              : "Something went wrong while fetching your contacts."}
          </p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="flex h-64 w-full flex-col items-center justify-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <FaUsers className="text-2xl text-slate-400" />
          </div>

          <h2 className="text-xl font-semibold text-slate-900">
            No contacts found
          </h2>

          <p className="max-w-md text-center text-sm text-slate-500">
            You don't have any emergency contacts yet. Add a contact to make
            sure someone can be notified if you miss a check-in.
          </p>

          <Button className="mt-2" onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      )}
      <ContactModel
        open={open}
        setOpen={setOpen}
        isPending={isPending}
        edit={isEdit}
        onSubmit={isEdit ? handleAddContact : handleAddContact}
      />
    </div>
  );
}
