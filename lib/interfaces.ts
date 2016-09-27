import {
  IEnumValidatorDefinition,
  IFormatValidatorDefinition,
  IMaxItemsValidatorDefinition,
  IMaxLengthValidatorDefinition,
  IMaximumValidatorDefinition,
  IMinItemsValidatorDefinition,
  IMinLengthValidatorDefinition,
  IMinimumValidatorDefinition,
  IPatternValidatorDefinition,
  IRequiredValidatorDefinition,
} from "./";

export interface IValidator<T, U> {
  definition: U;
  validate: (input: T) => IValidationError<T, U>;
}

export interface IBaseValidatorDefinition {
  type?: string;
}

export type IValidatorDefinition = (
  IEnumValidatorDefinition |
  IFormatValidatorDefinition |
  IMaxItemsValidatorDefinition |
  IMaxLengthValidatorDefinition |
  IMaximumValidatorDefinition |
  IMinItemsValidatorDefinition |
  IMinLengthValidatorDefinition |
  IMinimumValidatorDefinition |
  IPatternValidatorDefinition |
  IRequiredValidatorDefinition
);

export interface IValidationError<T, U> {
  definition: U;
  input: T;
}
