export default function ({ store, redirect }) {
  const userInfo = store.state.userInfo
  const jwt = store.state.jwt
  if (!jwt) {
    return redirect({ name: 'login' })
  } else if (jwt) {
    if (userInfo.level >= 3) {
      return redirect({ name: 'index' })
    }
  }
}
