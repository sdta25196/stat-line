
const path = require('path')
const fs = require('fs')
const ProgressBar = require('progress')
const chalk = require('chalk')

function statLines(workPath, fileType, fileStat = {}) {
  try {
    const files = fs.readdirSync(workPath)
    var bar = new ProgressBar(`:bar :current / :total`, { total: files.length, clear: true });
    files.forEach(file => {
      const stat = fs.lstatSync(path.resolve(`${workPath}/${file}`));
      if (stat.isDirectory()) {
        statLines(path.resolve(`${workPath}/${file}/`), fileType, fileStat)
      } else {
        const extname = path.extname(file)
        if (extname === fileType) {
          let data = fs.readFileSync(path.resolve(`${workPath}/${file}`), 'utf8')
          fileLine = data.split('\n').length
          fileStat[path.resolve(`${workPath}/${file}`)] = fileLine
        }
      }
      bar.tick();
    })
  } catch (error) {
    console.log(
      chalk.red("读取文件夹错误！")
    )
  }
}

module.exports = statLines