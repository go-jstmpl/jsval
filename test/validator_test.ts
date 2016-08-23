import * as assert from "power-assert";

import {MaximumValidator} from "../lib/validator";

describe("jsvalidator", () => {
  describe("maximum", () => {

    describe("without exclude", () => {

      it(`should be valid if the input value is lower than, or equal to the maximum value`, () => {
        const validator = new MaximumValidator(100, false);
        [
          {
            input: 99,
            expected: true,
          },
          {
            input: 100,
            expected: true,
          },
          {
            input: 101,
            expected: false,
          },
        ].forEach(({input, expected}) => {
          const actual = validator.validate(input) == null;
          assert(actual === expected);
        });
      });

    });

    describe("with exclude", () => {

      it(`should be valid if the input value is strictly lower than the maximum value`, () => {
        const validator = new MaximumValidator(100, true);
        [
          {
            input: 99,
            expected: true,
          },
          {
            input: 100,
            expected: false,
          },
          {
            input: 101,
            expected: false,
          },
        ].forEach(({input, expected}) => {
          const actual = validator.validate(input) == null;
          assert(actual === expected);
        });
      });

    });

  });

});
