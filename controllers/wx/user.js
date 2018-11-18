const jwt = require('jsonwebtoken') // 加密解密token
const config = require('../../config/config')
const statusCode = require('../../config/statusCode') // 状态码统一管理

const userModel = require('../../models/wx/user')// 用户模块model，主要用于数据交换
const axios = require('axios')
class UserController {
  /**
    * [description] 获取用户openid
    * @param {String} ctx  请求上下文
    */
  static async getUerOpenid (ctx) {
    const code = ctx.query.code
    if (!code) {
      ctx.body = statusCode.RETURN_DATA(6001, '获取失败', {})
      return false
    }
    const params = {
      appid: config.APPID,
      secret: config.APPSECRET,
      js_code: code,
      grant_type: 'authorization_code'
    }
    await axios.get('https://api.weixin.qq.com/sns/jscode2session', { params })
      .then(res => {
        const response = res.data
        if (response.errcode) {
          ctx.body = statusCode.RETURN_DATA(response.errcode, response.errMsg, response)
        } else {
          // 用户token 包含信息
          const userToken = {
            openid: response.openid
          }
          // 签发token
          const token = jwt.sign(userToken, config.SECRET, {
            expiresIn: '1h'
          })

          ctx.body = statusCode.RETURN_DATA(200, response.errMsg, {
            token
          })
        }
      })
      .catch(error => {
        ctx.body = statusCode.RETURN_DATA(500, '系统异常', {})
      })
  }
  /**
     * [description] 存储更新用户信息
     * @param {*} ctx
     */
  static async storeUserInfo (ctx) {
    const params = ctx.request.body
    const openid = ctx.state.user.openid
    const token  = ctx.header.authorization
    if (!params) {
      ctx.body = statusCode.RETURN_DATA(500, '缺少参数', {})
      return false
    }

    const user = await userModel.findUserByOpenid(openid)
    if (user) {
      const newInfo = {
        token,
        username: params.username,
        avator: params.avator,
        updateTime: new Date(),
        updateTimeUnix: new Date().getTime()
      }
      await userModel.updateUserInfoById(user.id, newInfo)
      await userModel.findUserByOpenid(openid).then(result => {
        ctx.body = statusCode.RETURN_DATA(200, '用户信息更新成功', result)
      })
    } else {
      const newUser = {
        openid,
        token,
        username: params.username,
        avator: params.avator,
        createTime: new Date().getTime(),
        updateTime: new Date().getTime(),
        createTimeUnix: new Date().getTime(),
        updateTimeUnix: new Date().getTime()
      }
      await userModel.createUser(newUser).then(res => {
        ctx.body = statusCode.RETURN_DATA(200, '用户信息添加成功', res)
      })
    }
    // ctx.body = statusCode.RETURN_DATA(200,'用户信息更新成功', {})
  }
}

module.exports = UserController
