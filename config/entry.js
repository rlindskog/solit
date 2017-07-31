import express from 'express'
import app from 'srcdir'

if (module.hot) module.hot.accept('srcdir')

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(process.env.PORT, process.env.HOST, err => {
    if (err) {
      console.error(err)
      return
    }
    console.log(`🔥  Listening at http://${process.env.HOST}:${process.env.PORT}`)
  })
