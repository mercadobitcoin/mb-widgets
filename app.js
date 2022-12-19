const compression = require('compression')
const express = require('express')
const helmet = require('helmet')
const app = express()

// View engine setup
app.use(compression())
app.use(express.static('public'))
// Sets "X-DNS-Prefetch-Control: off"
app.use(helmet.dnsPrefetchControl())
// Sets "X-Download-Options: noopen"
app.use(helmet.ieNoOpen())
// Sets "X-Content-Type-Options: nosniff"
app.use(helmet.noSniff())
app.use(helmet.frameguard({ action: 'sameorigin' }))

let { PORT, IP, ENVIRONMENT_NAME } = process.env

PORT = PORT || 3000
IP = IP || 'localhost'
ENVIRONMENT_NAME = ENVIRONMENT_NAME || 'development'

app.listen(PORT || 3000, IP || 'localhost', () => {
  const logMessage = { date: new Date().toLocaleString(), type: 'APP_START', env: ENVIRONMENT_NAME, what: `Server running http://${IP}:${PORT}` }
  console.log(JSON.stringify(logMessage))
})

module.exports = app
