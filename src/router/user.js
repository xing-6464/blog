const handleUserRouter = (req, res) => {
  const method = req.method //GET POST

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: '这是登录接口'
    }
  }

}

module.exports =handleUserRouter
