export type Validation = {
  value: boolean,
  message: string;
}

export type FormConfiguration = {
  name: string;
  required: Validation;
}