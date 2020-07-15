const jsonwebtoken = require('jsonwebtoken')
const tokenName = 'user_token'

export const state = () => ({
  isLoggedIn: false
})

export const mutations = {
  setLoggedIn (state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn
  }
}

export const actions = {
  signIn ({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      const token = fakeSignIn(username, password)

      if (token) {
        localStorage.setItem(tokenName, token)
        commit('setLoggedIn', true)
        resolve()
      } else {
        reject(new Error())
      }
    })
  },
  signOut ({ commit }) {
    console.log('signOut')

    return new Promise((resolve) => {
      localStorage.removeItem(tokenName)
      commit('setLoggedIn', false)
      resolve()
    })
  }
}

function fakeSignIn (username, password) {
  const key = 'some_secret_key'

  if (username === 'louis@evans.test' && password === 'somepassword') {
    return jsonwebtoken.sign({ username }, key, {
      algorithm: 'HS256',
      expiresIn: 3000
    })
  }

  return null
}
