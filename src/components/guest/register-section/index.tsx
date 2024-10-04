import { RegisterForm } from "@/components/guest/register-section/register-form";

export function RegisterSection() {
  return (
    <section className="flex flex-col items-center rounded-lg ring-1 ring-primary/20 bg-background/50 w-full mx-auto shadow shadow-primary/60 px-3">
      <h2 className="text-2xl font-bold text-primary">Registro</h2>
      <RegisterForm />
    </section>
  );
}
