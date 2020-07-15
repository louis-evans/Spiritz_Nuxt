import { signIn, signOut, ERR_INVALID_CREDENTIALS } from '~/helper/authHelper'

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
          if (err.message === ERR_INVALID_CREDENTIALS)
          {
            reject(new Error('Either username or password is incorrect'))
          }
          else
          {
            reject(err)
          }
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
