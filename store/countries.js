// import axios from 'axios'
import Vue from 'vue'

// const apiUrl = process.env.VUE_APP_API_URL

export const state = () => ({
  countries: null
})

export const getters = {
  allCountries: (state) =>
  {
    return state.countries
  }
}

export const mutations = {
  ADD_COUNTRY (state, newCountry)
  {
    state.countries.push(newCountry)
  },
  REMOVE_COUNTRY (state, id)
  {
    state.countries = state.countries.filter(c => c.Id !== id)
  },
  SAVE_COUNTRIES (state, countries)
  {
    state.countries = countries
  },
  UPDATE_COUNTRY (state, country)
  {
    const index = state.countries.findIndex(c => c.Id === country.Id)
    Vue.set(state.countries, index, country)
  }
}

export const actions = {
  addCountry ({ commit, state }, country)
  {
    return new Promise((resolve) =>
    {
      country.Id = state.countries.length + 1
      commit('ADD_COUNTRY', country)
      resolve()
    })

    // return axios.post(`${apiUrl}/country/add`, data)
    //   .then(response => commit('ADD_COUNTRY', response.data))
  },
  loadCountries ({ commit })
  {
    return new Promise((resolve) =>
    {
      commit('SAVE_COUNTRIES', [
        {
          Id: 1,
          Name: 'Scotland'
        },
        {
          Id: 2,
          Name: 'Ireland'
        },
        {
          Id: 3,
          Name: 'USA'
        }
      ])
      resolve()
    })
    // return axios.get(`${apiUrl}/country/all`)
    //   .then(response => commit('SAVE_COUNTRIES', response.data))
  },
  deleteCountry ({ commit }, id)
  {
    return new Promise((resolve) =>
    {
      commit('REMOVE_COUNTRY', id)
      resolve()
    })
    // return axios.delete(`${apiUrl}/country?id=${id}`)
    //   .then(response => commit('REMOVE_COUNTRY', id))
  },
  updateCountry ({ commit }, country)
  {
    return new Promise((resolve) =>
    {
      commit('UPDATE_COUNTRY', country)
      resolve()
    })
  }
}
