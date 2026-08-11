const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
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

const extendedSizeBox = Buffer.alloc(20);
extendedSizeBox.writeUInt32BE(1, 0);
extendedSizeBox.write('jxlc', 4, 'ascii');
extendedSizeBox.writeUInt32BE(0, 8);
extendedSizeBox.writeUInt32BE(20, 12);
assert.deepEqual(
  findBox(extendedSizeBox, 'jxlc', 0),
  { name: 'jxlc', headerSize: 16, offset: 0, size: 20 },
  'ISO BMFF extended-size boxes must use their 64-bit length and 16-byte header',
);

const imageSizeFromFile = require('image-size');
assert.equal(
  typeof imageSizeFromFile,
  'function',
  'the Metro file-path API must remain available',
);

const largeIcnsLength = 600 * 1024;
const largeIcns = Buffer.alloc(largeIcnsLength);
largeIcns.write('icns', 0, 'ascii');
largeIcns.writeUInt32BE(largeIcnsLength, 4);
largeIcns.write('ic10', 8, 'ascii');
largeIcns.writeUInt32BE(largeIcnsLength - 8, 12);

assert.throws(
  () => imageSize(largeIcns.subarray(0, 16)),
  /invalid ICNS file length/,
  'truncated in-memory ICNS buffers must remain invalid',
);

const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'image-size-'));
const largeIcnsPath = path.join(tempDirectory, 'large.icns');
try {
  fs.writeFileSync(largeIcnsPath, largeIcns);
  assert.deepEqual(
    imageSizeFromFile(largeIcnsPath),
    { width: 1024, height: 1024, type: 'ic10' },
    'valid ICNS files larger than the read cap must be detected from their bounded prefix',
  );
} finally {
  fs.rmSync(tempDirectory, { recursive: true });
}

console.log('image-size denial-of-service regressions passed');
