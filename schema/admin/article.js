const moment = require('moment')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('article', {
    // 文章ID
    aid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true
    },
    // 文章标题
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'title'
    },
    // 文章简介
    introduction: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'introduction'
    },
    // 文章作者
    author: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'author'
    },
    // 文章标签
    tag: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'tag'
    },
    // 文章来源
    origin: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'origin'
    },
    // 文章缩略图
    subPic: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'subPic'
    },
    // 文章内容
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'content'
    },
    // 文章分类
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'category'
    },
    // 排序
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    // 是否为推荐
    recommend: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    // 浏览次数
    browser: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'browser',
      defaultValue: 0
    },
    time: {
      type: DataTypes.DATE,
      get () {
        return moment(this.getDataValue('time')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    createdTime: {
      type: DataTypes.DATE,
      get () {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    updatedTime: {
      type: DataTypes.DATE,
      get () {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'status',
      defaultValue: 1 // 1 草稿 2正式发布
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
