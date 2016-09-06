import * as assert from "power-assert";

import {NoLengthError} from "../lib/errors";
import {MaxItemsValidator} from "../lib/validators/max_items";

describe("MaxItemsValidator", () => {

  describe("constructor()", () => {

    it(`should throw error if the value of maxItems is less than 0`, () => {
      [
        {
          definition: { maxItems: -1 },
          expected: NoLengthError,
        },
      ].forEach(({definition, expected}) => {
        assert.throws(() => {
          return new MaxItemsValidator(definition);
        }, expected);
      });
    });

  });

  describe("validate()", () => {

    it(`should be valid if the size of the input is less than, or or equal to, the value of maxItems`, () => {
      const definition = {
        maxItems: 3,
      };
      const validator = new MaxItemsValidator(definition);
      [
        {
          input: [1, 2],
          expected: undefined,
        },
        {
          input: [1, 2, 3],
          expected: undefined,
        },
        {
          input: ["a", "b"],
          expected: undefined,
        },
        {
          input: [1, 2, 3, 4],
          expected: {
            input: [1, 2, 3, 4],
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
