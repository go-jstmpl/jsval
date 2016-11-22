import {
  DuplicationError,
  EmptyError,
} from "../errors";
import {
  IBaseValidatorDefinition,
  IValidationError,
  IValidator,
} from "../interfaces";

export interface IEnumValidatorDefinition<T> extends IBaseValidatorDefinition {
  enum: T[];
}

export class EnumValidator<T> implements IValidator<{}, IEnumValidatorDefinition<T>> {
  constructor(public definition: IEnumValidatorDefinition<T>) {
    this.definition.type = "enum";
    const len = this.definition.enum.length;
    if (len === 0) {
      throw new EmptyError(`the enum should have at least one element`);
    }

    for (let i = 0; i < len - 1; i++) {
      const e = this.definition.enum[i];
      for (let j = i + 1; j < len; j++) {
        if (this.definition.enum[j] === e) {
          throw new DuplicationError(`the elements of enum should not be duplicated`);
        }
      }
    }
  }

  public validate(input: T): IValidationError<T, IEnumValidatorDefinition<T>> {
    const invalid = {
      definition: this.definition,
      input,
    };
    if (input == null) {
      return invalid;
    }
    for (let i = 0; i < this.definition.enum.length; i++) {
      const e = this.definition.enum[i];
      if (e === input) {
        return;
      }
    }
    return invalid;
  }
}
