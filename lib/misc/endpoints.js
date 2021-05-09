export const article = (id = '') => {
  return `/article/${id}`
}

export const goods = (id = '') => {
  return `/goods/${id}`
}

export const category = () => {
  return 'goods/category'
}

export const profile = (id = '') => {
  return `profile/${id}`
}
