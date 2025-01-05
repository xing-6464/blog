const mysql = require('mysql2')
const { MYSQL_CONF } = require('../conf/db')

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始链接
con.connect()

// 统一执行sql函数
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })

  return promise
}

// con.end()

module.exports = {
  exec,
  escape: mysql.escape,
}
