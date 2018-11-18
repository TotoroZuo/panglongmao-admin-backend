const statusCode = {
  ERROR_401: (msg) => {
    return {
      code: 401,
      msg
    }
  },

  ERROR_403: (msg) => {
    return {
      code: 403,
      msg
    }
  },

  ERROR_404: (msg) => {
    return {
      code: 404,
      msg
    }
  },

  ERROR_412: (msg) => {
    return {
      code: 412,
      msg
    }
  },
  // 获取openid，缺少code
  USER_6001: (msg) => {
    return {
      code: 6001,
      msg
    }
  },

  SUCCESS_200: (msg, data) => {
    return {
      code: 200,
      msg,
      data
    }
  },
  RETURN_DATA: (code, msg, data) => {
    return {
      code,
      msg,
      data
    }
  }
}

module.exports = statusCode
