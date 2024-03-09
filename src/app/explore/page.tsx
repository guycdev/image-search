"use client";
import { UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

const Explore = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();

  console.log(isAuthenticated);

  return (
    <div className="App">
      {isAuthenticated ? "Logged in" : "Logged out or still loading"}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Explore;
