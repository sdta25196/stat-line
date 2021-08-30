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
    function StatLine(cmd) {
        this.fileStatInfo = {};
        this.fileType = cmd.type;
        this.recursion = cmd.recursion;
        this.workPath = path_1["default"].resolve(process.cwd(), cmd.path);
    }
    StatLine.prototype.run = function () {
        try {
            this.branchCondition(this.workPath, true);
            this.complete();
        }
        catch (error) {
            (0, utils_1.log)(chalk_1["default"].red(error.message));
        }
    };
    StatLine.prototype.statLines = function (workPath) {
        var _this = this;
        var files = fs_1["default"].readdirSync(workPath);
        var bar = new progress_1["default"](":bar :current / :total", { total: files.length, clear: true });
        files.forEach(function (file) {
            var filePath = path_1["default"].resolve(workPath + "/" + file);
            _this.branchCondition(filePath, _this.recursion);
            bar.tick();
        });
    };
    /**
     * 分支条件处理
     * filePath  filePath
     * recursion if filePath is directory，recursion next level
    */
    StatLine.prototype.branchCondition = function (filePath, recursion) {
        if (fs_1["default"].lstatSync(filePath).isDirectory() && recursion) {
            this.statLines(filePath);
        }
        else {
            this.updateFileStatInfo(filePath);
        }
    };
    StatLine.prototype.updateFileStatInfo = function (filePath) {
        var _this = this;
        this.fileType.forEach(function (item) {
            if (path_1["default"].extname(filePath) === item) {
                var content = fs_1["default"].readFileSync(filePath, 'utf8');
                _this.fileStatInfo[filePath] = content.split('\n').length;
            }
        });
    };
    StatLine.prototype.complete = function () {
        var _this = this;
        var keys = Object.keys(this.fileStatInfo);
        if (keys.length) {
            var allStat_1 = {};
            var sumStat_1 = {};
            var _loop_1 = function (k) {
                this_1.fileType.forEach(function (item) {
                    if (new RegExp(item + "$").test(k)) {
                        if (!allStat_1[item] || !sumStat_1[item]) {
                            allStat_1[item] = 0;
                            sumStat_1[item] = 0;
                        }
                        // stat line 统计行
                        allStat_1[item] += _this.fileStatInfo[k];
                        // stat sum 统计文件数
                        sumStat_1[item]++;
                    }
                });
            };
            var this_1 = this;
            for (var k in this.fileStatInfo) {
                _loop_1(k);
            }
            for (var p in this.fileStatInfo) {
                (0, utils_1.log)(chalk_1["default"].green(p) + ": " + chalk_1["default"].bold.yellow(this.fileStatInfo[p]));
            }
            for (var k in allStat_1) {
                (0, utils_1.log)("\nThere are " + chalk_1["default"].bold.green(sumStat_1[k]) + " " + k + " files, " + chalk_1["default"].bold.green(allStat_1[k]) + " lines in total");
            }
        }
        else {
            (0, utils_1.log)(chalk_1["default"].red(this.fileType + " file not found"));
        }
    };
    return StatLine;
}());
exports["default"] = StatLine;
