import express from 'express'
import app from 'srcdir'

if (module.hot) {
  module.hot.accept('srcdir', () => {
    console.log('🔁  HMR Reloading...')
  })
  console.info('✅  Server-side HMR Enabled!')
}

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(process.env.PORT, process.env.HOST, err => {
    if (err) {
      console.error(err)
      return
    }
    console.log(`💁  Listening at http://${process.env.HOST}:${process.env.PORT}`)
  })


// import http from 'http'
// import app from 'srcdir' // normal plugin

// const server = http.createServer(app)
// let currentApp = app
// server.listen(process.env.PORT, process.env.HOST)

// console.log(`Listening at http://${process.env.HOST}:${process.env.PORT}`) // get other options somehow....
// if (module.hot) {
//   module.hot.accept('srcdir', () => {
//     server.removeListener('request', currentApp)
//     server.on('request', app)
//     currentApp = app
//   })
// }