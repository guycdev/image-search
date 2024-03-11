"use client";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

const Explore = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();

  const user = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <p>
        {isAuthenticated
          ? "User is logged in " + user.user?.id
          : "user is logged out"}
      </p>
    </div>
  );
};

export default Explore;
