#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var yargs_parser_1 = __importDefault(require("yargs-parser"));
var statLine_1 = __importDefault(require("./statLine"));
var chalk_1 = __importDefault(require("chalk"));
var utils_1 = require("./utils");
var argv = yargs_parser_1["default"](process.argv);
var userPath = argv._[2] || './';
if (argv.help) {
    var content = require('fs').readFileSync(require('path').resolve(__dirname, '../static/help.txt'), 'utf-8');
    utils_1.log(content);
}
else {
    var sl = new statLine_1["default"](userPath, argv.type);
    try {
        sl.run();
    }
    catch (error) {
        utils_1.log(chalk_1["default"].red(error.message));
    }
}
