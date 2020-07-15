import { sign } from 'jsonwebtoken'
import { setToken, removeToken, verifyToken } from '~/helper/tokenHelper'

const tokenSecret = process.env.tokenSecret
const tokenExpires = process.env.tokenExpireSeconds
const tokenAlg = process.env.tokenAlg

export const ERR_INVALID_CREDENTIALS = 'INVALID_CREDENTIALS'

export function signIn (username, password)
{
  return new Promise((resolve, reject) =>
  {
    // Make an API call here. Just simulate one for now
    setTimeout(() =>
    {
      if (username === 'louis@evans.test' && password === 'somepassword')
      {
        const payload = {
          name: 'Louis Evans',
          username
        }

        const token = sign(payload, tokenSecret, {
          algorithm: tokenAlg,
          expiresIn: tokenExpires
        })

        setToken(token)

        resolve()
      }
      else
      {
        reject(new Error(ERR_INVALID_CREDENTIALS))
      }
    }, Math.ceil(Math.random() * 2000))
  })
}

export function signOut ()
{
  return new Promise((resolve) =>
  {
    removeToken()
    resolve()
  })
}

export function isLoggedIn ()
{
  try
  {
    verifyToken()
    return true
  }
  catch (e)
  {
    removeToken()

    // Either:
    // - No token
    // - Invalid token
    // - Expired token
    return false
  }
}
