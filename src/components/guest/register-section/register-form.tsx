import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { REGISTER } from "@/lib/constants/api-routes";
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
    <label className="text-lg flex flex-col gap-2 h-28">
      <span className="font-medium">Nombre *</span>
      <Input
        type="text"
        name="name"
        placeholder="Nombre"
        className="h-10 text-lg font-bold bg-secondary shrink-0"
        onChange={handleChange}
      />
      <span className="text-red-500 text-sm">{error}</span>
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

  const response = await fetch(REGISTER, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  if (response.error) {
    throw new Error(response.message);
  }
}
