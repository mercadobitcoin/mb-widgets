Number.prototype.toFixedNoRounding = function (n) {
  try {
    const reg = new RegExp("^-?\\d+(?:\\.\\d{0," + n + "})?", "g");
    let a = this.toString();
    if (a.indexOf("e-") != -1) {
      return this.toFixed(n);
    }
    a = a.match(reg)[0];
    const dot = a.indexOf(".");
    if (dot === -1) {
      // integer, insert decimal dot and pad up zeros
      return a + "." + "0".repeat(n);
    }
    const b = n - (a.length - dot) + 1;
    return b > 0 ? a + "0".repeat(b) : a;
  } catch (_E) {
    return this.toFixed(n);
  }
};

const bigNumberToShortenValue = function (value, scale) {
  if (!scale) scale = "K";
  const scales = {
    Q: 1e15,
    T: 1e12,
    B: 1e9,
    M: 1e6,
    K: 1e3,
  };
  if (value >= scales[scale]) {
    const m = Math.abs(Number(value));
    for (i in scales) {
      if (m >= scales[i]) {
        return (m / scales[i]).toFixed(4).slice(0, -2) + i;
      }
    }
  }
  return value;
};

const currencyFilters = {
  filters: {
    ftFormatCrypto(v, maxDigits, scale) {
      if (v === "" || isNaN(v)) {
        return "-";
      }
      if (!!scale) {
        const scalledValue = bigNumberToShortenValue(v, scale);
        if (scalledValue !== v) {
          return scalledValue;
        }
      }
      v = String(v);
      v = v.replace(/((?:\.\d{8}))\d+$/, "$1");

      let fixedDigits = 4;
      if (maxDigits) {
        fixedDigits = maxDigits;
      }

      return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: fixedDigits,
        maximumFractionDigits: fixedDigits,
      }).format(Number(v).toFixedNoRounding(fixedDigits));
    },
    ftFormatCurrency(v, maxDigits, hideSymbol) {
      if (v === "" || isNaN(v)) {
        return "-";
      }

      let fixedDigits = 2;
      if (maxDigits) {
        fixedDigits = maxDigits;
      }

      const options = { minimumFractionDigits: fixedDigits };
      if (hideSymbol !== true) {
        options.style = "currency";
        options.currency = "BRL";
      }

      return new Intl.NumberFormat("pt-BR", options).format(
        Number(v).toFixedNoRounding(fixedDigits)
      );
    },
    ftFormatNumber(v, maxDigits, removeTrailingZeros, scale) {
      if (v === "" || isNaN(parseFloat(v))) {
        return v;
      }
      let fixedDigits = 4;
      if (!!maxDigits) {
        fixedDigits = maxDigits;
      }

      if (!!scale) {
        const scalledValue = bigNumberToShortenValue(v, scale);
        if (scalledValue !== v) {
          return scalledValue;
        }
      }

      let value = new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: fixedDigits,
      }).format(Number(v).toFixedNoRounding(fixedDigits));

      if (removeTrailingZeros && fixedDigits > 0) {
        value = value.replace(/^0+(\d)|(\d),?0+$/gm, "$1$2");
      }

      return value;
    },
    ftBigNumberToShortenValue(value, scale) {
      return bigNumberToShortenValue(value, scale);
    },
  },
};
