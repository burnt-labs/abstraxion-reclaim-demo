const assert = require('node:assert/strict');
const { imageSize } = require('../third_party/image-size');
const { findBox } = require('../third_party/image-size/dist/types/utils.js');

const malformedIcns = Uint8Array.from([
  0x69, 0x63, 0x6e, 0x73,
  0x00, 0x00, 0x00, 0x10,
  0x69, 0x63, 0x30, 0x37,
  0x00, 0x00, 0x00, 0x00,
]);

assert.throws(
  () => imageSize(malformedIcns),
  /invalid ICNS image entry length/,
  'ICNS zero-length entries must be rejected',
);

const zeroLengthBox = Uint8Array.from([
  0x00, 0x00, 0x00, 0x00,
  0x6a, 0x78, 0x6c, 0x70,
]);

assert.throws(
  () => findBox(zeroLengthBox, 'jxlp', 0),
  /invalid image box size/,
  'JXL and HEIF zero-length boxes must be rejected',
);

const imageSizeFromFile = require('image-size');
assert.equal(
  typeof imageSizeFromFile,
  'function',
  'the Metro file-path API must remain available',
);

console.log('image-size denial-of-service regressions passed');
