import {
  EmptyError,
  InvalidPatternError,
} from "../errors";
import {
  IBaseValidatorDefinition,
  IValidator,
} from "../interfaces";

export interface IPatternValidatorDefinition extends IBaseValidatorDefinition {
  pattern: string;
}

export class PatternValidator implements IValidator<string | null, IPatternValidatorDefinition> {
  private regExp: RegExp;

  constructor(public definition: IPatternValidatorDefinition) {
    this.definition.type = "pattern";
    const {pattern} = this.definition;
    if (pattern === "") {
      throw new EmptyError(`the pattern should not be empty`);
    }
    try {
      this.regExp = new RegExp(pattern);
    } catch (e) {
      throw new InvalidPatternError(`invalid pattern: ${e.toString}`);
    }
  }

  public validate(input: string | null) {
    const err = {
      definition: this.definition,
      input,
    };
    if (input == null) {
      return err;
    }
    if (this.regExp.test(input)) {
      return null;
    }
    return err;
  }
}
