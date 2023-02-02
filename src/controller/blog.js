const getList = (author, keyword) => {
  // 返回假数据（但是格式是正确的）
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1546610491112,
            author: 'xing'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1546610491113,
            author: 'lisi'
        }
    ]
}

const getDetail = (id) => {
  // 返回假数据
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1546610491112,
        author: 'zhangsan'
    }
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含title content 属性

    return {
        id: 3 // 新建博客插入到数据表里面的 id
    }
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
    updateBlog
}
