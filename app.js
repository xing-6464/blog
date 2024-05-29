const qs = require('qs')

const { get, set } = require('./src/db/redis')
const { access } = require('./src/util/log')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// session数据
// const SESSION_DATA = {}

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toUTCString()
}

// 用于处理 post data
const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }

    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }

    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })

  return promise
}

const serverHandle = (req, res) => {
  // 记录日志
  access(
    `${req.method} --- ${req.url} --- ${
      req.headers['user-agent']
    } --- ${Date.now()}`
  )

  res.setHeader('Content-type', 'application/json')

  // 获取url
  const url = req.url
  req.path = url.split('?')[0]

  // 解析 query
  req.query = qs.parse(url.split('?')[1])

  // 解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || '' // k1=v1; k2=v2
  cookieStr.split(';').forEach(item => {
    if (!item) return
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })

  // 解析 session
  // let needSetCookie = false
  // let userId = req.cookie.userId
  // if (userId) {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {}
  //   }
  // } else {
  //   needSetCookie = true
  //   userId = `${Date.now()}_${Math.random()}`
  //   SESSION_DATA[userId] = {}
  // }
  // req.session = SESSION_DATA[userId]

  // 使用redis 解析 session
  let needSetCookie = false
  let userId = req.cookie.userId
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    // 初始化 redis 中的 session 值
    set(userId, {})
  }
  // 获取session
  req.sessionId = userId
  get(req.sessionId)
    .then(sessionData => {
      if (sessionData == null) {
        //  初始化 redis 中的 session 值
        set(userId, {})
        // 设置 session
        req.session = {}
      } else {
        req.session = sessionData
      }
      console.log('session:', req.session)

      return getPostData(req)
    })
    .then(postData => {
      // 处理post data
      req.body = postData

      // 处理blog路由
      const blogResult = handleBlogRouter(req, res)
      if (blogResult) {
        blogResult.then(blogData => {
          if (needSetCookie) {
            res.setHeader(
              'Set-Cookie',
              `userId=${userId}; path=/; HttpOnly; expires=${getCookieExpires()}`
            )
          }
          res.end(JSON.stringify(blogData))
        })

        return
      }

      // 处理user路由
      const userResult = handleUserRouter(req, res)
      if (userResult) {
        userResult.then(userData => {
          if (needSetCookie) {
            res.setHeader(
              'Set-Cookie',
              `userId=${userId}; path=/; HttpOnly; expires=${getCookieExpires()}`
            )
          }
          res.end(JSON.stringify(userData))
        })

        return
      }

      // 未命中路由, 返回404
      res.writeHead(404, { 'Content-type': 'text/plan' })
      res.write('404 Not Found\n')
      res.end()
    })
}

module.exports = serverHandle

// process.env.NODE_ENV
