import * as assert from "power-assert";

import {
  DuplicationError,
  EmptyError,
} from "../lib";

import {RequiredValidator} from "../lib/validators/required";

describe("RequiredValidator", () => {

  describe("constructor()", () => {

    it(`should throw error if the required value is empty or the some of required value are duplicated`, () => {
      [
        {
          definition: { required: [] },
          expected: EmptyError,
        },
        {
          definition: { required: ["foo", "foo", "bar"] },
          expected: DuplicationError,
        },
        {
          definition: { required: ["foo", "bar", "foo"] },
          expected: DuplicationError,
        },
        {
          definition: { required: ["bar", "foo", "foo"] },
          expected: DuplicationError,
        },
        {
          definition: { required: ["foo", "foo", "foo"] },
          expected: DuplicationError,
        },
      ].forEach(({definition, expected}) => {
        assert.throws(() => {
          return new RequiredValidator(definition);
        }, expected);
      });
    });

  });

  describe("validate()", () => {

    it(`should be valid if the input has required keys`, () => {
      const definition = {
        required: [
          "foo",
          "bar",
          "hoge",
        ],
      };
      const validator = new RequiredValidator(definition);
      [
        {
          input: {
            foo: 123,
            bar: 456,
            hoge: 789,
          },
          expected: undefined,
        },
        {
          input: {
            foo: "aaa",
            bar: "bbb",
            hoge: "ccc",
          },
          expected: undefined,
        },
        {
          input: {
            foo: null,
            bar: null,
            hoge: null,
          },
          expected: {
            input: {
              foo: null,
              bar: null,
              hoge: null,
            },
            definition,
          },
        },
        {
          input: {
            foo: "",
            bar: "",
            hoge: "",
          },
          expected: {
            input: {
              foo: "",
              bar: "",
              hoge: "",
            },
            definition,
          },
        },
        {
          input: {
            foo: 123,
            bar: 456,
          },
          expected: {
            input: {
              foo: 123,
              bar: 456,
            },
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
