const express = require('express')

// Log modules imports
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')

// Core modules
const path = require('path')

// cors
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

/**
 * Configuration
 */
const app = express()

app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
app.use('/', express.static(path.join(__dirname, '/public')))


// Serve the server's splash page
app.use('/', require('./routes/root'))

app.use('/process', require('./routes/computeRoute'))

// Serve the 404
app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

module.exports = app