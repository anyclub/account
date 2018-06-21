module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true
  },
  globals: {
    __static: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  plugins: ["html", "vue"],
  rules: {
    // allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
