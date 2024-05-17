const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient
  .connect()
  .then(() => {
    console.log('redis connected')
  })
  .catch(err => {
    console.log(err)
  })

async function set(key, value) {
  if (typeof value !== 'object') {
    value = JSON.stringify(value)
  }
  return await redisClient.set(key, value)
}

function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }

      try {
        resolve(JSON.parse(val))
      } catch (e) {
        resolve(val)
      }
    })
  })

  return promise
}

module.exports = {
  set,
  get,
}
