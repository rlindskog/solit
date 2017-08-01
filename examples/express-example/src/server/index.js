import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.json({ hello: 'World' })
})

export default app