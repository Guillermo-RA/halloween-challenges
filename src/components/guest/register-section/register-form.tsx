import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const OPTIONS = [
  { value: "boy", label: "Hombre" },
  { value: "girl", label: "Mujer" },
  { value: "non_binary", label: "No binario/Otro" },
];

export function RegisterForm() {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-full p-4 flex-1"
    >
      <NameInput />
      <GenderInput />
      <ButtonContainer />
    </form>
  );
}

function NameInput() {
  return (
    <label className="text-lg">
      Nombre *
      <Input
        type="text"
        name="name"
        placeholder="Nombre"
        className="h-10 text-lg font-bold bg-secondary"
        required
      />
    </label>
  );
}

function GenderInput() {
  return (
    <label className="text-lg">
      Género *
      <Select
        name="gender"
        placeholder="Selecciona tu género"
        options={OPTIONS}
      />
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

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const data = Object.fromEntries(formData.entries()) ?? {};

  const url = `http://localhost:3000/api/register`;
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  console.log(response);
}
