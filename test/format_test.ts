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
          input: "2016-10-07T16:58:37Z",
          expected: undefined,
        },
        {
          input: "2016-10-07T16:58:37+09:00",
          expected: undefined,
        },
        {
          input: "2016-10-07T16:58:37-09:00",
          expected: undefined,
        },
        {
          input: "2016-10-07T16:58:37.091Z",
          expected: undefined,
        },
        {
          input: "2016-10-07T16:58:37.091+09:00",
          expected: undefined,
        },
        {
          input: "2016-10-07T16:58:37.091-09:00",
          expected: undefined,
        },
        {
          input: "2016-10-07T16:58:37.091232123Z",
          expected: undefined,
        },
        {
          input: "2016-10-07T16:58:37.091232123+09:00",
          expected: undefined,
        },
        {
          input: "2016-10-07T16:58:37.091232123-09:00",
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
    it(`should be valid if the input value matches the password-0Aa format`, () => {
      const definition = {
        format: "password-0Aa",
      };
      const validator = new FormatValidator(definition);
      [
        {
          input: "0Aa",
          expected: undefined,
        },
        {
          input: "0aA",
          expected: undefined,
        },
        {
          input: "A0a",
          expected: undefined,
        },
        {
          input: "Aa0",
          expected: undefined,
        },
        {
          input: "a0A",
          expected: undefined,
        },
        {
          input: "aA0",
          expected: undefined,
        },
        {
          input: "!0Aa",
          expected: undefined,
        },
        {
          input: "!0aA",
          expected: undefined,
        },
        {
          input: "!A0a",
          expected: undefined,
        },
        {
          input: "!Aa0",
          expected: undefined,
        },
        {
          input: "!a0A",
          expected: undefined,
        },
        {
          input: "!aA0",
          expected: undefined,
        },
        {
          input: "0!Aa",
          expected: undefined,
        },
        {
          input: "0!aA",
          expected: undefined,
        },
        {
          input: "0A!a",
          expected: undefined,
        },
        {
          input: "0Aa!",
          expected: undefined,
        },
        {
          input: "0a!A",
          expected: undefined,
        },
        {
          input: "0aA!",
          expected: undefined,
        },
        {
          input: "A!0a",
          expected: undefined,
        },
        {
          input: "A!a0",
          expected: undefined,
        },
        {
          input: "A0!a",
          expected: undefined,
        },
        {
          input: "A0a!",
          expected: undefined,
        },
        {
          input: "Aa!0",
          expected: undefined,
        },
        {
          input: "Aa0!",
          expected: undefined,
        },
        {
          input: "a!0A",
          expected: undefined,
        },
        {
          input: "a!A0",
          expected: undefined,
        },
        {
          input: "a0!A",
          expected: undefined,
        },
        {
          input: "a0A!",
          expected: undefined,
        },
        {
          input: "aA!0",
          expected: undefined,
        },
        {
          input: "aA0!",
          expected: undefined,
        },
        {
          input: "password",
          expected: {
            input: "password",
            definition,
          },
        },
        {
          input: "PASSWORD",
          expected: {
            input: "PASSWORD",
            definition,
          },
        },
        {
          input: "Password",
          expected: {
            input: "Password",
            definition,
          },
        },
        {
          input: "passw0rd",
          expected: {
            input: "passw0rd",
            definition,
          },
        },
        {
          input: "PASSW0RD",
          expected: {
            input: "PASSW0RD",
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
