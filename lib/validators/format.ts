import {
  InvalidFormatError,
} from "../errors";
import {
  IValidationError,
  IValidator,
} from "../interfaces";

export interface IFormatValidatorDefinition {
  format: string;
}

export class FormatValidator implements IValidator<string, IFormatValidatorDefinition> {
  private static rDateTime: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
  private static rEmail: RegExp = /^.+@.+\..+$/;
  private static rUri: RegExp = /^[0-9a-zA-Z]+:\/\/.+$/;

  constructor(public definition: IFormatValidatorDefinition) {
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
    const invalid = {
      definition: this.definition,
      input,
    };
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
        // stolen from https://golang.org/src/net/dnsclient.go
        const len = input.length;
        if (len === 0) {
          break;
        }
        if (len > 255) {
          break;
        }
        let last: string;
        let partlen: number = 0;
        for (let i = 0; i < len; i++) {
          const c = input.charAt(i);
          switch (true) {
            default:
              return invalid;
            case "a" <= c && c <= "z" || "A" <= c && c <= "Z" || c === "_":
              partlen++;
              break;
            case "0" <= c && c <= "9":
              partlen++;
              break;
            case c === "-":
              if (last === ".") {
                return invalid;
              }
              partlen++;
              break;
            case c === ".":
              if (last === "." || last === "-") {
                return invalid;
              }
              if (partlen > 63 || partlen === 0) {
                return invalid;
              }
              partlen = 0;
              break;
          }
          last = c;
        }
        if (last === "-" || partlen > 63) {
          break;
        }
        return;
      }
      case "uri": {
        if (FormatValidator.rUri.test(input)) {
          return;
        }
        break;
      }
      case "password-0Aa": {
        let large = false;
        let small = false;
        let num = false;
        for (let i = 0; i < input.length; i++) {
          const c = input.charAt(i);
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
              return invalid;
          }
        }
        if (large && small && num) {
          return;
        }
        return invalid;
      }

    }
    return invalid;
  }
}
