import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  accounts: defineTable({
    plaidId: v.string(), // Plaid ID for the account
    name: v.string(), // Name of the account
    userId: v.string(), // User ID associated with the account
  })
    .index("by_user_id", ["userId"]) // Index for querying by userId
    .index("by_plaid_id", ["plaidId"]) // Index for querying by plaidId
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["userId"],
    }), // Search index for querying by name

  categories: defineTable({
    name: v.string(), // Name of the category
    userId: v.string(), // User ID associated with the category
  })
    .index("by_user_id", ["userId"]) // Query categories by user
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["userId"],
    }),

  transactions: defineTable({
    accountId: v.id("accounts"), // Foreign key to accounts table
    categoryId: v.optional(v.id("categories")), // Foreign key to categories table, nullable
    userId: v.string(), // User ID associated with the transaction
    amount: v.float64(), // Transaction amount (stored as an integer, e.g., cents)
    payee: v.string(), // Name of the payee
    notes: v.optional(v.string()), // Additional notes for the transaction
    date: v.number(), // NEW: date stored as a timestamp (milliseconds)
  })
    .index("by_user_id", ["userId"])
    .index("by_account_id", ["accountId"])
    .index("by_category_id", ["categoryId"])
    .searchIndex("search_payee", {
      searchField: "payee",
      filterFields: ["userId"],
    }),

  // User Tables:

  userApiLimits: defineTable({
    userId: v.string(),
    count: v.number(),
    createdAt: v.number(), // Store timestamps as Unix timestamps (Date.now())
    updatedAt: v.optional(v.number()),
  }).index("by_userId", ["userId"]),

  // User Subscription
  userSubscriptions: defineTable({
    userId: v.string(),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    stripePriceId: v.optional(v.string()),
    stripeCurrentPeriodEnd: v.optional(v.number()), // Convert DateTime to Unix timestamp
  }).index("by_userId", ["userId"]),

  // Watch List
  watchLists: defineTable({
    userId: v.string(),
    stockTicker: v.string(),
    modelPrediction: v.number(),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
    latestClosingPrice: v.optional(v.number()),
    analyzedNews: v.optional(v.string()),
  }).index("by_user_stock", ["userId", "stockTicker"]),

  // User Terms Acceptance
  userTermsAcceptances: defineTable({
    userId: v.string(),
    userName: v.optional(v.string()),
    userEmail: v.optional(v.string()),
    accepted: v.boolean(),
    termsVersion: v.string(),
    acceptedAt: v.number(),
  }).index("by_userId", ["userId"]),

  tickers_index: defineTable({
    // Each document in this table will have the following fields:
    ticker: v.string(),
    Name: v.string(),
    indexTicker: v.string(),
    industryTicker: v.string(),
  }),
});
