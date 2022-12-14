const qs = require('qs')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')


const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json')

  // 获取url
  const url = req.url
  req.path = url.split('?')[0]

  // 解析 query
  req.query = qs.parse(url.split('?')[1])

  // 处理blog路由
  const blogData = handleBlogRouter(req, res)
  if (blogData) {
    res.end(
      JSON.stringify(blogData)
    )
    return
  }

  // 处理user路由
  const userData = handleUserRouter(req, res)
  if (userData) {
    res.end(
      JSON.stringify(userData)
    )
    return
  }

  // 未命中路由, 返回404
  res.writeHead(404, { "Content-type": "text/plan" })
  res.write("404 Not Found\n")
  res.end()

}

module.exports = serverHandle

// process.env.NODE_ENV
