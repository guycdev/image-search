import type { UserIdentity } from "convex/server";
import { query } from "./_generated/server";

export default query(async (ctx) => {
  const user = await ctx.auth.getUserIdentity();

  if (user === null) {
    return null;
  }

  console.log(user);

  return user.tokenIdentifier;
});
