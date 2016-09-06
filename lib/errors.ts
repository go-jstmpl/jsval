export class Error {
  public name: string;
  constructor(public message: string) {
  }
}

export class EmptyError extends Error {
  public name: string = "EmptyError";
}

export class DuplicationError extends Error {
  public name: string = "DuplicationError";
}

export class NoLengthError extends Error {
  public name: string = "NoLengthError";
}

export class InvalidPatternError extends Error {
  public name: string = "InvalidPatternError";
}

export class InvalidFormatError extends Error {
  public name: string = "InvalidFormatError";
}
