import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// TODO: Add an UpdatedAt field to track when documents are updated
export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent: v.optional(v.string()),
    ownerId: v.string(),
    roomId: v.string(),
    organizationId: v.optional(v.string()),
    createdAt: v.optional(v.number()),
  })
    .index("by_owner_id", ["ownerId"])
    .index("by_organization_id", ["organizationId"])
    .searchIndex("search_documents", {
      searchField: "title",
      filterFields: ["ownerId", "organizationId"],
    }),
});
