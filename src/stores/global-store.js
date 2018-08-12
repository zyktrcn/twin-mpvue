import Vue from 'vue'
import Vuex from 'vuex'
import lodash from 'lodash'
import { rq, getUserInfo, wxLogin, getUserLocation } from '../api/index.js'
import { key } from '../api/config.js'
import { getWeatherIcon, getNoteDate } from './config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    partner: {},
    key: {},
    location: {},
    weather: {},
    notes: []
  },
  mutations: {
    setLoginInfo: (state, info) => {
      state.user = info.user
      state.partner = info.partner
      state.key = info.key
    },
    setLocation: (state, { name, location, weather }) => {
      state.location[name] = location
      weather.icon = getWeatherIcon(weather.weather)
      state.weather[name] = weather
    },
    setNotes: (state, notes) => {
      lodash.forEach(notes, (val, index) => {
        notes[index].images = val.images.split(',')
        notes[index].getDate = getNoteDate(val)
        if (index === 0) return
        notes[index].hideDate = notes[index].getDate.dateStr === notes[index - 1].getDate.dateStr
      })
      state.notes = notes
    }
  },
  actions: {
    login: async ({ commit, state }) => {
      try {
        let userInfo = await getUserInfo()
        let code = await wxLogin()
        let loginRes = await rq('login', { code, userInfo }, 'POST')
        commit('setLoginInfo', loginRes.data)
        return loginRes.code
      } catch (err) {
        console.log('catch err:', err)
      }
    },
    getLocation: async ({ commit, state }) => {
      try {
        let location = await getUserLocation()
        let locationParams = [{
          name: 'user',
          value: location
        }]
        if (state.partner.id) {
          locationParams.push({
            name: 'partner',
            value: {
              longitude: state.partner.longitude,
              latitude: state.partner.latitude
            }
          })
        }
        for (let i = 0; i < locationParams.length; i++) {
          let name = locationParams[i].name
          let value = locationParams[i].value
          let locationRes = await rq('location', { key: key.location, location: `${value.longitude},${value.latitude}` })
          let data = locationRes.regeocode.addressComponent
          let weatherRes = await rq('weather', { key: key.weather, city: parseInt(data.adcode) })
          commit(
            'setLocation',
            {
              name: name,
              location: {
                longitude: value.logitude,
                latitude: value.latitude,
                location: [data.city, data.province, data.country],
                adcode: parseInt(data.adcode)
              },
              weather: weatherRes.lives[0]
            }
          )
        }
        return { location: state.location, weather: state.weather }
      } catch (err) {
        console.log('catch err:', err)
      }
    },
    getNoteList: async ({ commit, state }) => {
      try {
        let listRes = await rq('list', state.key)
        console.log(listRes)
        if (listRes.code === 0) {
          let data = listRes.data.user.concat(listRes.data.partner)
          data = lodash.orderBy(data, (val) => {
            return val.date ? val.date : val.created_at
          }, 'desc')
          commit('setNotes', data)
        }
      } catch (err) {
        console.log('catch err:', err)
      }
    }
  }
})
