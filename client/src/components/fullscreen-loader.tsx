/* eslint-disable react/display-name */
import { memo } from "react";

import Image from "next/image";

interface FullScreenLoaderProps {
  label?: string;
}

export const FullScreenLoader = memo(({ label }: FullScreenLoaderProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={128}
        height={128}
        className="text-muted-foreground animate-pulse"
      />
      {label && (
        <p className="text-xl font-bold capitalize text-muted-foreground ">
          {label}
        </p>
      )}
    </div>
  );
});
