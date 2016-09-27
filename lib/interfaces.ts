export interface IValidator<T, U> {
  definition: U;
  validate: (input: T) => IValidationError<T, U>;
}

export interface IValidatorDefinition {
  type?: string;
}

export interface IValidationError<T, U> {
  definition: U;
  input: T;
}
