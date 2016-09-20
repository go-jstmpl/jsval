import {
  DuplicationError,
  EmptyError,
} from "../errors";
import {
  IValidationError,
  IValidator,
} from "../interfaces";

export interface IEnumValidatorDefinition {
  type?: string;
  enumerate: string[];
}

export class EnumValidator implements IValidator<string, IEnumValidatorDefinition> {
  constructor(public definition: IEnumValidatorDefinition) {
    this.definition.type = "enum";
    const {enumerate} = this.definition;
    const len = enumerate.length;
    if (len === 0) {
      throw new EmptyError(`the enumerate should have at least one element`);
    }

    for (let i = 0; i < len - 1; i++) {
      const e = enumerate[i];
      for (let j = i + 1; j < len; j++) {
        if (enumerate[j] === e) {
          throw new DuplicationError(`the elements of enumerate should not be duplicated`);
        }
      }
    }
  }

  public validate(input: string): IValidationError<string, IEnumValidatorDefinition> {
    const {enumerate} = this.definition;
    for (let i = 0; i < enumerate.length; i++) {
      const e = enumerate[i];
      if (e === input) {
        return;
      }
    }
    return {
      definition: this.definition,
      input,
    };
  }
}
