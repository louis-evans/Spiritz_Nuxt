import { signIn, signOut } from '~/helper/authHelper'

export const state = () => ({
  isLoggedIn: false
})

export const mutations = {
  setLoggedIn (state, isLoggedIn)
  {
    state.isLoggedIn = isLoggedIn
  }
}

export const actions = {
  signIn ({ commit }, { username, password })
  {
    return new Promise((resolve, reject) =>
    {
      signIn(username, password)
        .then(() =>
        {
          commit('setLoggedIn', true)
          resolve()
        })
        .catch((err) =>
        {
          reject(err)
        })
    })
  },
  signOut ({ commit })
  {
    return new Promise((resolve) =>
    {
      signOut()
        .then(() =>
        {
          commit('setLoggedIn', false)
          resolve()
        })
    })
  }
}
