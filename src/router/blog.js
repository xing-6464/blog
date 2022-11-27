const { getList } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleBlogRouter = (req, res) => {
  const method = req.method //GET POST
  
  // 获取一篇博客
  if (method === 'GET' && req.path === '/api/blog/list') {
      const author = req.query.author || ''
      const keyword = req.query.keyword || ''
      const listData = getList(author, keyword)
      
      return new SuccessModel(listData)
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    return {
      msg: '这是获取博客详情接口'
    }
  }

  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: '新建博客接口'
    }
  }

  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: '更新博客接口'
    }
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    return {
      msg: '删除博客接口'
    }
  }
}

module.exports = handleBlogRouter
