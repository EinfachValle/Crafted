"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Room } from "./room";
import { Toolbar } from "./toolbar";

interface DocumentProps {
  preloadDoc: Preloaded<typeof api.documents.getById>;
}

export const Document = ({ preloadDoc }: DocumentProps) => {
  const document = usePreloadedQuery(preloadDoc);

  return (
    <Room>
      <div className="min-h-screen bg-document-background">
        <div className="flex flex-col px-4 pt-2 tp-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-document-background print:hidden">
          <Navbar data={document} />
          <Toolbar />
        </div>
        <div className="pt-[114px] print:pt-0">
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
  );
};
