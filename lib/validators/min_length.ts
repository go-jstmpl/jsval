import {
  NoLengthError,
} from "../errors";
import {
  IValidationError,
  IValidator,
} from "../interfaces";

export interface IMinLengthValidatorDefinition {
  type?: string;
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
    if (input.length >= this.definition.minLength) {
      return;
    }
    return {
      input,
      definition: this.definition,
    };
  }
}
