
// let domain = 'http://127.0.0.1:3002/'
let domain = 'https://2life.api.ursb.me/'
let api = {
  login: `${domain}users/wxp_login`,
  list: `${domain}notes/list`,
  qiniuToken: `${domain}utils/qiniu_token`,
  publish: `${domain}notes/publish`,
  update: `${domain}notes/update`,
  notification: `${domain}users/show_notification`,
  location: 'https://restapi.amap.com/v3/geocode/regeo',
  weather: 'https://restapi.amap.com/v3/weather/weatherInfo'
}
let key = {
  location: '9d6935d546e2b3ec1ee3b872c1ee9bbe',
  weather: '9d6935d546e2b3ec1ee3b872c1ee9bbe'
}
let navigation = {
  home: 'home/main',
  add: 'home/add/main',
  detail: 'home/detail/main',
  notification: 'notification/main',
  profile: 'profile/main'
}

export {
  domain, api, key, navigation
}
