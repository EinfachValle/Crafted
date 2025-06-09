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

import { getUsers } from "./actions";

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
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (user) =>
            users.find((u) => u.id === user) ?? { id: user, name: "Anonymous" },
        );
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
      resolveRoomsInfo={() => []}
    >
      <RoomProvider
        id={params.documentId as string}
        initialPresence={{ user: { name: "Anonymous" } }}
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
