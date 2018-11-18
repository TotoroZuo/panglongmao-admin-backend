module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'eqeqeq': 'off',
    'no-multi-spaces': 'off',
    'no-return-await':'off',
    'handle-callback-err':'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
