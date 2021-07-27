export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'GlobalIndo Intl',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'GlobalIndo Intl' },
      { hid: 'og:url', name: 'og:url', content: 'https://globalindo-intl.com' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:title', name: 'og:title', content: 'Globalindo Intl' },
      { hid: 'og:description', name: 'og:description', content: 'Globalindo Intl' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/vue-carousel.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics',
    '@nuxtjs/device'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    ['vue-toastification/nuxt', {

      draggable: false
    }],
    [
      'nuxt-i18n'
    ],
    '@nuxtjs/gtm',
    '@nuxtjs/sitemap'
  ],

  i18n: {
    locales: [{ code: 'en', iso: 'en-US', file: 'en.json', name: 'English' }, { code: 'id', iso: 'id-ID', file: 'id.json', name: 'Indonesia' }],
    defaultLocale: 'en',
    langDir: '~/locale/',
    vueI18n: {
      fallbackLocale: 'en'
    }
  },

  gtm: {
    id: 'GTM-WRLJDSG'
  },

  googleAnalytics: {
    id: 'G-Y3Y4BZ1NB8'
  },

  sitemap: {
    hostname: 'https://globalindo-intl.com',
    exclude: [
      '/admin/**'
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: 'https://api.globalindo-intl.com/api',
    // baseUrl: 'http://192.168.100.85:8000/api',
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
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    }
  },
  env: {
    JWT_SECRET: 'bvMp8EzdcXZjUn0f5K3vOCblCL6xoRk4'
  },
  tailwindcss: {
    jit: true
  },
  device: {
    refreshOnResize: true
  }
}
