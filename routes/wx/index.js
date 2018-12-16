const Router = require('koa-router')
const UserController = require('../../controllers/wx/user')
const prefix = '/wx'
const router = new Router()

/**
 * 用户接口
 */
// 获取用户openid
router.get(prefix + '/user/getToken', UserController.getUerOpenid)
// 存储用户信息
router.post(prefix + '/user/storeUser', UserController.storeUserInfo)
// 存储用户信息
router.post(prefix + '/user/findUser', UserController.findUser)

module.exports = router
