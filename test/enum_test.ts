import * as assert from "power-assert";

import {
  DuplicationError,
  EmptyError,
  EnumValidator,
} from "../lib";

describe("EnumValidator", () => {
  describe("constructor()", () => {

    it(`should throw error if the enumerate is empty or the some of enumerate values are duplicated`, () => {
      [
        {
          definition: { enumerate: [] },
          expected: EmptyError,
        },
        {
          definition: { enumerate: ["foo", "foo", "bar"] },
          expected: DuplicationError,
        },
        {
          definition: { enumerate: ["foo", "bar", "foo"] },
          expected: DuplicationError,
        },
        {
          definition: { enumerate: ["bar", "foo", "foo"] },
          expected: DuplicationError,
        },
        {
          definition: { enumerate: ["foo", "foo", "foo"] },
          expected: DuplicationError,
        },
      ].forEach(({definition, expected}) => {
        assert.throws(() => {
          return new EnumValidator(definition);
        }, expected);
      });
    });

  });

  describe("validate()", () => {

    it(`should be valid if the input value exists in the enumerate values`, () => {
      const definition = {
        enumerate: [
          "foo",
          "bar",
          "baz",
        ],
      };
      const validator = new EnumValidator(definition);
      [
        {
          input: "foo",
          expected: undefined,
        },
        {
          input: "bar",
          expected: undefined,
        },
        {
          input: "baz",
          expected: undefined,
        },
        {
          input: "qux",
          expected: {
            definition,
            input: "qux",
          },
        },
      ].forEach(({input, expected}) => {
        const actual = validator.validate(input);
        assert.deepEqual(actual, expected);
      });
    });

  });
});
