import { UserList } from "@/components/admin/wizard/sections/ready-section/user-list";

export function ReadyStep(): JSX.Element {
  return (
    <div className="flex flex-col gap-7 h-[28rem]">
      <h2 className="text-3xl font-semibold">¿Todo listo?</h2>
      <UserList />
    </div>
  );
}
