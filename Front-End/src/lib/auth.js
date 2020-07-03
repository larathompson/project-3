
export function login(token) {
  localStorage.setItem('token', token)
}

export function logout() {
  localStorage.removeItem('token')
}

export function isLoggedIn() {
  const token = localStorage.getItem('token')
  return !!token
}
