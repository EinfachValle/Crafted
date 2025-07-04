import { useRef, useState } from "react";

import { useDebounce } from "@/hooks/use-debounce";
import { useStatus } from "@liveblocks/react";
import { useMutation } from "convex/react";
import { LoaderIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { toast } from "sonner";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}

export const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const status = useStatus();
  const { t } = useTranslation();

  const [value, setValue] = useState(title);
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const mutate = useMutation(api.documents.updateById);

  const debouncedUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;

    setIsPending(true);
    mutate({ id, title: newValue })
      .then(() => {
        toast.success(t("toast.Document renamed successfully"));
      })
      .catch(() => {
        toast.error(t("toast.Failed to update document title"));
      })
      .finally(() => {
        setIsPending(false);
      });
  });

  const handleEditTitle = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleChangeTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedUpdate(newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);
    mutate({ id, title: value })
      .then(() => {
        setIsEditing(false);
        toast.success(t("toast.Document renamed successfully"));
      })
      .catch(() => {
        toast.error(t("toast.Failed to update document title"));
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  const showLoader =
    isPending || status === "connecting" || status === "reconnecting";
  const showError = status === "disconnected";

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || " "}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={handleChangeTitle}
            onBlur={() => setIsEditing(false)}
            className="absolute inset-0 text-lg px-1.5 bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          onClick={handleEditTitle}
          className="text-lg px-1.5 cursor-pointer truncate"
        >
          {title ?? t("documents.Untitled Document")}
        </span>
      )}
      {showError && <BsCloudSlash className="size-4" />}
      {!showLoader && !showError && <BsCloudCheck className="size-4" />}
      {showLoader && (
        <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
      )}
    </div>
  );
};
