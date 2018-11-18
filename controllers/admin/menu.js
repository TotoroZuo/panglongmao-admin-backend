const jwt = require('jsonwebtoken') // 加密解密token
const config = require('../../config/config')
const statusCode = require('../../config/statusCode') // 状态码统一管理
const menuModel = require('../../models/admin/menu')// 用户模块model，主要用于数据交换

class MenuController {
  /**
    * [description] 获取用户openid
    * @param {String} ctx  请求上下文
    */
  static async getMenus (ctx) {
    const UID = ctx.state.user.uid
    const menus = await menuModel.getMenusByUser(UID)
    if (!menus) {
      ctx.body = statusCode.RETURN_DATA(404, '暂无菜单权限', {})
      return false
    }
    ctx.body = statusCode.RETURN_DATA(200, '获取菜单成功', menus)
  }
}

module.exports = MenuController
