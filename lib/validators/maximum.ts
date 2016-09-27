import {
  IValidationError,
  IValidator,
  IValidatorDefinition,
} from "../interfaces";

export interface IMaximumValidatorDefinition extends IValidatorDefinition {
  maximum: number;
  exclusive: boolean;
}

export class MaximumValidator implements IValidator<number, IMaximumValidatorDefinition> {
  constructor(public definition: IMaximumValidatorDefinition) {
    this.definition.type = "maximum";
  }

  public validate(input: number): IValidationError<number, IMaximumValidatorDefinition> {
    if (!this.definition.exclusive) {
      if (input <= this.definition.maximum) {
        return;
      }
      return {
        input,
        definition: this.definition,
      };
    }

    if (input < this.definition.maximum) {
      return;
    }
    return {
      input,
      definition: this.definition,
    };
  }
}
