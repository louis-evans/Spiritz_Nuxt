import { decode, verify } from 'jsonwebtoken'

const tokenSecret = process.env.tokenSecret
const tokenName = process.env.tokenName

const getToken = () => localStorage.getItem(tokenName)

const getTokenPayload = () => decode(getToken())

export function getUserName ()
{
  return getTokenPayload().name
}

export function removeToken ()
{
  localStorage.removeItem(tokenName)
}

export function setToken (token)
{
  localStorage.setItem(tokenName, token)
}

export function verifyToken ()
{
  verify(getToken(), tokenSecret)
}
