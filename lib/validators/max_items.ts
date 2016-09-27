import {
  NoLengthError,
} from "../errors";
import {
  IValidationError,
  IValidator,
  IValidatorDefinition,
} from "../interfaces";

export interface IMaxItemsValidatorDefinition extends IValidatorDefinition {
  maxItems: number;
}

export class MaxItemsValidator implements IValidator<any[], IMaxItemsValidatorDefinition> {
  constructor(public definition: IMaxItemsValidatorDefinition) {
    this.definition.type = "max_items";
    const {maxItems} = this.definition;
    if (maxItems < 0) {
     throw new NoLengthError(`the value of maxItems should be greater than, or equal to, 0`);
    }
  }

  public validate(input: any[]): IValidationError<any[], IMaxItemsValidatorDefinition> {
    if (input.length <= this.definition.maxItems) {
      return;
    }
    return {
      input,
      definition: this.definition,
    };
  }
}
