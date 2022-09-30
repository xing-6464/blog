const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json')

  const resData = {
    name: '星',
    site: 'xing'
  }

  res.end(
    JSON.stringify(resData)
  )
}

module.exports = serverHandle
