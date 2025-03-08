import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

// Make the Query Gracefully Handle “No User” on the landing page
export const checkTerms = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      // throw new ConvexError("Unauthorized");
      return { accepted: false, acceptedAt: null };
    }

    return await ctx.db
      .query("userTermsAcceptances")
      .withIndex("by_userId", (q) => q.eq("userId", user.subject))
      .first();
  },
});

export const acceptTerms = mutation({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const existingAcceptance = await ctx.db
      .query("userTermsAcceptances")
      .withIndex("by_userId", (q) => q.eq("userId", user.subject))
      .first();

    if (existingAcceptance) {
      return existingAcceptance; // Already accepted
    }

    return await ctx.db.insert("userTermsAcceptances", {
      userId: user.subject,
      userName: user.name ?? undefined,
      userEmail: user.email ?? undefined,
      accepted: true,
      termsVersion: "1.0",
      acceptedAt: Math.floor(Date.now()), // Store timestamp
    });
  },
});
