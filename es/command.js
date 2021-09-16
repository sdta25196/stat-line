"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var statLine_1 = __importDefault(require("./statLine"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var utils_1 = require("./utils");
/**
 * 支持的命令行
 */
var Command = /** @class */ (function () {
    function Command(commandObj) {
        this.handleType(commandObj.type);
        this.cmd = commandObj;
    }
    Command.prototype.start = function () {
        if (this.cmd.help) {
            var content = fs_1["default"].readFileSync(path_1["default"].resolve(__dirname, '../static/help.txt'), 'utf-8');
            utils_1.log(content);
            return;
        }
        var sl = new statLine_1["default"](this.cmd);
        sl.run();
    };
    // 处理type前缀点
    Command.prototype.handleType = function (fileType) {
        fileType.forEach(function (item, i, arr) {
            if (!item.startsWith(".")) {
                arr[i] = "." + item;
            }
        });
    };
    return Command;
}());
exports["default"] = Command;
