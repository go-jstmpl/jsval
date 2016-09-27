import {
  NoLengthError,
} from "../errors";
import {
  IValidationError,
  IValidator,
  IValidatorDefinition,
} from "../interfaces";

export interface IMaxLengthValidatorDefinition extends IValidatorDefinition {
  maxLength: number;
}

export class MaxLengthValidator implements IValidator<string, IMaxLengthValidatorDefinition> {
  constructor(public definition: IMaxLengthValidatorDefinition) {
    this.definition.type = "max_length";
    if (this.definition.maxLength < 0) {
      throw new NoLengthError(`the max length should be greater than, or equal to, 0`);
    }
  }

  public validate(input: string): IValidationError<string, IMaxLengthValidatorDefinition> {
    if (input.length <= this.definition.maxLength) {
      return;
    }
    return {
      input,
      definition: this.definition,
    };
  }
}
