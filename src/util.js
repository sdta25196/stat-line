
const path = require('path')
const fs = require('fs')

function statLines(workPath, fileType, fileStat = {}) {
  try {
    const files = fs.readdirSync(workPath)
    files.forEach(file => {
      const stat = fs.lstatSync(path.resolve(`${workPath}/${file}`));
      if (stat.isDirectory()) {
        statLines(path.resolve(`${workPath}/${file}/`), fileType, fileStat)
      } else {
        const extname = path.extname(file)
        if (extname === fileType) {
          let data = fs.readFileSync(path.resolve(`${workPath}/${file}`), 'utf8')
          fileLine = data.split('\r\n').length
          fileStat[path.resolve(`${workPath}/${file}`)] = fileLine
        }
      }
    })
  } catch (error) {
    console.warn("读取文件夹错误！")
  }
}

module.exports = statLines