export default function ({ store, redirect }) {
  const userInfo = store.state.userInfo
  const token = store.state.token
  if (!token) {
    return redirect({ name: 'login' })
  } else if (token) {
    if (userInfo.level >= 3) {
      return redirect({ name: 'index' })
    }
  }
}
