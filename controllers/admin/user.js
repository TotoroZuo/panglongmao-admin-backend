const jwt = require('jsonwebtoken') // 加密解密token
const config = require('../../config/config')
const statusCode = require('../../config/statusCode') // 状态码统一管理
const userModel = require('../../models/admin/user')// 用户模块model，主要用于数据交换

class UserController {
  /**
   * [description] 获取用户openid
   * @param {String} ctx  请求上下文
   */
  static async doLogin (ctx) {
    const account = ctx.request.body.account
    const password = ctx.request.body.password
    if (!account && !password) {
      ctx.body = statusCode.RETURN_DATA(6101, '帐号密码不能为空', {})
      return false
    }
    if (!account) {
      ctx.body = statusCode.RETURN_DATA(6102, '帐号不能为空', {})
      return false
    }
    if (!password) {
      ctx.body = statusCode.RETURN_DATA(6103, '密码不能为空', {})
      return false
    }

    await userModel.findUserByAccountPassword({
      account,
      password
    }).then(result => {
      if (!result) {
        ctx.body = statusCode.RETURN_DATA(404, '帐号密码错误', result)
        return false
      }
      if (result && !result.status) {
        ctx.body = statusCode.RETURN_DATA(403, '该账号被禁用', result)
        return false
      }
      // 用户token 包含信息
      const userToken = {
        uid: result.uid,
        type: 'admin'
      }
      // 签发token
      const token = jwt.sign(userToken, config.SECRET, {
        expiresIn: '1h'
      })
      let returnData = {
        token,
        info: result
      }
      ctx.body = statusCode.RETURN_DATA(200, '登录成功', returnData)
    })
  }
  /**
    * [description] 获取用户openid
    * @param {String} ctx  请求上下文
    */
  static async getUerInfo (ctx) {
    const UID = ctx.query.uid
    if (!UID) {
      ctx.body = statusCode.RETURN_DATA(500, '参数错误', {})
      return false
    }
    const user = await userModel.findUserById(UID)
    if (!user) {
      ctx.body = statusCode.RETURN_DATA(404, '该用户信息不存在', {})
      return false
    }
    ctx.body = statusCode.RETURN_DATA(200, '获取用户信息成功', user)
  }

  /**
     * [description] 存储更新用户信息
     * @param {*} ctx
     */
  static async createUserInfo (ctx) {
    // const info = ctx.request.body
    const info = {
      account: 'panglongmao',
      password: 'zlf123',
      userName: '左龙飞',
      role: '1,2',
      phone: '15537922825',
      idCard: '410184199103065051',
      avator: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKabrSY1Qm2ziaatAA1LJlYQq1n2JpsfwO02JujWsVA9qkw08IibDaJlnjPR21bSx4dgVecPsCPQ5vQ/132',
      status: 1,
      supper: 1
    }
    if (!info) {
      ctx.body = statusCode.RETURN_DATA(500, '缺少参数', {})
      return false
    }
    const newUser = {
      account: info.account,
      password: info.password,
      userName: info.userName,
      role: info.role,
      phone: info.phone,
      idCard: info.idCard,
      avator: info.avator,
      status: info.status,
      supper: info.supper,
      createTime: new Date().getTime(),
      updateTime: new Date().getTime(),
      createTimeUnix: new Date().getTime(),
      updateTimeUnix: new Date().getTime()
    }
    const user = await userModel.findUserByAcountOrPhone(info.account, info.phone, info.idCard)
    if (user && user.account == info.account) {
      ctx.body = statusCode.RETURN_DATA(6001, '账户名已存在', {})
      return false
    }
    if (user && user.phone == info.phone) {
      ctx.body = statusCode.RETURN_DATA(6002, '改手机号已被使用', {})
      return false
    }
    if (user && user.idCard == info.idCard) {
      ctx.body = statusCode.RETURN_DATA(6003, '该身份证已被使用', {})
      return false
    }
    await userModel.createUser(newUser).then(res => {
      ctx.body = statusCode.RETURN_DATA(200, '用户信息添加成功', res)
    })

    // ctx.body = statusCode.RETURN_DATA(200,'用户信息更新成功', {})
  }
  /**
     * [description] 存储更新用户信息
     * @param {*} ctx
     */
  static async updateUserInfo (ctx) {
    const info = ctx.request.body
    const UID = ctx.state.user.uid
    if (!info) {
      ctx.body = statusCode.RETURN_DATA(500, '缺少参数', {})
      return false
    }
    const newInfo = {
      account: info.account,
      password: info.password,
      userName: info.userName,
      role: info.role,
      phone: info.phone,
      idCard: info.idCard,
      avator: info.avator,
      status: info.status,
      supper: info.supper,
      updateTime: new Date().getTime(),
      updateTimeUnix: new Date().getTime()
    }
    const updateReturn = await userModel.updateUserInfoById(UID, newInfo)
    console.log(updateReturn)
    if (!updateReturn) {
      ctx.body = statusCode.RETURN_DATA(417, '用户信息更新失败', {})
      return false
    }
    await userModel.findUserById(UID).then(result => {
      if (result) {
        ctx.body = statusCode.RETURN_DATA(200, '用户信息更新成功', result)
      } else {
        ctx.body = statusCode.RETURN_DATA(418, '用户信息更新成功，获取用户信息失败', result)
      }
    })
    // ctx.body = statusCode.RETURN_DATA(200,'用户信息更新成功', {})
  }
}

module.exports = UserController
