const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
!(async () => {
  redisClient
    .connect()
    .then(() => {
      console.log('redis connected')
    })
    .catch(console.error)
})()

async function set(key, value) {
  let objVal
  if (typeof value === 'object') {
    objVal = JSON.stringify(value)
  } else {
    objVal = value
  }
  return await redisClient.set(key, objVal)
}

async function get(key) {
  try {
    let val = await redisClient.get(key)
    if (val === null) return val

    try {
      val = JSON.parse(val)
    } catch (e) {}

    return val
  } catch (e) {
    throw e
  }
}

module.exports = {
  set,
  get,
}
