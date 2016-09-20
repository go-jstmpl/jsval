import {
  EmptyError,
  InvalidPatternError,
} from "../errors";
import {
  IValidationError,
  IValidator,
} from "../interfaces";

export interface IPatternValidatorDefinition {
  type?: string;
  pattern: string;
}

export class PatternValidator implements IValidator<string, IPatternValidatorDefinition> {
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

  public validate(input: string): IValidationError<string, IPatternValidatorDefinition> {
    if (this.regExp.test(input)) {
      return;
    }
    return {
      definition: this.definition,
      input,
    };
  }
}
