const fs = require('fs')
const path = require('path')

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + '\n')
}

// 生成 write Steam
function createWriteStream(fileName) {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
  const writeStream = fs.createWriteStream(fullFileName, { flags: 'a' })

  return writeStream
}

// 写入访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log) {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access,
}
