import {
  IBaseValidatorDefinition,
  IValidator,
} from "../interfaces";

export interface IMinimumValidatorDefinition extends IBaseValidatorDefinition {
  minimum: number;
  exclusive: boolean;
}

export class MinimumValidator implements IValidator<number | null, IMinimumValidatorDefinition> {
  constructor(public definition: IMinimumValidatorDefinition) {
    this.definition.type = "minimum";
  }

  public validate(input: number | null) {
    const err = {
      definition: this.definition,
      input,
    };
    if (input == null) {
      return err;
    }

    if (!this.definition.exclusive) {
      if (input >= this.definition.minimum) {
        return null;
      }
      return err;
    }

    if (input > this.definition.minimum) {
      return null;
    }
    return err;
  }
}
