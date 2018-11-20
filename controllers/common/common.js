
const qiniu = require('qiniu')
const fs = require('fs')
const path = require('path')
const statusCode = require('../../config/statusCode') // 状态码统一管理
/**
   * [description] 上传文件
   * @param {String} ctx  请求上下文
   */
function upToQiniu (newName, readStream) {
  const accessKey = 'rORkrVtCj3ThaOGef1lM8u_cAOcHLwXAMv5E1gdV'
  const secretKey = 'UU1_FXShOqcAR9H-41k3_gUpb-aaBzfO8h4f8vLx'

  // 生成一个上传的凭证
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

  // 设置七牛的上传空间
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: 'panglongmao'
  })
  // 生成上传的Token
  const uploadToken = putPolicy.uploadToken(mac)

  // 实例化config
  const config = new qiniu.conf.Config()
  // 空间对应的机房
  // 华东	qiniu.zone.Zone_z0
  // 华北 qiniu.zone.Zone_z1
  // 华南 qiniu.zone.Zone_z2
  // 北美 qiniu.zone.Zone_na0
  config.zone = qiniu.zone.Zone_z0
  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()
  // 文件上传
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, newName, readStream, putExtra, function (respErr, respBody, respInfo) {
      if (respErr) {
        reject(respErr)
      }
      if (respInfo.statusCode == 200) {
        resolve(respBody)
      } else {
        resolve(respBody)
      }
    })
  })
}
class CommonController {
  async upload (ctx) {
    const _file = ctx.request.files.file // 前台type=file post过来的文件
    if (!_file) {
      ctx.body = statusCode.RETURN_DATA(6001, '请上传文件', {})
    }
    console.log(_file.path)
    const readStream = fs.readFileSync(_file.path) // 文件流对象
    const newName = Math.random().toString(16).substr(2) + '-' + _file.name

    await upToQiniu(newName, readStream).then(res => {
      console.log(res)
      ctx.body = res
    }).catch(err => {
      console.log(err)
      ctx.body = err
    })
  }
}

module.exports = CommonController
