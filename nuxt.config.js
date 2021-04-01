export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'kato-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
    ['vue-toastification/nuxt', {

      draggable: false
    }]
  ],

  proxy: {
    '/backend': {
      target: 'http://127.0.0.1:8000',
      pathRewrite: { '^/backend': '/' }
    }
  },

  auth: {
    redirect: {
      login: '/'
    },
    strategies: {
      laravelPassport: {
        provider: 'laravel/passport',
        url: 'http://127.0.0.1:8000',
        clientId: 'tUyvuyNRhWU7flffv0RTFl9aWz2iE5KTYHL94SXH',
        clientSecret: 'MX33GCOLQfIqfYlJuPEZ8umcIEWh86zidNnRibSN',
        redirectUri: 'http://localhost:3000'
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://127.0.0.1:8000/api',
    post: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  // server: {
  //   host: '192.168.100.140'
  // }
  env: {
    JWT_SECRET: 'bvMp8EzdcXZjUn0f5K3vOCblCL6xoRk4'
  }
}
