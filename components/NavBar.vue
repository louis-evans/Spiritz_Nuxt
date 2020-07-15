<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand href="#">
      Spiritz
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" to="/">
          Home
        </b-nav-item>
        <b-nav-item-dropdown v-if="isLoggedIn" text="Admin">
          <b-dropdown-item to="/admin/country">
            Countries
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!isLoggedIn" to="/account/login">
          Sign In
        </b-nav-item>
        <b-nav-item v-if="isLoggedIn" href="#">
          Hello!
        </b-nav-item>
        <b-nav-item v-if="isLoggedIn" href="#" @click="onSignOut">
          Sign Out
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['isLoggedIn'])
  },
  watch: {
    isLoggedIn (val)
    {
    }
  },
  methods: {
    ...mapActions('auth', ['signOut']),
    onSignOut ()
    {
      this.signOut()
        .then((result) =>
        {
          this.$router.push('/')
        }).catch((err) =>
        {
          console.error(err)
        })
    }
  }
}
</script>
