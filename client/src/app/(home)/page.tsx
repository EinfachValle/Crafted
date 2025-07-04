"use client";

import { useSearchParam } from "@/hooks/use-search-param";
import { usePaginatedQuery } from "convex/react";

import { api } from "../../../convex/_generated/api";
import { DocumentsTable } from "./documents-table";
import { Navbar } from "./navbar";
import { TemplateGallery } from "./template-gallery";

const Home = () => {
  const [search] = useSearchParam("search");

  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    { search },
    {
      initialNumItems: 15,
    },
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
};

export default Home;
