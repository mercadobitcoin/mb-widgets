const MBWD_FIXED_INCOME_SIMULATOR = () => ({ //eslint-disable-line
  template: `
    <div class="mbwd-fixed-income-simulator">
      <h2 class="main-title">Simulador de Renda Fixa Digital</h2>
      <p class="main-subtitle">Veja quanto o seu dinheiro pode render com {{ asset.displayName }}.</p>
      <div class="main-wrapper">
        <div class="interactive-components-wrapper">
          <h3 class="auxiliar-title">Qual valor você gostaria de investir?</h3>
          <p class="auxiliar-subtitle">O investimento inicial em Renda Fixa Digital é de R$ {{ asset.investmentMinimumAmount }}.</p>
          <div class="investment-input-wrapper">
            <form-input
              prefix="R$"
              type="text"
              mask="true"
              id="investedAmount"
              clear-rule-regex="[^0-9]*$" 
              placeholder="0,00"
              :maxLength="input.maxLength"
              :valid.sync="input.valid"
              :value.sync="investedAmount.maskedValue"
              :prevent-back-space="false"
              :mask-callback="inputMaskCallback"
              :validate-callback="validateInput"
              :validation-regex="/[0-9.,]/gi"
              :validation-regex-error="minimumAmountError" \
            />
            <div class="quick-increment-wrapper">
              <button class="quick-increment-button" @click="quickDecrementInvestedAmount">
                <img class="quick-increment-icon left" :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/'+'mbwd-fixed-income-simulator'+'/img/icons/ico-minus-white.svg'" />
              </button>
              <button class="quick-increment-button" @click="quickIncrementInvestedAmount">
                <img class="quick-increment-icon right" :src="MB_WIDGETS_GLOBAL_Cdn_Widgets_Url+'/'+'mbwd-fixed-income-simulator'+'/img/icons/ico-plus-white.svg'" />
              </button>
            </div>
          </div>
          <h3 class="auxiliar-title">Valor que você receberá no vencimento</h3>
          <p class="auxiliar-subtitle">Considerando valor investido, rendimento aproximado e preço de lançamento.</p>
          <p class="estimated-amount"> {{ asset.estimatedYieldAmount | ftFormatCurrency(2) }}</p>
          <a class="button" :href=basicExperiencePairTradingUrl>Quero Investir</a>
        </div>
        <div class="comparison-components-wrapper">
          <div>
            <h3 class="auxiliar-title">Prazo estimado de pagamento: {{expirationMonthStringfied}}</h3>
            <div>
              <p class="auxiliar-subtitle" v-if="asset.partialExpiration">Como este ativo possui liquidações parciais, você receberá remunerações fracionadas até o vencimento do investimento.</p>
              <p class="auxiliar-subtitle" v-else> Data prevista para o recebimento da rentabilidade total do ativo.</p>
              <p class="auxiliar-subtitle">Para mais detalhes, acesse a <a :href="asset.detailsPdfUrl">lâmina do ativo</a>.</p>
            </div>
          </div>
          <assets-comparison-graph-bar :baseAsset="asset" :comparissonAssets="investmentAssetsComparison" />
        </div>
      </div>
    </div>
  `,
  components: {
    'form-input': MBWD_FORM_INPUT(),// eslint-disable-line
    'assets-comparison-graph-bar': MBWD_ASSETS_COMPARISON_GRAPH_BAR(),// eslint-disable-line
  },
  mixins: [
    window.MB_WIDGETS.configMixins,
    window.MB_WIDGETS.currencyFilters,
    window.MB_WIDGETS.currencyMixins,
  ], //eslint-disable-line
  data () {
    const el = document.getElementById('mbwd-fixed-income-simulator')
    const dataSetAsset = JSON.parse(el.dataset.asset);
    const dataSetInvestmentAssetsComparison = JSON.parse(el.dataset.investmentAssetsComparison);
    return {
      investedAmount: {
        rawValue: dataSetAsset.investmentMinimumAmount,
        maskedValue: this.$options.filters.ftFormatCurrency(dataSetAsset.investmentMinimumAmount, 2, true),
      },
      quickIncrementDefaultValue: 100,
      asset: dataSetAsset,
      investmentAssetsComparison: dataSetInvestmentAssetsComparison,
      input: {
        valid: true,
        errorMessage: `Valor mínimo `,
        maxLength: 12,
        maxValue: 9999999.99
      }
    }
  },
  computed: {
    basicExperiencePairTradingUrl() {
      return `https://www.mercadobitcoin.com.br/plataforma/clue/?command=/trade/basic/${this.asset.symbol}/brl`;
    },
    minimumAmountError() {
      return this.input.errorMessage + this.$options.filters.ftFormatCurrency(this.asset.investmentMinimumAmount, 2);
    },
    expirationMonthStringfied() {
      var date = new Date(this.asset.expirationDate);
      const year = date.getFullYear();
      const month = date.toLocaleString('pt-br', { month: 'long' });
      return `${month}/${year}`
    },
  },
  watch: {
    'investedAmount.maskedValue': function (newAmount) {
      const rawValue = parseFloat(this.mxClearMasks(String(newAmount)))
      this.investedAmount.rawValue = rawValue;
      this.calculateAndUpdateEstimatedYield();
    },
  },
  mounted () {
    this.calculateAndUpdateEstimatedYield();
  },
  methods: {
    cssItemPercentual(value) {
      return {
        height: (value/this.asset.monthlyInterestRate)*100 + '%'
      };
    },
    getEstimateReturnAmount(investedAmount, interestRate, assetExpiration) {
      const assetExpirationDate = new Date(assetExpiration);
      const time = this.diffInMonths(new Date(assetExpirationDate),new Date());
      return investedAmount * ((1 + interestRate) ** time);
    },
    diffInMonths(end, start) {
      var timeDiff = Math.abs(end.getTime() - start.getTime());
      return Math.round(timeDiff / (2e3 * 3600 * 365.25));
    },
    quickIncrementInvestedAmount() {
      if (this.investedAmount.rawValue + this.quickIncrementDefaultValue > 9999999.99) {
        this.investedAmount.maskedValue = this.$options.filters.ftFormatNumber(9999999.99, 2);
        return
      }
      this.investedAmount.maskedValue = this.$options.filters.ftFormatNumber(
        this.investedAmount.rawValue + this.quickIncrementDefaultValue, 2
      );
      this.validateInput(this.investedAmount.maskedValue);
    },
    quickDecrementInvestedAmount() {
      if (this.investedAmount.rawValue - this.quickIncrementDefaultValue < 0) {
        this.investedAmount.maskedValue = this.$options.filters.ftFormatNumber(0, 2);
        return
      }
      this.investedAmount.maskedValue = this.$options.filters.ftFormatNumber(
        this.investedAmount.rawValue - this.quickIncrementDefaultValue, 2
      );

      this.validateInput(this.investedAmount.maskedValue);
    },
    validateInput: function (value) {
      const unmaskedValue = parseFloat(this.mxClearMasks(value))
      if (unmaskedValue) {
        if (unmaskedValue < parseFloat(this.asset.investmentMinimumAmount)) {
          this.input.valid = false
          return false
        }
        this.input.valid = true
        return true
      }
      this.input.valid = false
      return false
    },
    inputMaskCallback: function (value) {
      if (value) {
        // Removing all non numbers characters
        value = value.replace(/[\D]+/g, '')

        // Parsing value to Int and then to String
        value = String(parseInt(value))
        return this.$options.filters.ftFormatNumber(value / Math.pow(10, 2),2)
      }
      return value
    },
    calculateAndUpdateEstimatedYield: function () {
      this.investedAmount.rawValue;
      this.asset.estimatedYieldAmount = this.getEstimateReturnAmount(
        this.investedAmount.rawValue,
        this.asset.monthlyInterestRate,
        this.asset.expirationDate
      );

      for (i = 0, j = this.investmentAssetsComparison.length; i < j; i++) {
        this.investmentAssetsComparison[i].estimatedYieldAmount = this.getEstimateReturnAmount(
          this.investedAmount.rawValue,
          this.investmentAssetsComparison[i].monthlyInterestRate,
          this.asset.expirationDate
        );
      }
    }
  }
})
