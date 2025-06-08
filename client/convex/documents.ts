import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      ownerId: user.subject,
      initialContent: args.initialContent,
      roomId: "",
    });
  },
});

export const get = query({
  args: { paginationOpts: v.optional(paginationOptsValidator) },
  handler: async (ctx, args) => {
    if (args.paginationOpts) {
      return await ctx.db.query("documents").paginate(args.paginationOpts);
    } else {
      return await ctx.db
        .query("documents")
        .paginate({ numItems: 10, cursor: null });
    }
  },
});

export const removeById = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.get(args.id);

    if (!document || document.ownerId !== user.subject) {
      throw new Error("Document not found or unauthorized");
    }

    const isOwner = document.ownerId === user.subject;

    if (!isOwner) {
      throw new Error("Unauthorized to delete this document");
    }

    return await ctx.db.delete(args.id);
  },
});

export const updateById = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.get(args.id);

    if (!document || document.ownerId !== user.subject) {
      throw new Error("Document not found or unauthorized");
    }

    const isOwner = document.ownerId === user.subject;

    if (!isOwner) {
      throw new Error("Unauthorized to delete this document");
    }

    return await ctx.db.patch(args.id, { title: args.title });
  },
});
