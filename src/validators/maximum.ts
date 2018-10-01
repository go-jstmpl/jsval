import {
  IBaseValidatorDefinition,
  IValidator,
} from "../interfaces";

export interface IMaximumValidatorDefinition extends IBaseValidatorDefinition {
  maximum: number;
  exclusive: boolean;
}

export class MaximumValidator implements IValidator<number | null, IMaximumValidatorDefinition> {
  constructor(public definition: IMaximumValidatorDefinition) {
    this.definition.type = "maximum";
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
      if (input <= this.definition.maximum) {
        return null;
      }
      return err;
    }

    if (input < this.definition.maximum) {
      return null;
    }
    return err;
  }
}
