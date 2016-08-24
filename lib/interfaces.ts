export interface IValidator<T, U> {
  definition: U;
  validate: (input: T) => IValidationError<T, U>;
}

export interface IValidationError<T, U> {
  definition: U;
  input: T;
}
