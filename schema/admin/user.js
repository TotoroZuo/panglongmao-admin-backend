const moment = require('moment')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('admin_user', {
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    account: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    idCard: {
      type: DataTypes.STRING(18),
      allowNull: false
    },
    avator: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'status',
      defaultValue: 1
    },
    supper: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'supper',
      defaultValue: 0
    },
    loginTimes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'loginTimes',
      defaultValue: 0
    },
    lastLoginIp: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lastLoginTime: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    createTime: {
      type: DataTypes.DATE,
      get () {
        return moment(this.getDataValue('createTime')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    createTimeUnix: {
      type: DataTypes.BIGINT(14),
      allowNull: false
    },
    updateTime: {
      type: DataTypes.DATE,
      get () {
        return moment(this.getDataValue('updateTime')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    updateTimeUnix: {
      type: DataTypes.BIGINT(14),
      allowNull: false
    },
    isDel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'isDel',
      defaultValue: 0
    }
  }, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: true
  })
}
