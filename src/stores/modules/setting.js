import { rq } from '../../api/index.js'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    feedback: async ({ commit, state, rootState }, data) => {
      try {
        const res = await rq('feedback', Object.assign({}, rootState.key, data), 'POST')
        return res
      } catch (err) {
        console.log('catch err:', err)
      }
    }
  }
}
