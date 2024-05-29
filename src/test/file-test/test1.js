const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// read file
fs.readFile(fileName, (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  // data 是 二进制类型需要转换成字符串
  console.log(data.toString())
})

// write file
const content = 'hello world\n'
const opt = {
  flag: 'a', // 追加模式. 默认为覆盖模式 w
}
fs.writeFile(fileName, content, opt, err => {
  if (err) {
    console.error(err)
  }
})

// 判断文件是否存在
fs.open(fileName, (e, fd) => {
  console.log(e, fd)
})
