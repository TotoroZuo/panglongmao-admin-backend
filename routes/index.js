const Router = require('koa-router')
const UserController = require('../controllers/user')

const router = new Router()

/**
 * 用户接口
 */
// 获取用户openid
router.get('/user/getToken', UserController.getUerOpenid);
// 存储用户信息
router.post('/user/storeUser', UserController.storeUserInfo);




module.exports = router