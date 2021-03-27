import Cookies from 'js-cookie'

const key = 'Token'

export function getToken() {
  return Cookies.get(key)
}

export function setToken(token) {
  return Cookies.set(key, token, { expires: 7 })
}

export function removeToken() {
  return Cookies.remove(key)
}
