"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";

import { FullScreenLoader } from "@/components/fullscreen-loader";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { Id } from "../../../../convex/_generated/dataModel";
import { getDocuments, getUsers } from "./actions";

type User = {
  id: string;
  name: string | undefined;
  avatar?: string;
};

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
        setUsers(list);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        toast.error("Failed to fetch users");
      }
    },
    [],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const endpoint = `/api/liveblocks-auth`;
        const roomId = params.documentId as string;

        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room: roomId }),
        });

        return await response.json();
      }}
      resolveUsers={({ userIds }) => {
        return userIds.map((userId) => {
          const user = users.find((u) => u.id === userId);
          return {
            name: user?.name ?? "Anonymous",
            avatar: user?.avatar ?? "",
          };
        });
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) =>
            user.name?.toLowerCase().includes(text.toLowerCase()),
          );
        }

        return filteredUsers.map((u) => u.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);

        return documents.map((doc) => ({
          id: doc.id,
          name: doc.name,
          type: "document",
        }));
      }}
    >
      <RoomProvider
        id={params.documentId as string}
        initialStorage={{
          leftMargin: 56,
          rightMargin: 56,
        }}
      >
        <ClientSideSuspense
          fallback={<FullScreenLoader label="Room Loading…" />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
