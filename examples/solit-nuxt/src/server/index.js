import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.json({ so: 'asd' })
})

export default app