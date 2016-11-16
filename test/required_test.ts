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
          expected: null,
        },
        {
          input: {
            foo: 123,
            bar: 456,
            hoge: 0,
          },
          expected: null,
        },
        {
          input: {
            foo: 123,
            bar: 456,
            hoge: "",
          },
          expected: null,
        },
        {
          input: {
            foo: 123,
            bar: 456,
            hoge: false,
          },
          expected: null,
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
        {
          input: {
            foo: 123,
            bar: 456,
            hoge: null,
          },
          expected: {
            input: {
              foo: 123,
              bar: 456,
              hoge: null,
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
