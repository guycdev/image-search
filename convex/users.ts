import { ConvexError } from "convex/values";
import { mutation } from "./_generated/server";

export const store = mutation({
  args: {},
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError(
        "Called store user with out authentication present"
      );
    }
    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      name: identity.name!,
      tokenIdentifier: identity.tokenIdentifier,
      // User id from convex
      userId: identity.subject,
    });
  },
});
