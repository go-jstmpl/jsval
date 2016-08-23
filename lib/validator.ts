export interface IValidator<T> {
  validate: (value: T) => IValidationError<T>;
}

export interface IValidationError<T> {
  value: T;
  validator: IValidator<T>;
}

export class MaximumValidator implements IValidator<number> {
  constructor(public maximum: number, public exclusive: boolean) { }

  public validate(value: number): IValidationError<number> {
    if (!this.exclusive) {
      if (value <= this.maximum) {
        return;
      }
      return {
        value,
        validator: this,
      };
    }

    if (value < this.maximum) {
      return;
    }
    return {
      value,
      validator: this,
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

  public validate(value: string): IValidationError<string> {
    this.enumurate.forEach((e) => {
      if (e !== value) {
        return {
          value,
          validator: this,
        };
      }
    });
    return;
  }
}
