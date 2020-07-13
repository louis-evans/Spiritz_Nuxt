export const state = () => ({
  loggedIn: false
})

export const mutations = {
  setLoggedIn (state, isLoggedIn) {
    state.loggedIn = isLoggedIn
  }
}

export const actions = {
  signIn ({ commit }, data) {
    console.log('signIn', data)

    return new Promise((resolve) => {
      commit('setLoggedIn', true)
      resolve()
    })
  },
  signOut ({ commit }) {
    console.log('signOut')

    return new Promise((resolve) => {
      commit('setLoggedIn', false)
      resolve()
    })
  }
}
