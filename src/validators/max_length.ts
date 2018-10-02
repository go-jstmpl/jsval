import {
  NoLengthError,
} from "../errors";
import {
  IBaseValidatorDefinition,
  IValidator,
} from "../interfaces";

export interface IMaxLengthValidatorDefinition extends IBaseValidatorDefinition {
  maxLength: number;
}

export class MaxLengthValidator implements IValidator<string | null, IMaxLengthValidatorDefinition> {
  constructor(public definition: IMaxLengthValidatorDefinition) {
    this.definition.type = "max_length";
    if (this.definition.maxLength < 0) {
      throw new NoLengthError(`the max length should be greater than, or equal to, 0`);
    }
  }

  public validate(input: string | null) {
    const err = {
      definition: this.definition,
      input,
    };
    if (input == null) {
      return err;
    }
    if (input.length <= this.definition.maxLength) {
      return null;
    }
    return err;
  }
}
