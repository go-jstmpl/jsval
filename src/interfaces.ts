import {
  IEnumValidatorDefinition,
  IFormatValidatorDefinition,
  IMaximumValidatorDefinition,
  IMaxItemsValidatorDefinition,
  IMaxLengthValidatorDefinition,
  IMinimumValidatorDefinition,
  IMinItemsValidatorDefinition,
  IMinLengthValidatorDefinition,
  IPatternValidatorDefinition,
  IPresentValidatorDefinition,
  IRequiredValidatorDefinition,
} from ".";

export interface IValidator<T, U> {
  definition: U;
  validate: (input: T) => IValidationError<T, U> | null;
}

export interface IBaseValidatorDefinition {
  type?: string;
}

export type IValidatorDefinition = (
  IEnumValidatorDefinition<{}> |
  IFormatValidatorDefinition |
  IMaxItemsValidatorDefinition |
  IMaxLengthValidatorDefinition |
  IMaximumValidatorDefinition |
  IMinItemsValidatorDefinition |
  IMinLengthValidatorDefinition |
  IMinimumValidatorDefinition |
  IPatternValidatorDefinition |
  IPresentValidatorDefinition |
  IRequiredValidatorDefinition
);

export interface IValidationError<T, U> {
  definition: U;
  input: T;
}
