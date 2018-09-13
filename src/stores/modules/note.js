import { rq } from '../../api/index.js'

export default {
  state: {
    detail: {},
    saved: {}
  },
  getters: {
    detailNote: state => state.detail,
    savedNote: state => state.saved
  },
  mutations: {
    getDetailNote: (state, note) => {
      state.detail = note
    },
    saveNote: (state, note) => {
      state.saved = note
      state.detail = note
    },
    likeNote: (state) => {
      state.detail.is_liked = 1
    },
    clearNote: (state, note) => {
      state.saved = {}
    }
  },
  actions: {
    save: async ({ state, commit, rootState }, note) => {
      commit('saveNote', note)
      if (note.images) {
        note.images = note.images.join(',')
      }
      try {
        let res = await rq(
          note.id ? 'update' : 'publish',
          Object.assign({}, rootState.key, note, { note_id: note.id }),
          'POST'
        )
        return res
      } catch (err) {
        console.log('catch err:', err)
      }
    },
    like: async ({ state, commit, rootState }) => {
      commit('likeNote')
      try {
        let res = await rq('like', Object.assign({}, rootState.key, { note_id: state.detail.id }), 'POST')
        return res
      } catch (err) {
        console.log('catch err:', err)
      }
    }
  }
}
