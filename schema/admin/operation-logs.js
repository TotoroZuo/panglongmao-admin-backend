const moment = require('moment')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('admin_operation_logs', {
    lid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    logContent: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    idCard: {
      type: DataTypes.STRING(18),
      allowNull: false
    },
    operaterIp: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    operateTime: {
      type: DataTypes.DATE,
      get () {
        return moment(this.getDataValue('createTime')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    operateTimeUnix: {
      type: DataTypes.BIGINT(14),
      allowNull: false
    }
  }, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: true
  })
}
