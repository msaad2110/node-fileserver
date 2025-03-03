const express = require('express')
const file = require('./routes/files')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT
const app = express()

app.use(express.json())

app.use('/api', file)

app.listen(PORT, ()=>{
    console.log(`Port running successfully on ${PORT}`);
})