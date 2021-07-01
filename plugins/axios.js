export default function ({ $axios }, { state }) {
  $axios.setHeader('Authorization', `Bearer ${state.jwt}`, [
    'post'
  ])
  $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
    'post'
  ])
}
