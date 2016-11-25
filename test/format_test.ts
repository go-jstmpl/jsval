import * as assert from "power-assert";

import {FormatValidator} from "../lib/validators/format";

describe("FormatValidator", () => {

  describe("validate()", () => {

    it(`should be valid if the input value is null`, () => {
      const definition = {
        format: "date-time",
      };
      const validator = new FormatValidator(definition);
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

    it(`should be valid if the input value matches the date-time format`, () => {
      const definition = {
        format: "date-time",
      };
      const validator = new FormatValidator(definition);
      [
        {
          input: "2016-10-07T16:58:37Z",
          expected: null,
        },
        {
          input: "2016-10-07T16:58:37+09:00",
          expected: null,
        },
        {
          input: "2016-10-07T16:58:37-09:00",
          expected: null,
        },
        {
          input: "2016-10-07T16:58:37.091Z",
          expected: null,
        },
        {
          input: "2016-10-07T16:58:37.091+09:00",
          expected: null,
        },
        {
          input: "2016-10-07T16:58:37.091-09:00",
          expected: null,
        },
        {
          input: "2016-10-07T16:58:37.091232123Z",
          expected: null,
        },
        {
          input: "2016-10-07T16:58:37.091232123+09:00",
          expected: null,
        },
        {
          input: "2016-10-07T16:58:37.091232123-09:00",
          expected: null,
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
          expected: null,
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
          expected: null,
        },
        {
          input: "example.com",
          expected: null,
        },
        {
          input: "example.example.com",
          expected: null,
        },
        {
          input: "example-example.com",
          expected: null,
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
          expected: null,
        },
        {
          input: "https://example.com/foo/bar",
          expected: null,
        },
        {
          input: "http://example.com",
          expected: null,
        },
        {
          input: "http://example.com",
          expected: null,
        },
        {
          input: "ftp://example.com",
          expected: null,
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
          expected: null,
        },
        {
          input: "0aA",
          expected: null,
        },
        {
          input: "A0a",
          expected: null,
        },
        {
          input: "Aa0",
          expected: null,
        },
        {
          input: "a0A",
          expected: null,
        },
        {
          input: "aA0",
          expected: null,
        },
        {
          input: "!0Aa",
          expected: null,
        },
        {
          input: "!0aA",
          expected: null,
        },
        {
          input: "!A0a",
          expected: null,
        },
        {
          input: "!Aa0",
          expected: null,
        },
        {
          input: "!a0A",
          expected: null,
        },
        {
          input: "!aA0",
          expected: null,
        },
        {
          input: "0!Aa",
          expected: null,
        },
        {
          input: "0!aA",
          expected: null,
        },
        {
          input: "0A!a",
          expected: null,
        },
        {
          input: "0Aa!",
          expected: null,
        },
        {
          input: "0a!A",
          expected: null,
        },
        {
          input: "0aA!",
          expected: null,
        },
        {
          input: "A!0a",
          expected: null,
        },
        {
          input: "A!a0",
          expected: null,
        },
        {
          input: "A0!a",
          expected: null,
        },
        {
          input: "A0a!",
          expected: null,
        },
        {
          input: "Aa!0",
          expected: null,
        },
        {
          input: "Aa0!",
          expected: null,
        },
        {
          input: "a!0A",
          expected: null,
        },
        {
          input: "a!A0",
          expected: null,
        },
        {
          input: "a0!A",
          expected: null,
        },
        {
          input: "a0A!",
          expected: null,
        },
        {
          input: "aA!0",
          expected: null,
        },
        {
          input: "aA0!",
          expected: null,
        },
        {
          input: "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
          expected: null,
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
