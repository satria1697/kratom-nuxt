const fs = require('fs')
const path = require('path')

const ENV_DEV = false

// Development Environment
let port = 3000
let host = 'localhost'
let https = false

// Production Environment
if (ENV_DEV === false) {
  port = 8000 // make sure this port is open on your server you can do that via WHM or talk to you hosting company
  host = 'globalindo-intl.com'
  https = {
    key: fs.readFileSync(path.resolve(__dirname,
      './../ssl/keys/b2bdb_441fb_effbc1fd560bd5f6e7f4185a62d7cb1f.key')),
    cert: fs.readFileSync(path.resolve(__dirname,
      './../ssl/certs/dev_globalindo_intl_com_b2bdb_441fb_1655574006_231d89da600a077764581fedd8cc58dc.crt'))
  }
}

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'kato-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
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
    'cookie-universal-nuxt',
    ['vue-toastification/nuxt', {

      draggable: false
    }]
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://api.globalindo-intl.com/api',
    post: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    credentials: true
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
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    }
  },
  server: {
    port,
    host,
    timing: false,
    https
  },
  env: {
    JWT_SECRET: 'bvMp8EzdcXZjUn0f5K3vOCblCL6xoRk4'
  },
  tailwindcss: {
    jit: true
  }
}
