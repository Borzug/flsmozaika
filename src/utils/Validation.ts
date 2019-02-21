export class Validation {
    public validate = (rules: any[]) => rules.every((rule) => rule);

    public minLength = (value: string, min: number) => value.length >= min;

    public equality = (values: number[] | string[]) => values.every((value: string | number) => value === values[0]);
}
