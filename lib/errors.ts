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
