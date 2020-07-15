export default function ({ route, store, next }) {
  const pageExceptions = ['/', '/account/login']

  if (!pageExceptions.includes(route.path) && store.state.auth.isLoggedIn === false) {
    next('/account/login')
  }
}
