// 环境变量
const env = process.env.NODE_ENV

// 配置
let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '646464',
    port: 3306,
    database: 'myblog',
  }

  REDIS_CONF = {
    host: 'localhost',
    port: 6379,
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '646464',
    port: 3306,
    database: 'myblog',
  }

  REDIS_CONF = {
    host: 'localhost',
    port: 6379,
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
}
