const jwt = require('jsonwebtoken') // 加密解密token
const config = require('../../config/config')
const statusCode = require('../../config/statusCode') // 状态码统一管理
const articleModel = require('../../models/admin/article')// 用户模块model，主要用于数据交换

class ArticleController {
  /**
     * [description] 存储更新用户信息
     * @param {*} ctx
     */
  static async createNewArticle (ctx) {
    const info = ctx.request.body

    if (!info) {
      ctx.body = statusCode.RETURN_DATA(500, '缺少参数', {})
      return false
    }
    const newArticle = {
      title: info.title,
      introduction: info.introduction,
      author: info.author,
      tag: info.tag,
      category: info.category,
      subPic: info.subPic,
      origin: info.origin,
      content: info.content,
      time: info.time,
      recommend: info.recommend,
      weight: info.weight,
      status: info.status,
      createdTime: new Date().getTime(),
      updatedTime: new Date().getTime()
    }

    await articleModel.createArticle(newArticle).then(res => {
      ctx.body = statusCode.RETURN_DATA(200, '文章创建成功', res)
    })

    // ctx.body = statusCode.RETURN_DATA(200,'用户信息更新成功', {})
  }
  /**
     * [description] 存储更新用户信息
     * @param {*} ctx
     */
  static async updateArticle (ctx) {
    const info = ctx.request.body
    if (!info) {
      ctx.body = statusCode.RETURN_DATA(500, '缺少参数', {})
      return false
    }
    const newInfo = {
      aid: info.aid,
      title: info.title,
      introduction: info.introduction,
      author: info.author,
      tag: info.tag,
      content: info.content,
      category: info.category,
      recommend: info.recommend,
      status: info.status,
      updatedAt: new Date().getTime()
    }
    const updateReturn = await articleModel.updateArticle(info.aid, newInfo)
    if (!updateReturn) {
      ctx.body = statusCode.RETURN_DATA(417, '文章更新失败', {})
      return false
    }
    ctx.body = statusCode.RETURN_DATA(200, '文章更新成功', updateReturn)
    // ctx.body = statusCode.RETURN_DATA(200,'用户信息更新成功', {})
  }
  /**
     * [description] 获取文章列表
     * @param {*} ctx
     */
  static async getArticleList (ctx) {
    const params = ctx.request.body
    await articleModel.getArticleList(params).then(res => {
      ctx.body = statusCode.RETURN_DATA(200, '获取文章列表成功', res)
    })
  }
}

module.exports = ArticleController
