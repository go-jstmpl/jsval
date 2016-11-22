import {
  IBaseValidatorDefinition,
  IValidationError,
  IValidator,
} from "../interfaces";

export interface IMaximumValidatorDefinition extends IBaseValidatorDefinition {
  maximum: number;
  exclusive: boolean;
}

export class MaximumValidator implements IValidator<number, IMaximumValidatorDefinition> {
  constructor(public definition: IMaximumValidatorDefinition) {
    this.definition.type = "maximum";
  }

  public validate(input: number): IValidationError<number, IMaximumValidatorDefinition> {
    const invalid = {
      definition: this.definition,
      input,
    };
    if (input == null) {
      return invalid;
    }

    if (!this.definition.exclusive) {
      if (input <= this.definition.maximum) {
        return;
      }
      return invalid;
    }

    if (input < this.definition.maximum) {
      return;
    }
    return invalid;
  }
}
