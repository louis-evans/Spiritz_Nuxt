import axios from 'axios'

const apiUrl = process.env.VUE_APP_API_URL

export const state = () => ({
  loggedIn: false
})

export const getters = {
  allCountries: (state) => {
    return state.countries
  }
}

export const mutations = {
  ADD_COUNTRY (state, newCountry) {
    state.countries.push(newCountry)
  },
  REMOVE_COUNTRY (state, id) {
    state.countries = state.countries.filter(c => c.CountryId !== id)
  },
  SAVE_COUNTRIES (state, countries) {
    state.countries = countries
  }
}

export const actions = {
  addCountry ({ commit }, data) {
    return axios.post(`${apiUrl}/country/add`, data)
      .then(response => commit('ADD_COUNTRY', response.data))
  },
  loadCountries ({ commit }) {
    return axios.get(`${apiUrl}/country/all`)
      .then(response => commit('SAVE_COUNTRIES', response.data))
  },
  deleteCountry ({ commit }, id) {
    return axios.delete(`${apiUrl}/country?id=${id}`)
      .then(response => commit('REMOVE_COUNTRY', id))
  }
}
