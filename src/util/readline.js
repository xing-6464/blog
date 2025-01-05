const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log')
const readSteam = fs.createReadStream(fileName)

const rl = readline.createInterface({
  input: readSteam,
})

let chromeNum = 0
let sum = 0

rl.on('line', lineData => {
  if (!lineData) {
    return
  }

  sum++ // 统计总访问量

  const arr = lineData.split(' --- ')
  if (arr[2] && arr[2].indexOf('Chrome') > 0) {
    chromeNum++ // 统计Chrome访问量
  }
})

rl.on('close', () => {
  console.log(
    `总访问量：${sum}，Chrome访问量：${chromeNum}，Chrome占比：${
      (chromeNum / sum) * 100
    }%`
  )
})
