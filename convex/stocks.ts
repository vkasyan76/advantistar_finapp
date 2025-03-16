// convex/stocks.ts
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

export const getTickers = query({
  handler: async (ctx) => {
    const tickers = await ctx.db.query("tickers_index").collect();
    return tickers.map((ticker) => ({
      label: ticker.Name, // Display the company name
      value: ticker.ticker, // Use the ticker symbol as value
    }));
  },
});
