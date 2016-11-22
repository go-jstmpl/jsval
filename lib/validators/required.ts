import {
  DuplicationError,
  EmptyError,
} from "../errors";
import {
  IBaseValidatorDefinition,
  IValidationError,
  IValidator,
} from "../interfaces";

export interface IRequiredValidatorDefinition extends IBaseValidatorDefinition {
  required: string[];
}

export class RequiredValidator implements IValidator<any, IRequiredValidatorDefinition> {
  constructor(public definition: IRequiredValidatorDefinition) {
    this.definition.type = "required";
    const {required} = this.definition;
    const len = required.length;
    if (len === 0) {
      throw new EmptyError(`the required value should have at least one element`);
    }

    for (let i = 0; i < len - 1; i++) {
      const key = required[i];
      for (let j = i + 1; j < len; j++) {
        if (required[j] === key) {
          throw new DuplicationError(`the required value should not be duplicated`);
        }
      }
    }
  }

  public validate(input: any): IValidationError<any, IRequiredValidatorDefinition> {
    const invalid = {
      definition: this.definition,
      input,
    };

    if (input == null) {
      return invalid;
    }

    const {required} = this.definition;
    for (let i = 0; i < required.length; i++) {
      const key = required[i];
      if (input[key] == null) {
        return invalid;
      }
    }
    return;
  }
}
