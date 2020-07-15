<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group label="Email address:">
        <b-form-input
          id="email"
          v-model="form.username"
          type="email"
          required
          autocomplete="off"
        />
      </b-form-group>

      <b-form-group label="Password:">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          required
          autocomplete="off"
        />
      </b-form-group>

      <b-button type="submit" variant="primary">
        Submit
      </b-button>
      <b-button type="reset" variant="danger">
        Reset
      </b-button>
    </b-form>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        username: 'louis@evans.test',
        password: 'somepassword'
      }
    }
  },
  methods: {
    ...mapActions('auth', ['signIn']),
    onSubmit (e) {
      e.preventDefault()

      this.signIn({ username: this.form.username, password: this.form.password })
        .then((result) => {
          this.$router.push('/')
        }).catch((err) => {
          console.error(err)
        })
    },
    onReset (e) {
      e.preventDefault()
      this.form.username = ''
      this.form.password = ''
    }
  }
}
</script>
