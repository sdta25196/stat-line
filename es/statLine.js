"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var progress_1 = __importDefault(require("progress"));
var chalk_1 = __importDefault(require("chalk"));
var utils_1 = require("./utils");
var StatLine = /** @class */ (function () {
    function StatLine(userPath, fileType) {
        if (fileType === void 0) { fileType = '.js'; }
        this.fileStat = {};
        if (!fileType.startsWith(".")) {
            fileType = "." + fileType;
        }
        this.fileType = fileType;
        this.workPath = path_1["default"].resolve(process.cwd(), userPath);
    }
    StatLine.prototype.run = function () {
        this.branchCondition(this.workPath);
        this.complete();
    };
    StatLine.prototype.statLines = function (workPath) {
        var _this = this;
        var files = fs_1["default"].readdirSync(workPath);
        var bar = new progress_1["default"](":bar :current / :total", { total: files.length, clear: true });
        files.forEach(function (file) {
            var filePath = path_1["default"].resolve(workPath + "/" + file);
            _this.branchCondition(filePath);
            bar.tick();
        });
    };
    StatLine.prototype.branchCondition = function (filePath) {
        if (fs_1["default"].lstatSync(filePath).isDirectory()) {
            this.statLines(filePath);
        }
        else {
            this.updateFileStat(filePath);
        }
    };
    StatLine.prototype.updateFileStat = function (filePath) {
        if (path_1["default"].extname(filePath) === this.fileType) {
            var content = fs_1["default"].readFileSync(filePath, 'utf8');
            this.fileStat[filePath] = content.split('\n').length;
        }
    };
    StatLine.prototype.complete = function () {
        var _this = this;
        var keys = Object.keys(this.fileStat);
        if (keys.length) {
            var sum_1 = 0;
            keys.forEach(function (e) { return sum_1 += _this.fileStat[e]; });
            utils_1.log(JSON.stringify(this.fileStat, null, 4));
            utils_1.log("\u603B\u8BA1" + keys.length + "\u4E2A\u6587\u4EF6," + sum_1 + "\u884C");
        }
        else {
            utils_1.log(chalk_1["default"].red("\u672A\u7EDF\u8BA1\u5230" + this.fileType + "\u7C7B\u578B\u6587\u4EF6"));
        }
    };
    return StatLine;
}());
exports["default"] = StatLine;
