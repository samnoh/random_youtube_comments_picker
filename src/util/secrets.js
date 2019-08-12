"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var dotenv_1 = require("dotenv");
if (fs_1["default"].existsSync('.env')) {
    dotenv_1["default"].config({ path: '.env' });
}
else {
    console.error('.env file not found');
    process.exit(1);
}
exports.API_KEY = process.env.API_KEY;
if (!exports.API_KEY) {
    console.error('Set API_KEY env variable.');
    process.exit(1);
}
