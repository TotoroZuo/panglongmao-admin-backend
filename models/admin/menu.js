
class MuneModel {
  /**
     * 查询用户信息
     * @param account 帐号
     * @param password 密码
     * @returns {Promise.<*>}
     */
  static async getMenusByUser (UID) {
    const menus = [
      {
        'id': '1', // ID
        'name': '用户管理', // 菜单名称
        'icon': 'group', // 菜单图标
        'isDirectory': false, // 是否为目录
        'path': '/system/users', // 跳转路径
        'blank': false, // 是否新窗口打开
        'weight': 0, // 排序
        'child': [] // 子目录
      },
      {
        'id': '2', // ID
        'name': '通知公告', // 菜单名称
        'icon': 'developer_board', // 菜单图标
        'isDirectory': false, // 是否为目录
        'path': '/system/notice', // 跳转路径
        'blank': false, // 是否新窗口打开
        'weight': 0, // 排序
        'child': [] // 子目录
      }
    ]
    return menus
  }
}

module.exports = MuneModel
