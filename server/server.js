const express = require('express')

const app = require('./app')

// .env handling
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 6001

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


