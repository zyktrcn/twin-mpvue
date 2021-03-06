import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/home/main',
      'pages/home/add/main',
      'pages/home/detail/main',
      'pages/notification/main',
      'pages/profile/main',
      'pages/profile/chart/main',
      'pages/profile/match/main',
      'pages/profile/analysis/main',
      'pages/profile/setting/main',
      'pages/profile/setting/feedback/main',
      'pages/profile/setting/agreement/main',
      'pages/profile/setting/thanks/main'
    ],
    tabBar: {
      list: [
        {
          'pagePath': 'pages/home/main',
          'text': '日记',
          'iconPath': '/static/images/home.png',
          'selectedIconPath': '/static/images/home_selected.png'
        },
        {
          'pagePath': 'pages/notification/main',
          'text': '通知',
          'iconPath': '/static/images/notification.png',
          'selectedIconPath': '/static/images/notification_selected.png'
        },
        {
          'pagePath': 'pages/profile/main',
          'text': '我的',
          'iconPath': '/static/images/profile.png',
          'selectedIconPath': '/static/images/profile_selected.png'
        }
      ],
      color: '#aaaaaa',
      selectedColor: '#444444'
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
}
