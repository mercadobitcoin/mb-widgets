const MBWD_FIXED_INCOME_SIMULATOR = () => ({ //eslint-disable-line
  template: `
    <div class="mbwd-fixed-income-simulator">
      <h2 class="main-title">Simulador de Renda Fixa Digital</h2>
      <p class="main-subtitle">Veja quanto o seu dinheiro pode render com ENER02.</p>
      <div class="main-wrapper">
        <div class="interactive-components-wrapper">
          <h3 class="auxiliar-title">Quanto você gostaria de investir?</h3>
          <p class="auxiliar-subtitle">O investimento inicial em Renda Fixa Digital é de R$ 100.</p>
          <div>
            <input></input>
            <div>
              <button>+</button>
              <button>-</button>
            </div>
          </div>
          <h3>Valor que você receberá no vencimento</h3>
          <p>{{estimatedReturnAmount}}</p>
          <a :href=basicExperiencePairTradingUrl>Quero Investir</a>
        </div>
        <div class="comparison-components-wrapper">
          <div>
            <h3>Prazo estimado de pagamento: dezembro/2022</h3>
            <div>
              <p v-if="asset.partialExpiration">Como este ativo possui liquidações parciais, você receberá remunerações fracionadas até o vencimento do investimento.</p>
              <p v-else> Data prevista para o recebimento da rentabilidade total do ativo.</p>
              <p>Para mais detalhes, acesse a <a :href="asset.detailsPdfUrl">lâmina do ativo</a>.</p>
            </div>
          </div>

          <div class="comparison-graph-bar-wrapper">
            <h3>Comparativo com outros investimentos</h3>
            <div class="bars-wrapper">

              <div class="graph-bar-item">
                <div class="bar-container">
                  <i class="bar-filler"> </i>
                </div>
                <p>{{ asset.displayName }}</p>
                <p>{{ estimatedReturnAmount }}</p>
                <p>{{ asset.estimatedYieldLabel }}</p>
              </div>
              
              <div class="graph-bar-item">
                <div class="bar-container">
                  <i class="bar-filler"> </i>
                </div>
                <p>{{ investmentAssetsComparisonItem01.displayName }}</p>
                <p>{{ estimatedReturnAmount }}</p>
                <p>{{ investmentAssetsComparisonItem01.estimatedYieldLabel }}</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  components: {
  },
  data () {
    return {
      estimatedReturnAmount: 105.50,
      interestRate: 0.05,
      asset: {
        displayName: 'ENER02',
        symbol: 'ENER02',
        monthlyYield: 0.034,
        estimatedYieldLabel: "18%", // usado no grafico 
        expirationDate: 1684699915,
        partialExpiration: true,
        investmentMinimumAmount: 100,
        detailsPdfUrl: 'https://www.mercadobitcoin.com.br/wp-content/uploads/2022/08/Lamina_MBFP11_02082022.pdf',
      },
      investmentAssetsComparisonItem01: {
        displayName: 'CDI',
        monthlyYield: 0.025, // usado para calculo de retorno
        estimatedYieldLabel: "13%" // usado no grafico 
      },
      investmentAssetsComparisonItem02: {
        displayName: 'Poupança',
        monthlyYield: 0.011, // usado para calculo de retorno
        estimatedYieldLabel: "8%" // usado no grafico 
      },
    }
  },
  computed: {
    basicExperiencePairTradingUrl () {
      return `/plataforma/clue/?command=/trade/basic/${this.asset.symbol}/brl`
    },
  },
  methods: {
    onCryptoAssetsUpdated () {
    },
  }
})
