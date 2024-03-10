"use client";
import useStoreUserEffect from "@/hooks/useStoreUserEffect";

export const AuthHandler = ({ children }: { children: any }) => {
  const userId = useStoreUserEffect();

  console.log(userId);

  return children;
};
