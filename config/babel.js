module.exports = {
  presets: [['env', {
    modules: false,
    targets: {node: 'current'}
  }]],
  plugins: ['transform-object-rest-spread']
}