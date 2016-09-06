import * as assert from "power-assert";

import {FormatValidator} from "../lib/validators/format";

describe("FormatValidator", () => {

  describe("validate()", () => {

    it(`should be valid if the input value matches the date-time format`, () => {
      const definition = {
        format: "date-time",
      };
      const validator = new FormatValidator(definition);
      [
        {
          input: "2016-07-01T16:00:00Z",
          expected: undefined,
        },
        {
          input: "209385790284750",
          expected: {
            input: "209385790284750",
            definition,
          },
        },
      ].forEach(({input, expected}) => {
        const actual = validator.validate(input);
        assert.deepEqual(actual, expected);
      });
    });
    it(`should be valid if the input value matches the email format`, () => {
      const definition = {
        format: "email",
      };
      const validator = new FormatValidator(definition);
      [
        {
          input: "foo@bar.com",
          expected: undefined,
        },
        {
          input: "foobar.com",
          expected: {
            input: "foobar.com",
            definition,
          },
        },
        {
          input: "foo@bar",
          expected: {
            input: "foo@bar",
            definition,
          },
        },
        {
          input: "foo@bar.",
          expected: {
            input: "foo@bar.",
            definition,
          },
        },
      ].forEach(({input, expected}) => {
        const actual = validator.validate(input);
        assert.deepEqual(actual, expected);
      });
    });
    it(`should be valid if the input value matches the hostname format`, () => {
      const definition = {
        format: "hostname",
      };
      const validator = new FormatValidator(definition);
      [
        {
          input: "example",
          expected: undefined,
        },
        {
          input: "example.com",
          expected: undefined,
        },
        {
          input: "example.example.com",
          expected: undefined,
        },
        {
          input: "example-example.com",
          expected: undefined,
        },
        {
          input: "example@example.com",
          expected: {
            input: "example@example.com",
            definition,
          },
        },
        {
          input: "example,com",
          expected: {
            input: "example,com",
            definition,
          },
        },
        {
          input: "example..com",
          expected: {
            input: "example..com",
            definition,
          },
        },
        {
          input: ".example.com",
          expected: {
            input: ".example.com",
            definition,
          },
        },
      ].forEach(({input, expected}) => {
        const actual = validator.validate(input);
        assert.deepEqual(actual, expected);
      });
    });
    it(`should be valid if the input value matches the uri format`, () => {
      const definition = {
        format: "uri",
      };
      const validator = new FormatValidator(definition);
      [
        {
          input: "https://example.com",
          expected: undefined,
        },
        {
          input: "https://example.com/foo/bar",
          expected: undefined,
        },
        {
          input: "http://example.com",
          expected: undefined,
        },
        {
          input: "http://example.com",
          expected: undefined,
        },
        {
          input: "ftp://example.com",
          expected: undefined,
        },
        {
          input: "foobar.com",
          expected: {
            input: "foobar.com",
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
