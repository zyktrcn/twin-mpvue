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

let getMode = (mode) => {
  if (mode >= 0 && mode < 20) {
    return '/static/images/home/verySad_grey.png'
  } else if (mode >= 20 && mode < 40) {
    return '/static/images/home/sad_grey.png'
  } else if (mode >= 40 && mode < 60) {
    return '/static/images/home/normal_grey.png'
  } else if (mode >= 60 && mode < 80) {
    return '/static/images/home/happy_grey.png'
  } else if (mode >= 80 && mode <= 100) {
    return '/static/images/home/veryHappy_grey.png'
  } else {
    return '/static/images/home/normal_grey.png'
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
  getMode,
  getNoteDate
}
