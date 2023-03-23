const mysql = require('mysql')
const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    console.info(author)
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  // 返回promise
  return exec(sql)
}

const getDetail = id => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => rows[0])
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含title content 属性
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createtime = Date.now()

  let sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', ${createtime}, '${author}');`

  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId,
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的id
  // blogData 是一个博客对象，包含title content 属性
  console.log('update blog', id, blogData)

  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
}
