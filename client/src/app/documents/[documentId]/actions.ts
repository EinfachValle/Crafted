"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getDocuments(ids: Id<"documents">[]) {
  if (ids.length === 0) {
    return [];
  }

  const documentIds = await convex.query(api.documents.getByIds, { ids });

  if (!documentIds) {
    return [];
  }

  return documentIds;
}

export async function getUsers() {
  const { sessionClaims } = await auth();
  const clerk = await clerkClient();

  const org = (sessionClaims as { o?: { id?: string } }).o;

  const response = await clerk.users.getUserList({
    organizationId: [org?.id as string],
  });

  const users = response.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
    avatar: user.imageUrl ?? undefined,
  }));

  return users;
}
