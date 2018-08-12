let getWeatherIcon = (weather) => {
  if (typeof weather !== 'string') return '/static/images/home/sunny.png'
  if (weather.indexOf('晴') > -1) {
    return '/static/images/home/sunny.png'
  } else if (weather.indexOf('多云') > -1 || weather.indexOf('阴') > -1) {
    return '/static/images/home/cloud.png'
  } else if (weather.indexOf('雨') > -1) {
    return '/static/images/home/rainy.png'
  } else if (weather.indexOf('雪') > -1) {
    return '/static/images/home/snow.png'
  } else if (weather.indexOf('雾') > -1 || weather.indexOf('尘') > -1 || weather.indexOf('沙') > -1 || weather.indexOf('霾') > -1) {
    return '/static/images/home/fly_ash.png'
  } else {
    return '/static/images/home/sunny.png'
  }
}

let weekStr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
let getNoteDate = (note) => {
  let date = new Date(note.date || note.created_at)
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    time: date.toTimeString().split(' ')[0],
    weekStr: weekStr[date.getDay()],
    dateStr: date.toDateString()
  }
}

export {
  getWeatherIcon,
  getNoteDate
}
