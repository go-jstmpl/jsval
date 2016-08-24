import * as assert from "power-assert";

import {
  DuplicationError,
  EmptyError,
  EnumValidator,
} from "../lib";

describe("EnumValidator", () => {
  describe("constructor()", () => {

    it(`should throw error if the enumurate is empty or the some of enumurate values are duplicated`, () => {
      [
        {
          definition: { enumurate: [] },
          expected: EmptyError,
        },
        {
          definition: { enumurate: ["foo", "foo", "bar"] },
          expected: DuplicationError,
        },
        {
          definition: { enumurate: ["foo", "bar", "foo"] },
          expected: DuplicationError,
        },
        {
          definition: { enumurate: ["bar", "foo", "foo"] },
          expected: DuplicationError,
        },
        {
          definition: { enumurate: ["foo", "foo", "foo"] },
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

    it(`should be valid if the input value exists in the enumurate values`, () => {
      const definition = {
        enumurate: [
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
