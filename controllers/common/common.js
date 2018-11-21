
const qiniu = require('qiniu')
const fs = require('fs')
const path = require('path')
const statusCode = require('../../config/statusCode') // 状态码统一管理


function getSuffix(fileName) {
  return fileName.split('.').pop()
}
// 重命名
function Rename(fileName) {
  return Math.random().toString(16).substr(2) + '.' + getSuffix(fileName)
}

/**
   * [description] 上传文件
   * @param {String} ctx  请求上下文
   */
function upToQiniu(fileName, readableStream) {
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
    formUploader.putStream(uploadToken, fileName, readableStream, putExtra, function (respErr, respBody, respInfo) {
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

// 上传到本地服务器
// function uploadFile(ctx, options) {
//   const file = ctx.request.files.file
//   const fileType = options.fileType
//   const filePath = path.join(options.path, fileType)
//   const fileName = Rename(file.name)
//   const saveTo = path.join(filePath, fileName)
//   const confirm = mkdirsSync(filePath)
//   if (!confirm) {
//     return
//   }
//   const reader = fs.createReadStream(file.path);
//   const writer = fs.createWriteStream(saveTo);
//   reader.pipe(writer);
//   console.log('start uploading...')

//   return {
//     imgName: fileName,
//     imgPath: saveTo
//   }
// }
class CommonController {
  static async upload (ctx) {
    ctx.set("Access-Control-Allow-Origin", "*");
    // 上传到七牛
    const file = ctx.request.files.file
    const fileName = Rename(file.name)

    const readableStream = fs.createReadStream(file.path);
    // 上传七牛
    const qiniu = await upToQiniu(fileName, readableStream)
    if (qiniu && qiniu.key) {
      ctx.body = statusCode.RETURN_DATA(200, '上传成功', {
        imgUrl: `http://upload.zuolongfei.me/${qiniu.key}`
      })
    }else{
      ctx.body = statusCode.RETURN_DATA(600, '上传失败', {})
    }
    
  }
}

module.exports = CommonController
