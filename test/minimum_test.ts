import * as assert from "power-assert";

import {MinimumValidator} from "../lib/validators/minimum";

describe("MinimumValidator", () => {
  describe("validate()", () => {

    it(`should be valid if the input value is null`, () => {
      const definition = {
        minimum: 100,
        exclusive: false,
      };
      const validator = new MinimumValidator(definition);
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

    describe("without exclusive", () => {

      it(`should be valid if the input value is larger than, or equal to the minimum value`, () => {
        const definition = {
          minimum: 100,
          exclusive: false,
        };
        const validator = new MinimumValidator(definition);
        [
          {
            input: 99,
            expected: {
              definition,
              input: 99,
            },
          },
          {
            input: 100,
            expected: null,
          },
          {
            input: 101,
            expected: null,
          },
        ].forEach(({input, expected}) => {
          const actual = validator.validate(input);
          assert.deepEqual(actual, expected);
        });
      });

    });

    describe("with exclusive", () => {

      it(`should be valid if the input value is strictly larger than the minimum value`, () => {
        const definition = {
          minimum: 100,
          exclusive: true,
        };
        const validator = new MinimumValidator(definition);
        [
          {
            input: 99,
            expected: {
              definition,
              input: 99,
            },
          },
          {
            input: 100,
            expected: {
              definition,
              input: 100,
            },
          },
          {
            input: 101,
            expected: null,
          },
        ].forEach(({input, expected}) => {
          const actual = validator.validate(input);
          assert.deepEqual(actual, expected);
        });
      });

    });

  });
});
