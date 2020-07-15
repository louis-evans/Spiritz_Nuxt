<template>
  <div>
    <b-row>
      <b-col>
        <b-alert variant="danger" :show="showError" fade>
          {{ signInError }}
        </b-alert>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group label="Email address:" :disabled="isSigningIn">
            <b-form-input
              id="email"
              v-model="form.username"
              type="email"
              required
              autocomplete="off"
            />
          </b-form-group>

          <b-form-group label="Password:" :disabled="isSigningIn">
            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              required
              autocomplete="off"
            />
          </b-form-group>

          <b-button type="submit" variant="primary" :disabled="isSigningIn">
            Submit
          </b-button>
          <b-button type="reset" variant="danger" :disabled="isSigningIn">
            Reset
          </b-button>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  data ()
  {
    return {
      signInError: null,
      isSigningIn: false,
      form: {
        username: 'louis@evans.test',
        password: 'somepassword'
      }
    }
  },
  computed: {
    showError ()
    {
      return this.isSigningIn === false && this.signInError !== null
    }
  },
  methods: {
    ...mapActions('auth', ['signIn']),
    onSubmit (e)
    {
      e.preventDefault()

      this.isSigningIn = true
      this.signInError = null

      this.signIn({ username: this.form.username, password: this.form.password })
        .then((result) =>
        {
          this.isSigningIn = false
          this.$router.push(this.$route.query.redirect || '/')
        })
        .catch((err) =>
        {
          this.isSigningIn = false
          this.signInError = err.message
          console.error(err)
        })
    },
    onReset (e)
    {
      e.preventDefault()
      this.form.username = ''
      this.form.password = ''
    }
  }
}
</script>
