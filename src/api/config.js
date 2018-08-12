
// domain: 'http://127.0.0.1:3002/',
let domain = 'https://2life.api.ursb.me/'
let api = {
  login: `${domain}users/wxp_login`,
  list: `${domain}notes/list`,
  location: 'https://restapi.amap.com/v3/geocode/regeo',
  weather: 'https://restapi.amap.com/v3/weather/weatherInfo'
}
let key = {
  location: '9d6935d546e2b3ec1ee3b872c1ee9bbe',
  weather: '9d6935d546e2b3ec1ee3b872c1ee9bbe'
}

export {
  domain, api, key
}
