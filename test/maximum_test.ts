import * as assert from "power-assert";

import {MaximumValidator} from "../lib/validators/maximum";

describe("MaximumValidator", () => {
  describe("validate()", () => {

    it(`should be valid if the input value is null`, () => {
      const definition = {
        maximum: 100,
        exclusive: false,
      };
      const validator = new MaximumValidator(definition);
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

      it(`should be valid if the input value is lower than, or equal to the maximum value`, () => {
        const definition = {
          maximum: 100,
          exclusive: false,
        };
        const validator = new MaximumValidator(definition);
        [
          {
            input: 99,
            expected: null,
          },
          {
            input: 100,
            expected: null,
          },
          {
            input: 101,
            expected: {
              definition,
              input: 101,
            },
          },
        ].forEach(({input, expected}) => {
          const actual = validator.validate(input);
          assert.deepEqual(actual, expected);
        });
      });

    });

    describe("with exclusive", () => {

      it(`should be valid if the input value is strictly lower than the maximum value`, () => {
        const definition = {
          maximum: 100,
          exclusive: true,
        };
        const validator = new MaximumValidator(definition);
        [
          {
            input: 99,
            expected: null,
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
            expected: {
              definition,
              input: 101,
            },
          },
        ].forEach(({input, expected}) => {
          const actual = validator.validate(input);
          assert.deepEqual(actual, expected);
        });
      });

    });

  });
});
