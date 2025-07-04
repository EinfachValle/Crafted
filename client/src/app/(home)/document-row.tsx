"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Building2Icon, CircleUserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { SiGoogledocs } from "react-icons/si";

import { Doc } from "../../../convex/_generated/dataModel";
import { DocumentMenu } from "./document-menu";

interface DocumentRowProps {
  document: Doc<"documents">;
}

export const DocumentRow = ({ document }: DocumentRowProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const onNewTabClick = (id: string) => {
    window.open(`/documents/${id}`, "_blank");
  };

  const handleRowClick = (id: string) => {
    router.push(`/documents/${id}`);
  };

  return (
    <TableRow
      onClick={() => handleRowClick(document?._id)}
      className="cursor-pointer"
    >
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
        {document.organizationId ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUserIcon className="size-4" />
        )}
        {document.organizationId ? t("general.Shared") : t("general.Personal")}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(document._creationTime), "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {document.updatedAt
          ? format(new Date(document.updatedAt), "MMM dd, yyyy")
          : format(new Date(document._creationTime), "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="flex ml-auto justify-end">
        <DocumentMenu
          documentId={document?._id}
          title={document?.title}
          onNewTab={onNewTabClick}
        />
      </TableCell>
    </TableRow>
  );
};
