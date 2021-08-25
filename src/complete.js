const chalk = require('chalk')

function complete(fileStat) {
  const keys = Object.keys(fileStat)
  if (keys.length) {
    console.log(fileStat)
    let sum = 0
    keys.forEach(e => {
      sum += fileStat[e]
    })
    console.log(`总计${keys.length}个文件,${sum}行`)
  } else {
    console.log(
      chalk.red(`未统计到${fileType}类型文件`)
    )
  }
}
module.exports = complete
