const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method //GET POST

  // 登录
  if (method === 'GET' && req.path === '/api/user/login') {
    // const { username, password } = req.body
    const { username, password } = req.query
    const result = login(username, password)

    return result.then(data => {
      if (data.username) {
        res.setHeader('Set-Cookie', `username=${data.username}; path=/`)
        return new SuccessModel()
      }
      return new ErrorModel('登录失败')
    })
  }

  // 登录测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    const cookie = req.cookie
    if (cookie.username) {
      return Promise.resolve(
        new SuccessModel({
          username: cookie.username,
        })
      )
    }

    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

module.exports = handleUserRouter
