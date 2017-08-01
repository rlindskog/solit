import express from 'express'
import app from 'srcdir'

setImmediate(() => {
  if (module.hot) module.hot.accept('srcdir')
  app.listen(process.env.PORT, process.env.HOST, err => {
  if (err) {
    console.error(err)
    return
  }
    console.log(`🔥  Listening at http://${process.env.HOST}:${process.env.PORT}`)
  })
})
