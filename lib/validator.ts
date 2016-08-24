export interface IValidator<T, U> {
  definition: U;
  validate: (input: T) => IValidationError<T, U>;
}

export interface IValidationError<T, U> {
  definition: U;
  input: T;
}

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

class Error {
  public name: string;
  constructor(public message: string) {
  }
}

class EmptyError extends Error {
  public name: string = "EmptyError";
}

class DuplicationError extends Error {
  public name: string = "DuplicationError";
}

export class EnumValidator implements IValidator<string> {
  constructor(public enumurate: string[]) {
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

  public validate(input: string): IValidationError<string> {
    this.enumurate.forEach((e) => {
      if (e !== input) {
        return {
          input,
          validator: this,
        };
      }
    });
    return;
  }
}
