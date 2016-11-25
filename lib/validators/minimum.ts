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
    const err = {
      definition: this.definition,
      input,
    };
    if (input == null) {
      return err;
    }

    if (!this.definition.exclusive) {
      if (input >= this.definition.minimum) {
        return;
      }
      return err;
    }

    if (input > this.definition.minimum) {
      return;
    }
    return err;
  }
}
