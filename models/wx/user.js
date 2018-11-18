const db = require('../../config/db')
const Sequelize = db.sequelize
const User = Sequelize.import('../../schema/wx/user')
User.sync({ force: false })

class UserModel {
  /**
     * 查询用户信息
     * @param openid openid
     * @returns {Promise.<*>}
     */
  static async findUserByOpenid (openid) {
    return await User.findOne({
      where: {
        openid
      }
    })
  }

  /**
     * 更新用户信息
     * @param openid openid
     * @returns {Promise.<*>}
     */
  static async updateUserInfoById (id, info) {
    return await User.update({
      token: info.token,
      username: info.username,
      avator: info.avator,
      updateTime: info.updateTime,
      updateTimeUnix: info.updateTimeUnix
    }, {
      where: {
        id
      },
      fields: ['token', 'username', 'avator', 'updateTime', 'updateTimeUnix']
    })
  }
  /**
    * 创建用户
    * @param data
    * @returns {Promise<*>}
    */
  static async createUser (info) {
    return await User.create({
      openid: info.openid,
      token: info.token,
      username: info.username,
      avator: info.avator,
      createTime: info.createTime,
      createTimeUnix: info.createTimeUnix,
      updateTime: info.updateTime,
      updateTimeUnix: info.updateTimeUnix
    })
  }
}

module.exports = UserModel
