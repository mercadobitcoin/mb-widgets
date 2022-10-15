const URLMixins = {
  methods: {
    mxCreateUrlQueryString(options) {
      if (!options || !Object.keys(options).length) {
        return "";
      }

      return "?".concat(
        Object.keys(options)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`
          )
          .join("&")
      );
    },
  },
};
