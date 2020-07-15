import { isLoggedIn } from '../helper/authHelper'

export default function ({ route, store, next })
{
  const pageExceptions = ['/', '/account/login']

  if (isLoggedIn())
  {
    // TODO Need to renew the token to extend the session
  }
  else if (!pageExceptions.includes(route.path))
  {
    store.commit('auth/setLoggedIn', false)
    next(`/account/login?redirect=${encodeURIComponent(route.path)}`)
  }
}
