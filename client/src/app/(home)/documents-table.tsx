"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationStatus } from "convex/react";
import { LoaderIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Doc } from "../../../convex/_generated/dataModel";
import { DocumentRow } from "./document-row";

interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export const DocumentsTable = ({
  documents,
  loadMore,
  status,
}: DocumentsTableProps) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
      {documents === undefined ? (
        <div className="flex justify-center items-center h-24">
          <LoaderIcon className="animate-spin text-muted-foreground size-5" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("general.Name")}</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">
                {t("general.Shared")}
              </TableHead>
              <TableHead className="hidden md:table-cell">
                {t("general.Created At")}
              </TableHead>
              <TableHead className="hidden md:table-cell">
                {t("general.Updated At")}
              </TableHead>
            </TableRow>
          </TableHeader>
          {documents?.length === 0 ? (
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  {t("documents.No documents found")}
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map((doc) => (
                <DocumentRow key={doc._id} document={doc} />
              ))}
            </TableBody>
          )}
        </Table>
      )}
      <div className="flex justify-center items-center">
        {/* TODO: Add loadMore conditionally on screen size */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => loadMore(15)}
          disabled={status !== "CanLoadMore"}
        >
          {status === "CanLoadMore"
            ? t("general.Load More")
            : t("general.End of Results")}
        </Button>
      </div>
    </div>
  );
};
