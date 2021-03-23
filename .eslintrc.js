module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    '@nuxtjs',
    'eslint:recommended',
    'plugin:vue/essential',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {},
}
