export default function ({ route, redirect }) {
  const email = route.params.email
  if (!email) {
    return redirect({ name: 'index' })
  }
}
