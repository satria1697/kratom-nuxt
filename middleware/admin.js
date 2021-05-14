import jwtDecode from 'jwt-decode'

export default function ({ redirect, app }) {
  const jwt = app.$cookies.get('jwt_token')
  const decode = jwtDecode(jwt)
  if (!jwt) {
    return redirect({ name: 'login' })
  } else if (jwt) {
    if (decode.level >= 3) {
      return redirect({ name: 'index' })
    }
  }
}
