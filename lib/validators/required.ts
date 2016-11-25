import {
  DuplicationError,
  EmptyError,
} from "../errors";
import {
  IBaseValidatorDefinition,
  IValidationError,
  IValidator,
} from "../interfaces";
import {PresentValidator} from "./present";

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
    const err = {
      definition: this.definition,
      input,
    };

    if (input == null) {
      return err;
    }

    const {required} = this.definition;
    const present = new PresentValidator({});
    for (let i = 0; i < required.length; i++) {
      const key = required[i];
      const presentError = present.validate(input[key]);
      if (presentError != null) {
        return err;
      }
    }
    return;
  }
}
