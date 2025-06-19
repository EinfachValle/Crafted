"use client";

import { memo } from "react";

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, HouseIcon, RotateCcwIcon } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 rounded-full">
            <AlertTriangleIcon className="size-10 text-rose-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold ">
            {t("toast.Something went wrong")}
          </h2>
          <p>{error.message || t("toast.An unexpected error occurred")}</p>
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <Button onClick={reset} className="font-medium px-6">
          <RotateCcwIcon className="inline mr-2" />
          {t("toast.Try again")}
        </Button>
        <Button variant="ghost" className="font-medium">
          <HouseIcon className="inline mr-2" />
          <Link href="/">{t("toast.Go Home")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default memo(ErrorPage);
