import { UserItem } from "@/components/admin/wizard/sections/preparation-section/user-item";
import { useUsersConnection } from "@/lib/contexts/users-connection-context";

export function PreparationStep(): JSX.Element {
  const { users } = useUsersConnection();

  return (
    <div className="flex flex-col gap-7 min-h-[28rem]">
      <h2 className="text-3xl font-semibold loading-dots">
        Esperando a todos los participantes
      </h2>
      <div className="flex flex-wrap gap-14">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
