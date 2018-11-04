const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        token: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        openid:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        avator:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        createTime:{
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createTime')).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        createTimeUnix: {
            type: DataTypes.BIGINT(14),
            allowNull: false
         },
        updateTime:{
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updateTime')).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        updateTimeUnix: {
            type: DataTypes.BIGINT(14),
            allowNull: false
        },
        isDel:{
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
