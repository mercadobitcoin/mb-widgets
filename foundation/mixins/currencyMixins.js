Number.prototype.toFixedNoRounding = function (n) { //eslint-disable-line
  try {
    const reg = new RegExp('^-?\\d+(?:\\.\\d{0,' + n + '})?', 'g')
    let a = this.toString()
    if (a.indexOf('e-') !== -1) {
      return this.toFixed(n)
    }
    a = a.match(reg)[0]
    const dot = a.indexOf('.')
    if (dot === -1) {
      // integer, insert decimal dot and pad up zeros
      return a + '.' + '0'.repeat(n)
    }
    const b = n - (a.length - dot) + 1
    return b > 0 ? a + '0'.repeat(b) : a
  } catch (_E) {
    return this.toFixed(n)
  }
}

window.MB_WIDGETS = window.MB_WIDGETS || {}
window.MB_WIDGETS.currencyMixins = {//eslint-disable-line
  methods: {
    mxSetFiatMaskForInput (value, fiatDecimals) {
      let v, x

      if (value === '' || isNaN(parseFloat(value))) {
        return value
      }

      if (value.indexOf(',') !== -1) {
        x = value.split(',')[1].length
        v = value.replace(/\./g, '').replace(/,/g, '.')
      } else {
        v = value.replace(/[^0-9.]+/g, '').replace(/,/g, '.')
        x = fiatDecimals || 2
      }

      v = parseFloat(v)
      v = v.toFixed(x)
      return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: x
      }).format(v)
    },
    mxSetCryptoMaskForInput (value, maxDigits, useRound) {
      let v

      if (value === '' || isNaN(parseFloat(value))) {
        return value
      }

      let fixedDigits = 8
      if (maxDigits) {
        fixedDigits = maxDigits
      }

      const options = { minimumFractionDigits: fixedDigits }

      if (value.indexOf(',') !== -1) {
        v = value.replace(/\./g, '').replace(/,/g, '.')
      } else {
        v = value.replace(/[^0-9.]/g, '')
      }

      v = parseFloat(v)
      if (useRound) {
        v = v.toFixed(fixedDigits)
      } else {
        v = v.toFixedNoRounding(fixedDigits)
      }

      return new Intl.NumberFormat('pt-BR', options).format(v)
    },
    mxAllowFiatFormatOnly (e) {
      if (
        ((e.charCode >= 48 && e.charCode <= 57) ||
          e.charCode === 44 ||
          e.charCode === 46) === false
      ) {
        e.preventDefault()
      }
    },
    mxAllowCryptoValuesOnly (e) {
      if (
        ((e.charCode >= 48 && e.charCode <= 57) || e.charCode === 44) === false
      ) {
        e.preventDefault()
      }
    },
    mxAllowNumberValuesOnly (e) {
      if ((e.charCode >= 48 && e.charCode <= 57) === false) {
        e.preventDefault()
      }
    },
    mxClearMasks (value, raw) {
      if (raw && value.indexOf(',') === -1) {
        return value.replace(/[\D]+/g, '')
      }

      value = value.replace(/,+/gi, '.')
      const dot = value.lastIndexOf('.')

      if (dot === -1) {
        return value
      } else {
        const integerValue = value.substring(0, dot)
        const decimals = value.substring(dot + 1)
        return integerValue.replace(/\./gi, '') + '.' + decimals
      }
    },
    mxGetNumberPrecision (value) {
      const precision = String(value).split('.')
      if (precision.length === 2) {
        return Math.pow(10, precision[1].length)
      }

      return Math.pow(10, 0)
    }
  }
}
