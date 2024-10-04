import type { SelectProps } from "@/lib/types/Select";
import {
  Select as BaseSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/base-select";

export function Select({
  name,
  options,
  required,
  placeholder = "Selecciona una opción",
}: SelectProps) {
  return (
    <BaseSelect name={name} required={required}>
      <SelectTrigger className="w-full h-10 bg-secondary text-lg font-bold">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option, index) => (
            <SelectItem
              key={index}
              value={option.value}
              className="text-lg h-10 font-bold"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </BaseSelect>
  );
}
