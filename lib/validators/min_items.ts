import {
  NoLengthError,
} from "../errors";
import {
  IBaseValidatorDefinition,
  IValidationError,
  IValidator,
} from "../interfaces";

export interface IMinItemsValidatorDefinition extends IBaseValidatorDefinition {
  minItems: number;
}

export class MinItemsValidator implements IValidator<any[], IMinItemsValidatorDefinition> {
  constructor(public definition: IMinItemsValidatorDefinition) {
    this.definition.type = "min_items";
    const {minItems} = this.definition;
    if (minItems < 0) {
     throw new NoLengthError(`the value of minItems should be greater than, or equal to, 0`);
    }
  }

  public validate(input: any[]): IValidationError<any[], IMinItemsValidatorDefinition> {
    if (input.length >= this.definition.minItems) {
      return;
    }
    return {
      input,
      definition: this.definition,
    };
  }
}
