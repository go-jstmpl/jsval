import * as assert from "power-assert";

import {PresentValidator} from "../lib/validators/present";

describe("PresentValidator", () => {
  describe("validate", () => {

    it(`should be invalid if the input is undefined or null`, () => {
      const definition = {
        type: "present",
      };
      const validator = new PresentValidator({});
      [
        {
          input: undefined,
          expected: {
            input: undefined,
            definition,
          },
        },
        {
          input: null,
          expected: {
            input: null,
            definition,
          },
        },
      ].forEach(({input, expected}) => {
        const actual = validator.validate(input);
        assert.deepEqual(actual, expected);
      });
    });

    it(`should be invalid if the input consisting only white space`, () => {
      const definition = {
        type: "present",
      };
      const validator = new PresentValidator({});
      [
        {
          input: "",
          expected: {
            input: "",
            definition,
          },
        },
        {
          input: " ",
          expected: {
            input: " ",
            definition,
          },
        },
        {
          input: "    ",
          expected: {
            input: "    ",
            definition,
          },
        },
        {
          input: "\t",
          expected: {
            input: "\t",
            definition,
          },
        },
        {
          input: "\n",
          expected: {
            input: "\n",
            definition,
          },
        },
        {
          input: "\v",
          expected: {
            input: "\v",
            definition,
          },
        },
        {
          input: "\f",
          expected: {
            input: "\f",
            definition,
          },
        },
        {
          input: "\r",
          expected: {
            input: "\r",
            definition,
          },
        },
        {
          input: "\t\n\v\f\r ",
          expected: {
            input: "\t\n\v\f\r ",
            definition,
          },
        },
        {
          input: "  valid  ",
          expected: null,
        },
        {
          input: "\t\n\v\f\r valid",
          expected: null,
        },
      ].forEach(({input, expected}) => {
        const actual = validator.validate(input);
        assert.deepEqual(actual, expected);
      });
    });

    it(`should be invalid if the input is empty array`, () => {
      const definition = {
        type: "present",
      };
      const validator = new PresentValidator({});
      [
        {
          input: [],
          expected: {
            input: [],
            definition,
          },
        },
        {
          input: [1, 2, 3],
          expected: null,
        },
      ].forEach(({input, expected}) => {
        const actual = validator.validate(input);
        assert.deepEqual(actual, expected);
      });
    });

    it(`should be invalid if the input is empty object`, () => {
      const definition = {
        type: "present",
      };
      const validator = new PresentValidator({});
      [
        {
          input: {},
          expected: {
            input: {},
            definition,
          },
        },
        {
          input: {
            foo: "foo",
            bar: "bar",
          },
          expected: null,
        },
      ].forEach(({input, expected}) => {
        const actual = validator.validate(input);
        assert.deepEqual(actual, expected);
      });
    });

    it(`should be valid if the input is number`, () => {
      const validator = new PresentValidator({});
      [
        {
          input: 0,
          expected: null,
        },
        {
          input: 123,
          expected: null,
        },
      ].forEach(({input, expected}) => {
        const actual = validator.validate(input);
        assert.deepEqual(actual, expected);
      });
    });

    it(`should be valid if the input is boolean`, () => {
      const validator = new PresentValidator({});
      [
        {
          input: false,
          expected: null,
        },
        {
          input: true,
          expected: null,
        },
      ].forEach(({input, expected}) => {
        const actual = validator.validate(input);
        assert.deepEqual(actual, expected);
      });
    });

  });
});
