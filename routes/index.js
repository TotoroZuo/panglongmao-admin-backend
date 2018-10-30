const Router = require('koa-router')
const UserController = require('../controllers/user')

const router = new Router()

/**
 * 用户接口
 */
// 用户注册
router.get('/user/register', UserController.create);
// 用户登录
router.post('/user/login', UserController.login);
// 删除用户
router.delete('/user/delete/:id', UserController.delete);
// 获取用户信息
router.get('/user/info', UserController.getUserInfo);
// 获取用户列表
router.get('/user/list', UserController.getUserList);


module.exports = router