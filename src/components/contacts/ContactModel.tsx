import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button.tsx";
import { Field, FieldGroup } from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/Input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type CreateContactData,
  CreateContactSchema,
} from "@/schemas/contacts.schema.ts";
import { IoRocketOutline } from "react-icons/io5";
import { FiSave } from "react-icons/fi";
import { LoaderCircle } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  edit?: boolean;
  contactId?: string;
  isPending: boolean;
  onSubmit: (data: CreateContactData) => Promise<void>;
}

const ContactModel = ({
  open,
  setOpen,
  isPending,
  edit = false,
  onSubmit,
}: ContactModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateContactData>({
    resolver: zodResolver(CreateContactSchema),
  });

  const handleFormSubmit = async (data: CreateContactData) => {
    await onSubmit(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-center text-xl text-primary">
              {edit ? "Edit Contact" : "Add Contact"}
            </DialogTitle>

            <DialogDescription className="text-center">
              {edit
                ? "Update your emergency contact information."
                : "Add a new emergency contact."}
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-6 space-y-4">
            {/* Name */}
            <Field>
              <Label htmlFor="name">Name</Label>

              <Input
                id="name"
                {...register("name")}
                placeholder="Pedro Duarte"
              />

              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </Field>

            {/* Email */}
            <Field>
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                placeholder="you@example.com"
              />

              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </Field>

            {/* Phone */}
            <Field>
              <Label htmlFor="phone">Phone</Label>

              <Input
                id="phone"
                {...register("phone")}
                placeholder="01156477553"
              />

              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </Field>

            {/* Relation + Priority */}
            <FieldGroup className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="relation">Relation</Label>

                <Input
                  id="relation"
                  {...register("relation")}
                  placeholder="Dad"
                />

                {errors.relation && (
                  <p className="text-sm text-destructive">
                    {errors.relation.message}
                  </p>
                )}
              </Field>

              <Field>
                <Label htmlFor="priority_order">Priority</Label>

                <Input
                  id="priority_order"
                  type="number"
                  {...register("priority_order", {
                    valueAsNumber: true,
                  })}
                  placeholder="1"
                />

                {errors.priority_order && (
                  <p className="text-sm text-destructive">
                    {errors.priority_order.message}
                  </p>
                )}
              </Field>
            </FieldGroup>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {edit ? (
                <FiSave className="mr-2" />
              ) : (
                <IoRocketOutline className="mr-2" />
              )}

              {isPending ? (
                <LoaderCircle size={30} className={`animate-spin`} />
              ) : edit ? (
                "Save changes"
              ) : (
                "Add Contact"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModel;
