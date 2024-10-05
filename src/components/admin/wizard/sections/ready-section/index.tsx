import { UserList } from "@/components/admin/wizard/sections/ready-section/user-list";
import { useUsersConnection } from "@/lib/contexts/users-connection-context";

export function ReadyStep(): JSX.Element {
  const { users } = useUsersConnection();
  const readyUsers = users.filter((user) => user.ready);

  return (
    <div className="flex flex-col gap-7 min-h-[28rem]">
      <div className="flex items-end gap-5">
        <h2 className="text-3xl font-semibold">¿Todo listo?</h2>
        <span className="text-3xl font-semibold">
          ({readyUsers.length}/{users.length})
        </span>
      </div>
      <UserList />
    </div>
  );
}
