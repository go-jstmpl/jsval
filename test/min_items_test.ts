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

    it(`should validate object which has length property`, () => {
      class HasLengthProperty {
        public length: number;
        constructor(private items: any[]) {
          this.length = items.length;
        }
      }

      class HasLengthGetter {
        public get length(): number { return this.items.length; }
        constructor(private items: any[]) {}
      }

      const definition = {
        minItems: 3,
      };
      const validator = new MinItemsValidator(definition);
      [
        {
          input: {
            length: 2,
          },
          expected: {
            input: {
              length: 2,
            },
            definition,
          },
        },
        {
          input: {
            length: 3,
          },
          expected: null,
        },
        {
          input: new HasLengthProperty([1, 2]),
          expected: {
            input: new HasLengthProperty([1, 2]),
            definition,
          },
        },
        {
          input: new HasLengthProperty([1, 2, 3]),
          expected: null,
        },
        {
          input: new HasLengthGetter([1, 2]),
          expected: {
            input: new HasLengthGetter([1, 2]),
            definition,
          },
        },
        {
          input: new HasLengthGetter([1, 2, 3]),
          expected: null,
        },
      ].forEach(({input, expected}) => {
        const actual = validator.validate(input);
        assert.deepEqual(actual, expected);
      });
    });

  });

});
