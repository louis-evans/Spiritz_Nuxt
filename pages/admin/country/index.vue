<template>
  <div>
    <h2>Countries</h2>

    <hr>

    <b-row>
      <b-col>
        <b-button variant="primary" @click="onCountryEntry">
          Add +
        </b-button>
      </b-col>
    </b-row>

    <hr>

    <b-row>
      <b-col>
        <b-table striped hover fixed :items="countries" :fields="fields">
          <template v-slot:cell(id)="data">
            {{ data.item.Id }}
          </template>
          <template v-slot:cell(name)="data">
            {{ data.item.Name }}
          </template>
          <template v-slot:cell(action)="data">
            <div class="d-flex" style="flex-direction: row-reverse;">
              <b-dropdown text="Action" variant="primary" right>
                <b-dropdown-item @click="onCountryEntry(data.item.Id)">
                  Edit
                </b-dropdown-item>
                <b-dropdown-item @click="onDelete(data.item.Id)">
                  Delete
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </template>
        </b-table>
      </b-col>
    </b-row>

    <ConfirmationModal
      message="Are you sure you want to delete this country?"
      ok-text="Yes"
      cancel-text="No"
      @result="onDeleteConfirm"
    />
    <PromptModal
      id="add-country"
      message="Enter the country name"
      :default="countryEntryText"
      @result="onCountryEntryResult"
    />
    <AlertModal
      :message="alertMessage"
    />
  </div>
</template>

<script>

import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import AlertModal from '../../../components/modal/AlertModal'
import ConfirmationModal from '../../../components/modal/ConfirmationModal'
import PromptModal from '../../../components/modal/PromptModal'

export default {
  components: {
    AlertModal,
    ConfirmationModal,
    PromptModal
  },
  data ()
  {
    return {
      alertMessage: '',
      countryEntryId: 0,
      countryEntryText: null,
      toDeleteId: 0,
      fields: [
        'Id',
        'Name',
        { key: 'action', label: '' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      countries: 'countries/allCountries'
    })
  },
  mounted ()
  {
    this.loadCountries()
  },
  methods: {
    ...mapActions({
      deleteCountry: 'countries/deleteCountry',
      loadCountries: 'countries/loadCountries'
    }),
    onCountryEntry (id)
    {
      this.countryEntryId = id
      this.countryEntryText = this.countries.filter(c => c.Id === id)[0].Name

      Vue.nextTick(() =>
      {
        this.$bvModal.show('add-country')
      })
    },
    onCountryEntryResult (result)
    {
      if (result !== null && result.trim() === '')
      {
        this.alertMessage = 'Value cannot be empty!'
        Vue.nextTick(() =>
        {
          this.$bvModal.show('alert')
        })
      }
    },
    onDelete (id)
    {
      this.toDeleteId = id
      this.$bvModal.show('confirm')
    },
    onDeleteConfirm (isDelete)
    {
      if (isDelete)
      {
        this.deleteCountry(this.toDeleteId)
          .then(() =>
          {
            this.toDeleteId = 0
          })
      }
    }
  }
}
</script>
