const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pdx646464',
  port: 3306,
  database: 'myblog',
})

// 开始链接
con.connect()

// 执行sql语句
// const sql = 'select id, username from users;'
const sql = 'update users set realname="李四" where username="lisi";'
con.query(sql, (err, result) => {
  if (err) console.info(err)
  console.info(result)
})

// 关闭链接
con.end()
