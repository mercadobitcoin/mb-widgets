function MbwdMostValuedAssets() {
  this.render = function (Vue, querySelector) {
    if (!Vue) {
      throw "Vue is required to load this widget";
    }

    if (Vue.version && Number(Vue.version[0]) < 2) {
      throw "You must provide at least a Vue 2 version";
    }

    if (!querySelector) {
      throw "Provide a querySelector";
    }

    new Vue({
      el: document.querySelector(querySelector),
      components: {
        "mbwd-most-valued-assets": MBWD_MOST_VALUED_ASSETS(),
      },
    });
  };
}
