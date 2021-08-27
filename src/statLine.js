const path = require('path')
const fs = require('fs')
const ProgressBar = require('progress')
const chalk = require('chalk')

class StatLine {
  fileType
  workPath
  fileStat = { }
  constructor(userPath, fileType = '.js') {
    if (!fileType.startsWith(".")) {
      fileType = `.${fileType}`
    }
    this.fileType = fileType
    this.workPath = path.resolve(process.cwd(), userPath)
  }

  run() {
    if (fs.lstatSync(this.workPath).isDirectory()) {
      this.statLines(this.workPath)
    } else {
      this.updateFileStat(this.workPath)
    }
    this.complete()
  }

  statLines(workPath) {
    const files = fs.readdirSync(workPath)
    var bar = new ProgressBar(`:bar :current / :total`, { total: files.length, clear: true });
    files.forEach(file => {
      const filePath = path.resolve(`${workPath}/${file}`)
      if (fs.lstatSync(filePath).isDirectory()) {
        this.statLines(filePath)
      } else {
        this.updateFileStat(filePath)
      }
      bar.tick();
    })
  }

  updateFileStat(filePath) {
    if (path.extname(filePath) === this.fileType) {
      let data = fs.readFileSync(filePath, 'utf8')
      this.fileStat[filePath] = data.split('\n').length
    }
  }

  complete() {
    const keys = Object.keys(this.fileStat)
    if (keys.length) {
      let sum = 0
      keys.forEach(e => sum += this.fileStat[e])
      this.log(this.fileStat)
      this.log(`总计${keys.length}个文件,${sum}行`)
    } else {
      this.log(chalk.red(`未统计到${this.fileType}类型文件`))
    }
  }

  log(msg) {
    console.log(msg)
  }

}

module.exports = StatLine
