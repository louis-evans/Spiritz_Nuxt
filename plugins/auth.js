import { isLoggedIn } from '../helper/authHelper'

export default ({ store }, inject) =>
{
  store.commit('auth/setLoggedIn', isLoggedIn())
}
