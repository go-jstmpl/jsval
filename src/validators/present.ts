import {
  isArray,
  isObject,
  isString,
} from "lodash";

import {
  IBaseValidatorDefinition,
  IValidationError,
  IValidator,
} from "../interfaces";

export type IPresentValidatorDefinition = IBaseValidatorDefinition;

export class PresentValidator implements IValidator<any, IPresentValidatorDefinition> {
  /**
   * Based on `[:space:]` defined in POSIX character classes.
   */
  private static rSpace: RegExp = /^[\t\n\v\f\r ]*$/;

  constructor(public definition: IPresentValidatorDefinition) {
    this.definition.type = "present";
  }

  public validate(input: any): IValidationError<any, IPresentValidatorDefinition> {
    const err = {
      definition: this.definition,
      input,
    };
    if (
      (input == null) ||
      (isString(input) && PresentValidator.rSpace.test(input)) ||
      (isArray(input) && input.length === 0) ||
      (isObject(input) && Object.keys(input).length === 0)
    ) {
      return err;
    }
    return;
  }
}
