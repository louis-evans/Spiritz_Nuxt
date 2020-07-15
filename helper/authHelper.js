import { sign, verify } from 'jsonwebtoken'

const tokenSecret = process.env.tokenSecret
const tokenName = process.env.tokenName
const tokenExpires = process.env.tokenExpireSeconds
const tokenAlg = process.env.tokenAlg

export function signIn (username, password)
{
  return new Promise((resolve, reject) =>
  {
    if (username === 'louis@evans.test' && password === 'somepassword')
    {
      const token = sign({ username }, tokenSecret, {
        algorithm: tokenAlg,
        expiresIn: tokenExpires
      })

      localStorage.setItem(tokenName, token)

      resolve()
    }
    else
    {
      reject(new Error('Invalid credentials'))
    }
  })
}

export function signOut ()
{
  return new Promise((resolve) =>
  {
    localStorage.removeItem(tokenName)
    resolve()
  })
}

export function isLoggedIn ()
{
  try
  {
    verify(localStorage.getItem(tokenName), tokenSecret)
    return true
  }
  catch (e)
  {
    localStorage.removeItem(tokenName)

    // Either:
    // - No token
    // - Invalid token
    // - Expired token
    return false
  }
}
