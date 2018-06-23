const state = {
  data: ''
}

const mutations = {
  getDate (state) {
    state.data = new Date()
  }
}

const actions = {
  getDate ({ commit }) {
    commit('getDae')
  }
}

export default {
  state,
  mutations,
  actions
}
