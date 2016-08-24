import * as assert from "power-assert";

import {
  EmptyError,
  InvalidPatternError,
} from "../lib/errors";
import {PatternValidator} from "../lib/validators/pattern";

describe("PatternValidator", () => {

  describe("constructor()", () => {

    it(`should throw error if the pattern is empty`, () => {
      [
        {
          definition: { pattern: "" },
          expected: EmptyError,
        },
        {
          definition: { pattern: "(" },
          expected: InvalidPatternError,
        },
      ].forEach(({definition, expected}) => {
        assert.throws(() => {
          return new PatternValidator(definition);
        }, expected);
      });
    });

  });

  describe("validate()", () => {

    it(`should be valid if the input value matches the regular expression`, () => {
      const definition = {
        pattern: "^\\d{7}$",
      };
      const validator = new PatternValidator(definition);
      [
        {
          input: "1234567",
          expected: undefined,
        },
        {
          input: "abcdefg",
          expected: {
            input: "abcdefg",
            definition,
          },
        },
      ].forEach(({input, expected}) => {
        const actual = validator.validate(input);
        assert.deepEqual(actual, expected);
      });
    });

  });

});
