const express = require('express')
const aiRoutes = require("../src/routes/ai.routes")
const cors = require('cors')

const app = express() //creating an instance of a server

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/ai', aiRoutes)

module.exports = app //exporting the app