"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JP2 = void 0;
const utils_1 = require("./utils");
exports.JP2 = {
    validate(input) {
        const boxType = (0, utils_1.toUTF8String)(input, 4, 8);
        if (boxType !== 'jP  ')
            return false;
        const ftypBox = (0, utils_1.findBox)(input, 'ftyp', 0);
        if (!ftypBox)
            return false;
        const brand = (0, utils_1.toUTF8String)(input, ftypBox.offset + ftypBox.headerSize, ftypBox.offset + ftypBox.headerSize + 4);
        return brand === 'jp2 ';
    },
    calculate(input) {
        const jp2hBox = (0, utils_1.findBox)(input, 'jp2h', 0);
        const ihdrBox = jp2hBox && (0, utils_1.findBox)(input, 'ihdr', jp2hBox.offset + jp2hBox.headerSize);
        if (ihdrBox) {
            return {
                height: (0, utils_1.readUInt32BE)(input, ihdrBox.offset + ihdrBox.headerSize),
                width: (0, utils_1.readUInt32BE)(input, ihdrBox.offset + ihdrBox.headerSize + 4),
            };
        }
        throw new TypeError('Unsupported JPEG 2000 format');
    },
};
