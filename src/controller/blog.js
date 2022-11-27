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

module.exports = {
  getList
}
