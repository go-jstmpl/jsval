import * as assert from "power-assert";

import {
  DuplicationError,
  EmptyError,
  EnumValidator,
} from "../lib";

describe("EnumValidator", () => {
  describe("constructor()", () => {

    it(`should throw error if the enum is empty or the some of enum values are duplicated`, () => {
      [
        {
          definition: { enum: [] },
          expected: EmptyError,
        },
        {
          definition: { enum: ["foo", "foo", "bar"] },
          expected: DuplicationError,
        },
        {
          definition: { enum: ["foo", "bar", "foo"] },
          expected: DuplicationError,
        },
        {
          definition: { enum: ["bar", "foo", "foo"] },
          expected: DuplicationError,
        },
        {
          definition: { enum: ["foo", "foo", "foo"] },
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

    it(`should be valid if the input value exists in the enum values`, () => {
      const definition = {
        enum: [
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
