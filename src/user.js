const handleUserRouter = (req, res) => {
  const method = req.method //GET POST
  const url = req.url
  const path = url.split('?')[0]

  // 登录
  if (method === 'POST' && path === '/api/blog/login') {
    return {
      msg: '这是登录接口'
    }
  }

}

module.exports =handleUserRouter
