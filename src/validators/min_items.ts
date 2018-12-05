import {
  NoLengthError,
} from "../errors";
import {
  IBaseValidatorDefinition,
  IValidator,
} from "../interfaces";

export interface IMinItemsValidatorDefinition extends IBaseValidatorDefinition {
  minItems: number;
}

export class MinItemsValidator<T> implements IValidator<T[] | null, IMinItemsValidatorDefinition> {
  constructor(public definition: IMinItemsValidatorDefinition) {
    this.definition.type = "min_items";
    const {minItems} = this.definition;
    if (minItems < 0) {
     throw new NoLengthError(`the value of minItems should be greater than, or equal to, 0`);
    }
  }

  public validate(input: T[] | null) {
    const err = {
      definition: this.definition,
      input,
    };
    if (input == null) {
      return err;
    }
    if (input.length >= this.definition.minItems) {
      return null;
    }
    return err;
  }
}
