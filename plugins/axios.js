export default function ({ $axios, store }) {
  $axios.setHeader('Authorization', `Bearer ${store.state.jwt}`)
  $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
    'post'
  ])
}
