const compression = require('compression')
const express = require('express')
const helmet = require('helmet')
const fetch = require('node-fetch')
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

function mxCreateUrlQueryString (options) {
  if (!options || !Object.keys(options).length) {
    return ''
  }

  return '?'.concat(
    Object.keys(options)
      .map(
        (key) => {
          if (options[key]) {
            return `${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`
          }

          return ''
        }
      )
      .filter(options => !!options)
      .join('&')
  )
}

app.get('/cryptos', async (req, res) => {
  try {
    const response = await fetch('https://mb-product-coins-tp-together.dev.mercadolitecoin.com.br/assets/' + mxCreateUrlQueryString(req.query))
    if (response.ok) {
      const responseParsed = await response.json()
      return res.json(responseParsed)
    }
  } catch (e) {
    res.json({ response_data: { data: [], total_items: 0 } })
  }
})
app.get('/fixed-incomes', async (req, res) => {
  try {
    const response = await fetch('https://mb-product-gutter-tp-together.dev.mercadolitecoin.com.br/assets/' + mxCreateUrlQueryString(req.query))
    if (response.ok) {
      const responseParsed = await response.json()
      return res.json(responseParsed)
    }
  } catch (e) {
    res.json({ response_data: { data: [], total_items: 0 } })
  }
})

let { PORT, IP, ENVIRONMENT_NAME } = process.env

PORT = PORT || 3000
IP = IP || 'localhost'
ENVIRONMENT_NAME = ENVIRONMENT_NAME || 'development'

app.listen(PORT || 3000, IP || 'localhost', () => {
  const logMessage = { date: new Date().toLocaleString(), type: 'APP_START', env: ENVIRONMENT_NAME, what: `Server running http://${IP}:${PORT}` }
  console.log(JSON.stringify(logMessage))
})

module.exports = app
