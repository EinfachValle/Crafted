"use client";

import { memo } from "react";

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, HouseIcon, RotateCcwIcon } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-rose-100 p-3 rounded-full">
            <AlertTriangleIcon className="size-10 text-rose-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">
            Something went wrong
          </h2>
          <p>{error.message || "An unexpected error occurred."}</p>
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <Button onClick={reset} className="font-medium px-6">
          <RotateCcwIcon className="inline mr-2" />
          Try Again
        </Button>
        <Button variant="ghost" className="font-medium">
          <HouseIcon className="inline mr-2" />
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default memo(ErrorPage);
