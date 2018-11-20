const Router = require('koa-router')
const UserController = require('../../controllers/admin/user')
const MenuController = require('../../controllers/admin/menu')
const ArticleController = require('../../controllers/admin/article')
const CommonController = require('../../controllers/common/common')
const Common = new CommonController()
const prefix = '/admin'
const router = new Router()

/**
 * 用户接口
 */
// 获取用户openid
router.post(prefix + '/user/doLogin', UserController.doLogin)
// 存储用户信息
router.get(prefix + '/user/createUserInfo', UserController.createUserInfo)
router.post(prefix + '/menu/getMenus', MenuController.getMenus)

// 文章管理
router.post(prefix + '/article/addNewArticle', ArticleController.createNewArticle)
router.post(prefix + '/article/updateArticle', ArticleController.updateArticle)
router.post(prefix + '/article/getArticleList', ArticleController.getArticleList)
// 文件上传
router.post(prefix + '/common/upload', Common.upload)

module.exports = router
