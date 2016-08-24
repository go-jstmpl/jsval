import {
  DuplicationError,
  EmptyError,
} from "../errors";
import {
  IValidationError,
  IValidator,
} from "../interfaces";

export interface IEnumValidatorDefinition {
  enumurate: string[];
}

export class EnumValidator implements IValidator<string, IEnumValidatorDefinition> {
  constructor(public definition: IEnumValidatorDefinition) {
    const {enumurate} = this.definition;
    const len = enumurate.length;
    if (len === 0) {
      throw new EmptyError(`the enumurate should have at least one element`);
    }

    for (let i = 0; i < len - 1; i++) {
      const e = enumurate[i];
      for (let j = i + 1; j < len; j++) {
        if (enumurate[j] === e) {
          throw new DuplicationError(`the elements of enumurate should not be duplicated`);
        }
      }
    }
  }

  public validate(input: string): IValidationError<string, IEnumValidatorDefinition> {
    const {enumurate} = this.definition;
    for (let i = 0; i < enumurate.length; i++) {
      const e = enumurate[i];
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
