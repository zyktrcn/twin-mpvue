import { rq } from '../../api/index.js'
import lodash from 'lodash'

export default {
  state: {
    list: []
  },
  getters: {
    notificationList: state => state.list
  },
  mutations: {
    saveNotification: (state, list) => {
      let returnDate = (date) => {
        let newDate = new Date(date)
        let year = newDate.getFullYear()
        let mon = newDate.getMonth() + 1
        let day = newDate.getDate()
        let hour = newDate.getHours()
        let min = newDate.getMinutes()
        let sec = newDate.getSeconds()

        let full = (e) => {
          return e < 10 ? `0${e}` : e
        }

        mon = full(mon)
        day = full(day)
        hour = full(hour)
        min = full(min)
        sec = full(sec)

        return `${year}-${mon}-${day} ${hour}:${min}:${sec}`
      }
      state.list = lodash.map(list, (item) => {
        item.date = returnDate(item.date)
        return item
      })
    }
  },
  actions: {
    getNotification: async ({ state, commit, rootState }) => {
      try {
        let res = await rq(
          'notification',
          rootState.key
        )
        if (res.code === 0) {
          commit('saveNotification', res.data)
        }
        return res
      } catch (err) {
        console.log('catch err:', err)
      }
    }
  }
}
