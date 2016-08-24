import {
  IValidationError,
  IValidator,
} from "./interfaces";

export interface IMaximumValidatorDefinition {
  maximum: number;
  exclusive: boolean;
}

export class MaximumValidator implements IValidator<number, IMaximumValidatorDefinition> {
  constructor(public definition: IMaximumValidatorDefinition) { }

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
