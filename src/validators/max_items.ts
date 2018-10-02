import {
  NoLengthError,
} from "../errors";
import {
  IBaseValidatorDefinition,
  IHasLength,
  IValidator,
} from "../interfaces";

export interface IMaxItemsValidatorDefinition extends IBaseValidatorDefinition {
  maxItems: number;
}

export class MaxItemsValidator implements IValidator<IHasLength | null, IMaxItemsValidatorDefinition> {
  constructor(public definition: IMaxItemsValidatorDefinition) {
    this.definition.type = "max_items";
    const {maxItems} = this.definition;
    if (maxItems < 0) {
     throw new NoLengthError(`the value of maxItems should be greater than, or equal to, 0`);
    }
  }

  public validate(input: IHasLength | null) {
    const err = {
      definition: this.definition,
      input,
    };
    if (input == null) {
      return err;
    }
    if (input.length <= this.definition.maxItems) {
      return null;
    }
    return err;
  }
}
