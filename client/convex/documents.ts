import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const orgaId = (user?.organization_id ?? undefined) as string | undefined;

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      ownerId: user.subject,
      organizationId: orgaId,
      roomId: "",
      initialContent: args.initialContent,
    });
  },
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { search, paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const orgaId = (user?.organization_id ?? undefined) as string | undefined;

    if (search && orgaId) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_documents", (q) =>
          q.search("title", search).eq("organizationId", orgaId),
        )
        .paginate(paginationOpts);
    }

    if (search && !orgaId) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_documents", (q) =>
          q.search("title", search).eq("ownerId", user.subject),
        )
        .paginate(paginationOpts);
    }

    if (orgaId) {
      return await ctx.db
        .query("documents")
        .withIndex("by_organization_id", (q) => q.eq("organizationId", orgaId))
        .paginate(paginationOpts);
    }

    return await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
      .paginate(paginationOpts);
  },
});

export const removeById = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const orgaId = (user?.organization_id ?? undefined) as string | undefined;
    const document = await ctx.db.get(args.id);

    if (!document || document.ownerId !== user.subject) {
      throw new ConvexError("Document not found or unauthorized");
    }

    const isOwner = document.ownerId === user.subject;
    const isInOrganization = document.organizationId === orgaId;

    if (!isOwner && !isInOrganization) {
      throw new ConvexError("Unauthorized to delete this document");
    }

    return await ctx.db.delete(args.id);
  },
});

export const updateById = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const orgaId = (user?.organization_id ?? undefined) as string | undefined;
    const document = await ctx.db.get(args.id);

    if (!document || document.ownerId !== user.subject) {
      throw new ConvexError("Document not found or unauthorized");
    }

    const isOwner = document.ownerId === user.subject;
    const isInOrganization = document.organizationId === orgaId;

    if (!isOwner && !isInOrganization) {
      throw new ConvexError("Unauthorized to update this document");
    }

    return await ctx.db.patch(args.id, { title: args.title });
  },
});
