import {
  NoLengthError,
} from "../errors";
import {
  IBaseValidatorDefinition,
  IValidationError,
  IValidator,
} from "../interfaces";

export interface IMinLengthValidatorDefinition extends IBaseValidatorDefinition {
  minLength: number;
}

export class MinLengthValidator implements IValidator<string, IMinLengthValidatorDefinition> {
  constructor(public definition: IMinLengthValidatorDefinition) {
    this.definition.type = "min_length";
    if (this.definition.minLength < 0) {
      throw new NoLengthError(`the minimum length should be greater than, or equal to, 0`);
    }
  }

  public validate(input: string): IValidationError<string, IMinLengthValidatorDefinition> {
    const invalid = {
      definition: this.definition,
      input,
    };
    if (input == null) {
      return invalid;
    }
    if (input.length >= this.definition.minLength) {
      return;
    }
    return invalid;
  }
}
