#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var yargs_parser_1 = __importDefault(require("yargs-parser"));
var command_1 = __importDefault(require("./command"));
var argv = yargs_parser_1["default"](process.argv, {
    alias: { 'type': ['t'], 'help': ['h'], 'exclude': ['e'] },
    "default": { 'type': '.js' },
    array: ['type', 'exclude'],
    configuration: {
        'greedy-arrays': true
    }
});
var commandObj = {
    path: argv._[2] || './',
    type: argv.type,
    help: argv.help || false,
    recursion: argv.r || false,
    exclude: argv.exclude || []
};
var cmd = new command_1["default"](commandObj);
cmd.start();
