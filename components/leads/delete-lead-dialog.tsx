"use client";

import { useRouter } from "next/navigation";
import { useDeleteLeadMutation } from "@/lib/leads-api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteLeadDialogProps {
  leadId: string;
  leadName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteLeadDialog({
  leadId,
  leadName,
  open,
  onOpenChange,
}: DeleteLeadDialogProps) {
  const router = useRouter();
  const [deleteLead, { isLoading: isDeleting }] = useDeleteLeadMutation();

  const handleDelete = async () => {
    try {
      await deleteLead(leadId).unwrap();
      onOpenChange(false);
      router.push("/leads");
    } catch (err) {
      // Optionally show error
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <strong>{leadName}</strong> and all
            associated data. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground"
            disabled={isDeleting}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
