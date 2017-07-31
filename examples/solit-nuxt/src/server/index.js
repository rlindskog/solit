import express from 'express'
const app = express()
app.get('/', (req, res) => res.json({ so: 'lit' }))
export default app