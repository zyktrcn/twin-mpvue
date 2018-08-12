import { api } from './config.js'

let rq = async (url, data, method) => {
  return new Promise((resolve) => {
    wx.request({
      url: api[url],
      method: method || 'GET',
      data: data,
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        console.log(`fail to request ${url}`, err)
        throw new Error(err)
      }
    })
  })
}

let getUserInfo = async () => {
  return new Promise((resolve) => {
    wx.getUserInfo({
      success: (userInfo) => {
        resolve(userInfo.userInfo)
      },
      fail: (err) => {
        console.log('fail to get user info:', err)
        throw new Error(err)
      }
    })
  })
}

let wxLogin = async (code, userInfo) => {
  return new Promise((resolve) => {
    wx.login({
      success: (res) => {
        resolve(res.code)
      },
      fail: (err) => {
        console.log('fail to wxLogin:', err)
        throw new Error(err)
      }
    })
  })
}

let getUserLocation = async () => {
  return new Promise((resolve) => {
    wx.getLocation({
      success: (location) => {
        resolve(location)
      },
      fail: (err) => {
        console.log('fail to get user location:', err)
        throw new Error(err)
      }
    })
  })
}

export {
  rq, getUserInfo, wxLogin, getUserLocation
}
