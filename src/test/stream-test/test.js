// 标准输入输出流测试
// process.stdin.pipe(process.stdout)

// const http = require('http')
// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     req.pipe(res)
//   }
// })

// server.listen(8000)

// 复制文件
// const fs = require('fs')
// const path = require('path')

// const fileName = path.resolve(__dirname, 'data.txt')
// const fileName2 = path.resolve(__dirname, 'data-bak.txt')

// const readStream = fs.createReadStream(fileName)
// const writeStream = fs.createWriteStream(fileName2)

// readStream.pipe(writeStream)

// readStream.on('data', chunk => {
//   console.log(`正在写入${chunk.toString()}字节数据...`)
// })
// readStream.on('end', () => {
//   console.log('文件复制完成')
// })

const fs = require('fs')
const path = require('path')
const http = require('http')
const name = path.resolve(__dirname, 'data.txt')
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const readStream = fs.createReadStream(name, { encoding: 'utf8' })
    readStream.pipe(res)
  }
})

server.listen(8000)
