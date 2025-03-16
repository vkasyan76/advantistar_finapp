// convex/stocks.ts
import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

// Insert exactly one ticker document into the "tickers_index" table.
export const insertTickers = mutation({
  args: {
    tickers: v.array(
      v.object({
        ticker: v.string(),
        Name: v.string(),
        indexTicker: v.string(),
        industryTicker: v.string(),
      })
    ),
  },

  handler: async (ctx, args) => {
    // Optionally check user identity if you require authentication:
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const { tickers } = args;

    const results = [];
    for (const t of tickers) {
      const doc = await ctx.db.insert("tickers_index", {
        ticker: t.ticker,
        Name: t.Name,
        indexTicker: t.indexTicker,
        industryTicker: t.industryTicker,
      });
      results.push(doc);
    }
    return results;
  },
});
