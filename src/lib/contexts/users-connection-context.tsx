import { useUsersConnected } from "@/lib/hooks/users-connected-hook";
import {
  type UserConnectionContextType,
  type UserConntectionDispatchContext,
} from "@/lib/types/UsersConnectionContextType";
import { createContext, useContext } from "react";

const UsersConnectionContext = createContext<UserConnectionContextType | null>(
  null,
);

const UsersConnectionDispatchContext =
  createContext<UserConntectionDispatchContext | null>(null);

export function UsersConnectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { users, setUsers } = useUsersConnected();

  const handleEditUser = (id: number, username: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, username } : user)),
    );
  };

  const handleDeleteUser = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <UsersConnectionContext.Provider value={{ users }}>
      <UsersConnectionDispatchContext.Provider
        value={{ handleEditUser, handleDeleteUser }}
      >
        {children}
      </UsersConnectionDispatchContext.Provider>
    </UsersConnectionContext.Provider>
  );
}

export function useUsersConnection() {
  const currentUserContext = useContext(UsersConnectionContext);

  if (!currentUserContext) {
    throw new Error(
      "useUsersConnection must be used within a UsersConnectionProvider",
    );
  }

  return currentUserContext;
}

export function useUsersConnectionDispatch() {
  const currentUserDispatchContext = useContext(UsersConnectionDispatchContext);

  if (!currentUserDispatchContext) {
    throw new Error(
      "useUsersConnectionDispatch must be used within a UsersConnectionProvider",
    );
  }

  return currentUserDispatchContext;
}
