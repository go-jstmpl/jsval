import * as assert from "power-assert";

import {NoLengthError} from "../lib/errors";
import {MaxLengthValidator} from "../lib/validators/max_length";

describe("MaxLengthValidator", () => {

  describe("constructor()", () => {

    it(`should throw error if the max length is less than 0`, () => {
      [
        {
          definition: { maxLength: -1 },
          expected: NoLengthError,
        },
      ].forEach(({definition, expected}) => {
        assert.throws(() => {
          return new MaxLengthValidator(definition);
        }, expected);
      });
    });

  });

  describe("validate()", () => {

    it(`should be valid if the input value is null`, () => {
      const definition = {
        maxLength: 3,
      };
      const validator = new MaxLengthValidator(definition);
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

    it(`should be valid if the length of the input value is lower than the max length`, () => {
      const definition = {
        maxLength: 3,
      };
      const validator = new MaxLengthValidator(definition);
      [
        {
          input: "ab",
          expected: null,
        },
        {
          input: "abc",
          expected: null,
        },
        {
          input: "abcd",
          expected: {
            input: "abcd",
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
