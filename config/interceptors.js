const jwt = require('jsonwebtoken')
const config = require('./config')
const util = require('util')
const verify = util.promisify(jwt.verify)
const statusCode = require('./statusCode')

/**
 * 判断token是否可用
 */
module.exports = function () {
  return async function (ctx, next) {
    try {
      const token = ctx.header.authorization // 获取jwt
      if (token) {
        try {
          let payload = await verify(token.split(' ')[1], config.SECRET) // 解密payload，获取用户名和ID
          console.log(payload)
          if (payload.type) { // 后台
            ctx.state.user = {
              uid: payload.uid
            }
          } else { // 微信
            ctx.state.user = {
              openid: payload.openid
            }
          }
        } catch (err) {
          err.status = 401
          ctx.body = statusCode.ERROR_401('token verify fail')
        }
      }
      await next()
    } catch (err) {
      if (err.status === 401) {
        ctx.status = 401
        ctx.body = statusCode.ERROR_401('unauthorized，请求需要用户的身份认证！')
      } else if (err.name === 'UnauthorizedError') {
        await next()
      } else {
        throw err
      }
    }
  }
}
