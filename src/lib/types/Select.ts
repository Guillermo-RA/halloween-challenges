export type SelectOption = {
    value: string;
    label: string;
};

export type SelectProps = {
    options: SelectOption[];
    name?: string;
    placeholder?: string;
    required?: boolean;
};