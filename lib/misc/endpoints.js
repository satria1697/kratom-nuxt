export const category = (id = '') => {
  return `goods/category/${id}`
}

export const cart = (params = '') => {
  return `/goods/cart/${params}`
}

export const article = (id = '') => {
  return `/article/${id}`
}

export const goods = (id = '') => {
  return `/goods/${id}`
}

export const profile = (id = '') => {
  return `/profile/${id}`
}

export const register = () => {
  return '/register'
}

export const verification = () => {
  return '/verification'
}

export const login = () => {
  return '/login'
}

export const logout = () => {
  return '/logout'
}

export const verificationStatus = () => {
  return '/id.verification/status'
}

export const updateVerification = (id) => {
  return `/id.verification/updateStatus/${id}`
}

export const level = () => {
  return 'level'
}

export const cartV = (params = '') => {
  return `cart/${params}`
}
