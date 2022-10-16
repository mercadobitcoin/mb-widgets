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

const emptyMockResponse = {
  server_unix_timestamp: 1665747772,
  response_data: {
    data: [],
    total_items: 0
  }
}

app.get('/cryptos', (req, res) => {
  const { query } = req.query
  if (query) {
    if (query === 'empty') {
      res.json(emptyMockResponse)
    } else {
      res.json({
        ...emptyMockResponse,
        response_data: {
          data: [
            {
              product_id: 'ANKR',
              symbol: 'ANKR',
              name: 'ANKR',
              type: 'crypto',
              sub_type: 'utility_token',
              variation: {
                string: '+0%',
                number: 0.0,
                status: 'positive'
              },
              market_cap: '0.00',
              market_price: '0.00',
              badges: ['novo', 'exclusivos mb'],
              icon_url: 'https://static.mercadobitcoin.com.br/web/img/icons/assets/ico-asset-ankr-color.svg',
              created_at: '2022-08-24T13:32:52-03:00',
              release_date: '2022-08-24T13:32:52-03:00'
            }
          ]
        }
      })
    }
  } else {
    res.json({
      ...emptyMockResponse,
      response_data: {
        data: [
          {
            product_id: 'ANKR',
            symbol: 'ANKR',
            name: 'ANKR',
            type: 'crypto',
            sub_type: 'utility_token',
            variation: {
              string: '+0%',
              number: 0.0,
              status: 'positive'
            },
            market_cap: '0.00',
            market_price: '0.00',
            badges: ['novo', 'exclusivos mb'],
            icon_url: 'https://static.mercadobitcoin.com.br/web/img/icons/assets/ico-asset-ankr-color.svg',
            created_at: '2022-08-24T13:32:52-03:00',
            release_date: '2022-08-24T13:32:52-03:00'
          },
          {
            product_id: 'AXS',
            symbol: 'AXS',
            name: 'Axie Infinity Shard',
            type: 'crypto',
            sub_type: 'utility_token',
            variation: {
              string: '+0%',
              number: 0.0,
              status: 'positive'
            },
            market_cap: '0.00',
            market_price: '0.00',
            badges: ['novo', 'exclusivos mb'],
            icon_url: 'https://static.mercadobitcoin.com.br/web/img/icons/assets/ico-asset-axs-color.svg',
            created_at: '2022-08-24T13:32:54-03:00',
            release_date: '2022-08-24T13:32:54-03:00'
          },
          {
            product_id: 'BAND',
            symbol: 'BAND',
            name: 'Band Protocol',
            type: 'crypto',
            sub_type: 'utility_token',
            variation: {
              string: '+0%',
              number: 0.0,
              status: 'positive'
            },
            market_cap: '0.00',
            market_price: '0.00',
            badges: ['novo', 'exclusivos mb'],
            icon_url: 'https://static.mercadobitcoin.com.br/web/img/icons/assets/ico-asset-band-color.svg',
            created_at: '2022-08-24T13:32:55-03:00',
            release_date: '2022-08-24T13:32:55-03:00'
          },
          {
            product_id: 'BAT',
            symbol: 'BAT',
            name: 'Basic Attention token',
            type: 'crypto',
            sub_type: 'utility_token',
            variation: {
              string: '+0%',
              number: 0.0,
              status: 'positive'
            },
            current_price: '0.00',
            market_cap: '0.00',
            market_price: '0.00',
            badges: ['novo', 'exclusivos mb'],
            icon_url: 'https://static.mercadobitcoin.com.br/web/img/icons/assets/ico-asset-bat-color.svg',
            created_at: '2022-08-24T13:32:55-03:00',
            release_date: '2022-08-24T13:32:55-03:00'
          },
          {
            product_id: 'BTC',
            symbol: 'BTC',
            name: 'Bitcoin',
            type: 'crypto',
            sub_type: 'coin',
            variation: {
              string: '+0%',
              number: 0.0,
              status: 'positive'
            },
            market_cap: '0.00',
            market_price: '0.00',
            badges: ['novo', 'pré-listagem'],
            icon_url: 'https://static.mercadobitcoin.com.br/web/img/icons/assets/ico-asset-btc-color.svg',
            created_at: '2022-08-24T13:32:57-03:00',
            release_date: '2022-08-24T13:32:57-03:00'
          }
        ],
        total_items: 50
      }
    })
  }
})
app.get('/fixed-incomes', (req, res) => {
  const { query } = req.query
  if (query) {
    if (query === 'empty') {
      res.json(emptyMockResponse)
    } else {
      res.json({
        ...emptyMockResponse,
        response_data: {
          data: [
            {
              asset_id: '704812c83d9b4b13b76bd38bd87ad33r',
              product_id: '3',
              legacy_id: 'AAVE',
              name: 'Aave',
              symbol: 'AAVE',
              minimum_value: 'R$ 1,00',
              profitability: 'IGPM + TR + 7% a.a.',
              estimated_liquidation_date: 'Jan/2024',
              sold_percentage: '0%',
              available_percentage: '100%',
              status: 'PRIMARY_MARKET',
              family_name: 'Consórcios'
            }
          ]
        }
      })
    }
  } else {
    res.json({
      server_unix_timestamp: 1665747772,
      response_data: {
        data: [
          {
            asset_id: '704812c83d9b4b13b76bd38bd87ad33r',
            product_id: '3',
            legacy_id: 'AAVE',
            name: 'Aave',
            symbol: 'AAVE',
            minimum_value: 'R$ 1,00',
            profitability: 'IGPM + TR + 7% a.a.',
            estimated_liquidation_date: 'Jan/2024',
            sold_percentage: '0%',
            available_percentage: '100%',
            status: 'PRIMARY_MARKET',
            family_name: 'Consórcios'
          },
          {
            asset_id: '634812c83d9b4b13b76bd38bd87ad20e',
            product_id: '2',
            legacy_id: 'SUSHI',
            name: 'SushiSwap',
            symbol: 'SUSHI',
            minimum_value: 'R$ 50,00',
            profitability: 'IGPM + TR + 5% a.a.',
            estimated_liquidation_date: 'Jan/2024',
            sold_percentage: '1000000%',
            available_percentage: '-999900%',
            status: 'SECONDARY_MARKET',
            family_name: 'Consórcios'
          },
          {
            asset_id: 'd200df4a856b44348cc94f67488f958b',
            product_id: '1',
            legacy_id: 'DAXPTO',
            name: 'XRP',
            symbol: 'AAA',
            minimum_value: 'R$ 150,00',
            profitability: 'IPCA + 15% a.a.',
            estimated_liquidation_date: 'Mai/2023',
            sold_percentage: '5.59%',
            available_percentage: '94.41%',
            status: 'PRIMARY_MARKET',
            family_name: 'Precatórios'
          }
        ],
        total_items: 20
      }
    })
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
