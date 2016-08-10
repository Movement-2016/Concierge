/* eslint prefer-arrow-callback: off */
const assert = require ('assert');
const processCommand = require ('../../dist/cmd').processCommand;

describe ('Test command line processing', function () {
  describe ('empty command', function () {
    it ('should not fail', function () {
      const cmd = processCommand ([]);
      assert.deepStrictEqual (cmd, { code: 0, exit: false, port: 3000 });
    });
  });

  describe ('invalid standalone option', function () {
    it ('should fail with code 1', function () {
      const cmd = processCommand (['-j']);
      assert.deepStrictEqual (cmd, { code: 1, exit: true, port: 3000 });
    });
  });

  describe ('invalid settings option', function () {
    it ('should fail with code 1', function () {
      const cmd = processCommand (['-j=foo.js']);
      assert.deepStrictEqual (cmd, { code: 1, exit: true, port: 3000 });
    });
  });

  describe ('proper port argument', function () {
    it ('should succeed', function () {
      const cmd = processCommand (['-p=2000']);
      assert.deepStrictEqual (cmd, { code: 0, exit: false, port: 2000 });
    });
  });

  describe ('port out of range (negative)', function () {
    it ('should fail', function () {
      const cmd = processCommand (['-p=-1']);
      assert.deepStrictEqual (cmd, { code: 1, exit: true, port: '-1' });
    });
  });

  describe ('port out of range (positive)', function () {
    it ('should fail', function () {
      const cmd = processCommand (['-p=200000']);
      assert.deepStrictEqual (cmd, { code: 1, exit: true, port: '200000' });
    });
  });

  describe ('port not an integer', function () {
    it ('should fail', function () {
      const cmd = processCommand (['-p=2000.5']);
      assert.deepStrictEqual (cmd, { code: 1, exit: true, port: '2000.5' });
    });
  });

  describe ('port not a number', function () {
    it ('should fail', function () {
      const cmd = processCommand (['-p=ABC']);
      assert.deepStrictEqual (cmd, { code: 1, exit: true, port: 'ABC' });
    });
  });

  describe ('unary help command', function () {
    it ('should succeed', function () {
      const cmd1 = processCommand (['-h']);
      assert.deepStrictEqual (cmd1, { code: 0, exit: true, port: 3000 });
      const cmd2 = processCommand (['--help']);
      assert.deepStrictEqual (cmd2, { code: 0, exit: true, port: 3000 });
    });
  });

  describe ('help in command', function () {
    it ('should succeed', function () {
      const cmd1 = processCommand (['-p=2000', '-h']);
      assert.deepStrictEqual (cmd1, { code: 0, exit: true, port: 2000 });
      const cmd2 = processCommand (['-p=2000', '--help']);
      assert.deepStrictEqual (cmd2, { code: 0, exit: true, port: 2000 });
    });
  });
});
