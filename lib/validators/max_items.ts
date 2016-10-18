import {
  NoLengthError,
} from "../errors";
import {
  IBaseValidatorDefinition,
  IHasLength,
  IValidationError,
  IValidator,
} from "../interfaces";

export interface IMaxItemsValidatorDefinition extends IBaseValidatorDefinition {
  maxItems: number;
}

export class MaxItemsValidator implements IValidator<any, IMaxItemsValidatorDefinition> {
  constructor(public definition: IMaxItemsValidatorDefinition) {
    this.definition.type = "max_items";
    const {maxItems} = this.definition;
    if (maxItems < 0) {
     throw new NoLengthError(`the value of maxItems should be greater than, or equal to, 0`);
    }
  }

  public validate(input: IHasLength): IValidationError<any, IMaxItemsValidatorDefinition> {
    if (input.length <= this.definition.maxItems) {
      return;
    }
    return {
      input,
      definition: this.definition,
    };
  }
}
