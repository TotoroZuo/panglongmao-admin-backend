const db = require('../../config/db')
const Sequelize = db.sequelize
const Article = Sequelize.import('../../schema/admin/article')

Article.sync({ force: false })

class ArticleModel {
  /**
     * 创建文章
     * @param data
     * @returns {Promise<*>}
     */
  static async createArticle (info) {
    return await Article.create({
      title: info.title,
      introduction: info.introduction,
      author: info.author,
      tag: info.tag,
      content: info.content,
      category: info.category,
      recommend: info.recommend,
      status: info.status,
      createdAt: info.createdAt,
      updatedAt: info.updatedAt
    })
  }

  /**
     * 更新文章数据
     * @param id  用户ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
  static async updateArticle (aid, info) {
    return await Article.update({
      title: info.title,
      introduction: info.introduction,
      author: info.author,
      tag: info.tag,
      content: info.content,
      category: info.category,
      recommend: info.recommend,
      status: info.status,
      updatedAt: info.updatedAt
    }, {
      where: {
        aid
      },
      fields: ['aid', 'title', 'author', 'tag', 'introduction', 'content', 'category', 'recommend', 'browser', 'status', 'createdAt', 'updatedAt']
    })
  }

  /**
     * 获取文章列表
     * @returns {Promise<*>}
     */
  static async getArticleList (params) {
    let ret = null
    let page = params.page ? parseInt(params.page) : 1
    let category = params.category ? params.category : ''
    let sort = params.sort ? params.sort : ''
    const pageNums = 10

    if (category) {
      ret = await Article.findAndCountAll({
        limit: pageNums, // 每页10条
        offset: (page - 1) * pageNums,
        where: {
          category: category
        }
      })
    } else {
      ret = await Article.findAndCountAll({
        limit: pageNums, // 每页10条
        offset: (page - 1) * pageNums
      })
    }

    return {
      lists: ret.rows,
      current_page: parseInt(page),
      pageNums,
      total: ret.count,
      total_pages: Math.ceil(ret.count / 10)
    }
  }

  /**
     * 获取文章详情数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
  static async getArticleDetail (id) {
    return await Article.findOne({
      where: {
        id
      }
    })
  }

  /**
     * 删除文章
     * @param id listID
     * @returns {Promise.<boolean>}
     */
  static async deleteArticle (id) {
    await Article.destroy({
      where: {
        id
      }
    })
    return true
  }
}

module.exports = ArticleModel
