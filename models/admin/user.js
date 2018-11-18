const db = require('../../config/db')
const Sequelize = db.sequelize
const Op = Sequelize.Op
const User = Sequelize.import('../../schema/admin/user')
const Crypto = require('crypto') // 加密模块
User.sync({ force: false })

class UserModel {
  /**
     * 查询用户信息
     * @param account 帐号
     * @param password 密码
     * @returns {Promise.<*>}
     */
  static async findUserByAccountPassword (prams) {
    let md5 = Crypto.createHash('md5')
    let newPassword = md5.update(prams.password).digest('hex')
    const finalPassword = newPassword.substr(0, (newPassword.length - 3))
    return await User.findOne({
      where: {
        account: prams.account,
        password: finalPassword,
        isDel: 0
      },
      fields: ['uid', 'userName', 'role', 'phone', 'idCard', 'avator', 'status', 'supper', 'updateTime', 'updateTimeUnix']
    })
  }
  /**
     * 查询用户信息 是否存在
     * @param account 帐号
     * @param password 密码
     * @returns {Promise.<*>}
     */
  static async findUserByAcountOrPhone (account, phone, idcard) {
    return await User.findOne({
      where: {
        [Op.or]: [{
          account
        }, {
          phone
        }, {
          idcard
        }]
      },
      fields: ['uid', 'userName', 'role', 'phone', 'idCard', 'avator', 'status', 'supper', 'updateTime', 'updateTimeUnix']
    })
  }
  /**
    * 查询用户信息
    * @param UID id
    * @returns {Promise.<*>}
    */
  static async findUserById (UID) {
    return await User.findOne({
      where: {
        uid: UID
      },
      fields: ['uid', 'userName', 'role', 'phone', 'idCard', 'avator', 'status', 'supper', 'updateTime', 'updateTimeUnix']
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
    let md5 = Crypto.createHash('md5')
    let newPassword = md5.update(info.password).digest('hex')
    console.log(newPassword)
    const finalPassword = newPassword.substr(0, (newPassword.length - 3))
    return await User.create({
      account: info.account,
      password: finalPassword,
      userName: info.userName,
      role: info.role,
      phone: info.phone,
      idCard: info.idCard,
      avator: info.avator,
      status: info.status,
      supper: info.supper,
      createTime: info.createTime,
      createTimeUnix: info.createTimeUnix,
      updateTime: info.updateTime,
      updateTimeUnix: info.updateTimeUnix
    })
  }
}

module.exports = UserModel
