import {
  InvalidFormatError,
} from "../errors";
import {
  IBaseValidatorDefinition,
  IValidationError,
  IValidator,
} from "../interfaces";

export interface IFormatValidatorDefinition extends IBaseValidatorDefinition {
  format: string;
}

export class FormatValidator implements IValidator<string, IFormatValidatorDefinition> {
  private static rDateTime: RegExp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.?\d{1,9})?(?:[+-]\d{2}:\d{2}|Z)/;
  private static rEmail: RegExp = /^.+@.+\..+$/;
  private static rUri: RegExp = /^[0-9a-zA-Z]+:\/\/.+$/;

  constructor(public definition: IFormatValidatorDefinition) {
    this.definition.type = "format";
    const {format} = this.definition;
    switch (format) {
      case "date-time":
      case "email":
      case "hostname":
      case "uri":
      case "password-0Aa":
        return;
      default:
        throw new InvalidFormatError(`the format is not found`);
    }
  }

  public validate(input: string): IValidationError<string, IFormatValidatorDefinition> {
    const {format} = this.definition;
    switch (format) {
      case "date-time": {
        if (FormatValidator.rDateTime.test(input)) {
          return;
        }
        break;
      }
      case "email": {
        if (FormatValidator.rEmail.test(input)) {
          return;
        }
        break;
      }
      case "hostname": {
        if (this.isHostName(input)) {
          return;
        }
        break;
      }
      case "uri": {
        if (FormatValidator.rUri.test(input)) {
          return;
        }
        break;
      }
      case "password-0Aa": {
        if (this.isPassword0Aa(input)) {
          return;
        }
        break;
      }

    }
    return {
      definition: this.definition,
      input,
    };
  }

  // stolen from https://golang.org/src/net/dnsclient.go
  private isHostName(s: string): boolean {
    const len = s.length;
    if (len === 0) {
      return false;
    }
    if (len > 255) {
      return false;
    }
    let last: string = ".";
    let ok: boolean = false;
    let partlen: number = 0;
    for (let i = 0; i < len; i++) {
      const c = s.charAt(i);
      switch (true) {
        default:
          return false;
        case "a" <= c && c <= "z" || "A" <= c && c <= "Z" || c === "_":
          ok = true;
          partlen++;
          break;
        case "0" <= c && c <= "9":
          partlen++;
          break;
        case c === "-":
          if (last === ".") {
            return false;
          }
          partlen++;
          break;
        case c === ".":
          if (last === "." || last === "-") {
            return false;
          }
          if (partlen > 63 || partlen === 0) {
            return false;
          }
          partlen = 0;
          break;
      }
      last = c;
    }
    if (last === "-" || partlen > 63) {
      return false;
    }
    return ok;
  }

  private isPassword0Aa(s: string): boolean {
    let large = false;
    let small = false;
    let num = false;
    for (let i = 0; i < s.length; i++) {
      const c = s.charAt(i);
      switch (true) {
        case "0" <= c && c <= "9":
          num = true;
          continue;
        case "A" <= c && c <= "Z":
          large = true;
          continue;
        case "a" <= c && c <= "z":
          small = true;
          continue;
        case "!" <= c && c <= "~":
          continue;
        default:
          return false;
      }
    }
    return large && small && num;
  }
}
