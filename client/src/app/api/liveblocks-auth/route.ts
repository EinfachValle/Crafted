import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.NEXT_PUBLIC_LIVEBLOCKS_PRIVATE_API_KEY!,
});

export async function POST(req: Request) {
  const { sessionClaims } = await auth();

  if (!sessionClaims) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { room } = await req.json();
  if (!room) {
    return new Response("Bad Request: Missing room ID", { status: 400 });
  }

  const document = await convex.query(api.documents.getById, { id: room });
  if (!document) {
    return new Response("Not Found: Document does not exist", { status: 404 });
  }

  const isOwner = document.ownerId === user.id;

  const org = (sessionClaims as { o?: { id?: string } }).o;
  const isInOrganization = !!(
    document.organizationId && document.organizationId === org?.id
  );

  if (!isOwner && !isInOrganization) {
    return new Response(
      "Unauthorized: You do not have access to this document",
      { status: 401 },
    );
  }

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.fullName ?? "Anonymous",
      avatar: user.imageUrl ?? undefined,
    },
  });

  session.allow(room, session.FULL_ACCESS);

  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
