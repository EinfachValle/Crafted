"use client";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

interface RemoveDialogProps {
  documentId: Id<"documents">;
  children: React.ReactNode;
}

export const RemoveDialog = ({ documentId, children }: RemoveDialogProps) => {
  const removeDocument = useMutation(api.documents.removeById);
  const router = useRouter();
  const { t } = useTranslation();

  const [isRemoving, setIsRemoving] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("modal.Remove Document")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("modal.Ask for confirmation before delete")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            {t("general.Cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isRemoving}
            onClick={(e) => {
              e.stopPropagation();
              setIsRemoving(true);
              removeDocument({ id: documentId })
                .then(() => {
                  setIsRemoving(false);
                  toast.success(t("toast.Document removed successfully"));
                })
                .catch(() => {
                  setIsRemoving(false);
                  toast.error(t("toast.Failed to remove document"));
                })
                .finally(() => {
                  setIsRemoving(false);
                });
              router.push("/");
            }}
          >
            {t("general.Delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
