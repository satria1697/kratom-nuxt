export default function ({ route, redirect }) {
  const email = route.query.email
  if (!email) {
    return redirect({ name: 'index' })
  }
}
