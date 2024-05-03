const isBrowser = typeof window !== "undefined"

export function getToken() {
  if (isBrowser) {
    return localStorage.getItem("token")
  }
  
return null
}

export function setToken(token) {
  if (isBrowser) {
    localStorage.setItem("token", token)
  }
}

export function removeToken() {
  if (isBrowser) {
    localStorage.removeItem("token")
  }
}

export function isAuthenticated() {
  const token = getToken()

  
return Boolean(token)
}
