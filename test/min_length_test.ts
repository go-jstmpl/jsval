import * as assert from "power-assert";

import {NoLengthError} from "../lib/errors";
import {MinLengthValidator} from "../lib/validators/min_length";

describe("MinLengthValidator", () => {

  describe("constructor()", () => {

    it(`should throw error if the minimum length is less than 0`, () => {
      [
        {
          definition: { minLength: -1 },
          expected: NoLengthError,
        },
      ].forEach(({definition, expected}) => {
        assert.throws(() => {
          return new MinLengthValidator(definition);
        }, expected);
      });
    });

  });

  describe("validate()", () => {

    it(`should be valid if the input value is null`, () => {
      const definition = {
        minLength: 3,
      };
      const validator = new MinLengthValidator(definition);
      [
        {
          input: null,
          expected: {
            input: null,
            definition,
          },
        },
        {
          input: undefined,
          expected: {
            input: undefined,
            definition,
          },
        },
      ].forEach(({input, expected}) => {
        const actual = validator.validate(input);
        assert.deepEqual(actual, expected);
      });
    });

    it(`should be valid if the length of the input value is greater than the minimum length`, () => {
      const definition = {
        minLength: 3,
      };
      const validator = new MinLengthValidator(definition);
      [
        {
          input: "ab",
          expected: {
            input: "ab",
            definition,
          },
        },
        {
          input: "abc",
          expected: null,
        },
        {
          input: "abcd",
          expected: null,
        },
      ].forEach(({input, expected}) => {
        const actual = validator.validate(input);
        assert.deepEqual(actual, expected);
      });
    });

  });

});
