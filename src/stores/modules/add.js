import { rq } from '../../api/index.js'

export default {
  state: {
    saved: {}
  },
  getters: {
    savedNote: state => state.saved
  },
  mutations: {
    saveNote: (state, note) => {
      state.saved = note
    },
    clearNote: (state, note) => {
      state.saved = {}
    }
  },
  actions: {
    save: async ({ state, commit, rootState }, note) => {
      commit('saveNote', note)
      try {
        let res = await rq(
          note.note_id ? 'update' : 'publish',
          Object.assign({}, rootState.key, note),
          'POST'
        )
        return res
      } catch (err) {
        console.log('catch err:', err)
      }
    }
  }
}
