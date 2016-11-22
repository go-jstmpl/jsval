import {
  IBaseValidatorDefinition,
  IValidationError,
  IValidator,
} from "../interfaces";

export interface IMinimumValidatorDefinition extends IBaseValidatorDefinition {
  minimum: number;
  exclusive: boolean;
}

export class MinimumValidator implements IValidator<number, IMinimumValidatorDefinition> {
  constructor(public definition: IMinimumValidatorDefinition) {
    this.definition.type = "minimum";
  }

  public validate(input: number): IValidationError<number, IMinimumValidatorDefinition> {
    const invalid = {
      definition: this.definition,
      input,
    };
    if (input == null) {
      return invalid;
    }

    if (!this.definition.exclusive) {
      if (input >= this.definition.minimum) {
        return;
      }
      return invalid;
    }

    if (input > this.definition.minimum) {
      return;
    }
    return invalid;
  }
}
