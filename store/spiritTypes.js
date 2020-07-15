/* eslint-disable no-unused-vars */

import axios from 'axios'

const apiUrl = process.env.VUE_APP_API_URL

export const state = () => ({
  currentRecord: null,
  spiritTypes: null
})

export const getters = {
  allTypes: state => state.spiritTypes,
  currentRecord: state => state.currentRecord
}

export const mutations = {
  LOAD_RECORD (state, record)
  {
    state.currentRecord = record
  },
  SAVE_SPIRIT_TYPES (state, types)
  {
    state.spiritTypes = types
  }
}

export const actions = {
  deleteRecord ({ commit }, id)
  {
    return axios.delete(`${apiUrl}/spirittype?id=${id}`)
  },
  loadSpiritType ({ commit }, id)
  {
    if (id)
    {
      return axios.get(`${apiUrl}/spirittype?id=${id}`)
        .then(response => commit('LOAD_RECORD', response.data))
    }

    return new Promise((resolve) =>
    {
      // load an empty record
      commit('LOAD_RECORD', { TypeID: null, TypeName: '', Variants: [] })
      resolve()
    })
  },
  loadSpiritTypes ({ commit })
  {
    return axios.get(`${apiUrl}/spirittype/all`)
      .then(response => commit('SAVE_SPIRIT_TYPES', response.data))
  },
  saveRecord ({ commit, state })
  {
    state.currentRecord.Variants = state.currentRecord.Variants.map((v) =>
    {
      if (isNaN(Number(v.VariantId)))
      {
        // remove the temp id so the API knows they are new
        v.VariantId = null
      }

      return v
    })

    return axios.post(`${apiUrl}/spirittype`, state.currentRecord)
  }
}
