export default function ({ route, store, next }) {
  const pageExceptions = ['/', '/account/login']
  console.log('auth.middleware', route)
  if (!pageExceptions.includes(route.path) && store.state.auth.isLoggedIn === false) {
    next(`/account/login?redirect=${encodeURIComponent(route.path)}`)
  }
}
