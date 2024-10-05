import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { REGISTER } from "@/lib/constants/api-routes";
import { fetcher } from "@/lib/utils/fetch";
import { useState } from "react";

export function RegisterForm() {
  const [error, setError] = useState("");

  return (
    <form
      onSubmit={(...args) =>
        handleSubmit(...args, error).catch((err) => setError(err.message))
      }
      className="flex flex-col gap-5 w-full p-4 flex-1"
    >
      <NameInput error={error} setError={setError} />
      <ButtonContainer />
    </form>
  );
}

function NameInput({
  error,
  setError,
}: {
  error: string;
  setError: (error: string) => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) setError("");
  };

  return (
    <label className="text-lg flex flex-col gap-1 h-24">
      <span className="font-medium">Nombre *</span>
      <Input
        type="text"
        name="name"
        placeholder="Nombre"
        className="h-10 text-lg font-bold bg-secondary shrink-0"
        onChange={handleChange}
        autoComplete="first-name"
      />
      <span className="text-red-500 text-sm pl-2">{error}</span>
    </label>
  );
}

function ButtonContainer() {
  return (
    <div className="flex flex-col justify-end flex-1">
      <Button size="lg" type="submit" className="text-lg font-bold">
        Enviar
      </Button>
    </div>
  );
}

async function handleSubmit(
  event: React.FormEvent<HTMLFormElement>,
  error: string,
) {
  event.preventDefault();

  if (error) return;

  const formData = new FormData(event.currentTarget);
  const data = Object.fromEntries(formData.entries()) ?? {};

  if (data.name === "") throw new Error("El nombre es obligatorio");

  const response = await fetcher(REGISTER, data, { method: "POST" });

  console.log(response);
}
