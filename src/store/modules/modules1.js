const modules1 = {
  state: {
    test: ''
  },
  actions: {
    setText ({ commit }) {
      commit('addTest', 'worlds')
    }
  },
  mutations: {
    addTest (state, tst) {
      state.test += tst
    }
  },
  getters: {
    getText (state) {
      return state.text + '!'
    }
  }
}
export default modules1
