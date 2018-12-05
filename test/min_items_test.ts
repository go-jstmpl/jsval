import * as assert from "power-assert";

import {NoLengthError} from "../lib/errors";
import {MinItemsValidator} from "../lib/validators/min_items";

describe("MinItemsValidator", () => {

  describe("constructor()", () => {

    it(`should throw error if the value of minItems is less than 0`, () => {
      [
        {
          definition: { minItems: -1 },
          expected: NoLengthError,
        },
      ].forEach(({definition, expected}) => {
        assert.throws(() => {
          return new MinItemsValidator(definition);
        }, expected);
      });
    });

  });

  describe("validate()", () => {

    it(`should be valid if the input value is null`, () => {
      const definition = {
        minItems: 3,
      };
      const validator = new MinItemsValidator(definition);
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

    it(`should be valid if the size of the input is less than, or or equal to, the value of minItems`, () => {
      const definition = {
        minItems: 3,
      };
      const validator = new MinItemsValidator(definition);
      [
        {
          input: [1, 2],
          expected: {
            input: [1, 2],
            definition,
          },
        },
        {
          input: [1, 2, 3],
          expected: null,
        },
        {
          input: [1, 2, 3, 4],
          expected: null,
        },
        {
          input: ["a", "b", "c", "d"],
          expected: null,
        },
      ].forEach(({input, expected}) => {
        const actual = validator.validate(input);
        assert.deepEqual(actual, expected);
      });
    });

  });

});
