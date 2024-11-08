"use client";

import { createContext, ReactNode, useContext } from "react";

type UserContextType = {
  name: string | null;
};

const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
}

export const UserContextProvider = ({
  children,
  name,
}: {
  children: ReactNode;
  name: UserContextType;
}) => {
  return <UserContext.Provider value={name}>{children}</UserContext.Provider>;
};
