// //
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const routes = require('./routes/authRoutes')


dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))

connectDB()

app.use('/api/auth', routes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))