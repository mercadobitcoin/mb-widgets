Number.prototype.toFixedNoRounding=function(t){try{const s=new RegExp("^-?\\d+(?:\\.\\d{0,"+t+"})?","g");let e=this.toString();if(-1!==e.indexOf("e-"))return this.toFixed(t);e=e.match(s)[0];const a=e.indexOf(".");if(-1===a)return e+"."+"0".repeat(t);const i=t-(e.length-a)+1;return i>0?e+"0".repeat(i):e}catch(s){return this.toFixed(t)}};const bigNumberToShortenValue=function(t,s){s||(s="K");const e={Q:1e15,T:1e12,B:1e9,M:1e6,K:1e3};if(t>=e[s]){const s=Math.abs(Number(t));for(i in e)if(s>=e[i])return(s/e[i]).toFixed(4).slice(0,-2)+i}return t},currencyFilters={filters:{ftFormatCrypto(t,s,e){if(""===t||isNaN(t))return"-";if(e){const s=bigNumberToShortenValue(t,e);if(s!==t)return s}t=(t=String(t)).replace(/((?:\.\d{8}))\d+$/,"$1");let a=4;return s&&(a=s),new Intl.NumberFormat("pt-BR",{minimumFractionDigits:a,maximumFractionDigits:a}).format(Number(t).toFixedNoRounding(a))},ftFormatCurrency(t,s,e){if(""===t||isNaN(t))return"-";let a=2;s&&(a=s);const i={minimumFractionDigits:a};return!0!==e&&(i.style="currency",i.currency="BRL"),new Intl.NumberFormat("pt-BR",i).format(Number(t).toFixedNoRounding(a))},ftFormatNumber(t,s,e,a){if(""===t||isNaN(parseFloat(t)))return t;let i=4;if(s&&(i=s),a){const s=bigNumberToShortenValue(t,a);if(s!==t)return s}let o=new Intl.NumberFormat("pt-BR",{minimumFractionDigits:i}).format(Number(t).toFixedNoRounding(i));return e&&i>0&&(o=o.replace(/^0+(\d)|(\d),?0+$/gm,"$1$2")),o},ftBigNumberToShortenValue:(t,s)=>bigNumberToShortenValue(t,s)}},MBWD_MOST_VALUED_ASSETS=function(){return{template:'\n<div v-if="cptdDisplaySelf" class="mbwd-most-valued-assets">\n<p class="title">{{ i18n(\'Mais valorizados\') }}</p>\n<p class="description">{{ i18n(\'Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.\') }}</p>\n<p class="badge">{{ i18n(\'Nas últimas 24 horas\') }}</p>\n<div class="assets">\n<a class="asset" v-for="asset in mostValuedAssetsList" :key="asset.symbol" :href="getAssetBasicTradeExperienceLink(asset.symbol)">\n<div class="attributes">\n<img class="icon" :src="getIconUrl(asset.icon)" :title="getIconAlt(asset.symbol)" :alt="getIconAlt(asset.symbol)"/>\n<p class="name">{{ asset.symbol }}</p>\n</div>\n<span class="variation">+{{ asset.variation | ftFormatNumber(2) }}%</span>\n</a>\n</div>\n</div>',props:{language:{type:String,default:"pt"},intervalTimeout:{type:Number,default:3e4}},mixins:[currencyFilters],data:()=>({intervalId:null,mostValuedAssetsList:[],translateMap:{pt:{"Mais valorizados":"Mais valorizados","Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.":"Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.","Nas últimas 24 horas":"Nas últimas 24 horas"},en:{"Mais valorizados":"Mais valorizados","Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.":"Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.","Nas últimas 24 horas":"Nas últimas 24 horas"},es:{"Mais valorizados":"Mais valorizados","Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.":"Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.","Nas últimas 24 horas":"Nas últimas 24 horas"}}}),created(){this.getMostValuedAssets(),this.scheduleGetMostValuedAssetsInterval(),document.addEventListener("visibilitychange",this.handleVisibilityChange,!1)},destroy(){this.stopInterval()},computed:{cptdDisplaySelf(){return this.mostValuedAssetsList?.length>0},cptdCdnStaticDomainUrl:()=>"https://static.mercadobitcoin.com.br/web"},methods:{i18n(t){return this.translateMap?.[this.language]?.[t]??""},getIconAlt:t=>`ícone ${t}`,getIconUrl(t){return this.cptdCdnStaticDomainUrl+t},getAssetBasicTradeExperienceLink:t=>`https://www.mercadobitcoin.com.br/plataforma/clue/?command=/trade/basic/${(t??"").toLowerCase()}/brl`,async getMostValuedAssets(){try{const t=await fetch("https://store.mercadobitcoin.com.br/api/v1/marketplace/crypto/coin?sort=variation&order=DESC&limit=4");if(t.ok){const{response_data:s}=await t.json();this.mostValuedAssetsList=s?.data??[]}else this.mostValuedAssetsList=[]}catch(t){this.mostValuedAssetsList=[]}},scheduleGetMostValuedAssetsInterval(){this.intervalId=setInterval(this.getMostValuedAssets,this.intervalTimeout)},stopGetMostValuedAssetsInterval(){clearInterval(this.intervalId),this.intervalId=null},handleVisibilityChange(){"hidden"===document.visibilityState?this.stopGetMostValuedAssetsInterval():this.scheduleGetMostValuedAssetsInterval()}}}};function MbwdMostValuedAssets(){this.render=function(t,s){if(!t)throw new Error("Vue is required to load this widget");if(t.version&&Number(t.version[0])<2)throw new Error("You must provide at least a Vue 2 version");if(!s)throw new Error("Provide a querySelector");new t({el:document.querySelector(s),components:{"mbwd-most-valued-assets":{template:'\n<div v-if="cptdDisplaySelf" class="mbwd-most-valued-assets">\n<p class="title">{{ i18n(\'Mais valorizados\') }}</p>\n<p class="description">{{ i18n(\'Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.\') }}</p>\n<p class="badge">{{ i18n(\'Nas últimas 24 horas\') }}</p>\n<div class="assets">\n<a class="asset" v-for="asset in mostValuedAssetsList" :key="asset.symbol" :href="getAssetBasicTradeExperienceLink(asset.symbol)">\n<div class="attributes">\n<img class="icon" :src="getIconUrl(asset.icon)" :title="getIconAlt(asset.symbol)" :alt="getIconAlt(asset.symbol)"/>\n<p class="name">{{ asset.symbol }}</p>\n</div>\n<span class="variation">+{{ asset.variation | ftFormatNumber(2) }}%</span>\n</a>\n</div>\n</div>',props:{language:{type:String,default:"pt"},intervalTimeout:{type:Number,default:3e4}},mixins:[currencyFilters],data:()=>({intervalId:null,mostValuedAssetsList:[],translateMap:{pt:{"Mais valorizados":"Mais valorizados","Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.":"Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.","Nas últimas 24 horas":"Nas últimas 24 horas"},en:{"Mais valorizados":"Mais valorizados","Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.":"Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.","Nas últimas 24 horas":"Nas últimas 24 horas"},es:{"Mais valorizados":"Mais valorizados","Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.":"Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin.","Nas últimas 24 horas":"Nas últimas 24 horas"}}}),created(){this.getMostValuedAssets(),this.scheduleGetMostValuedAssetsInterval(),document.addEventListener("visibilitychange",this.handleVisibilityChange,!1)},destroy(){this.stopInterval()},computed:{cptdDisplaySelf(){return this.mostValuedAssetsList?.length>0},cptdCdnStaticDomainUrl:()=>"https://static.mercadobitcoin.com.br/web"},methods:{i18n(t){return this.translateMap?.[this.language]?.[t]??""},getIconAlt:t=>`ícone ${t}`,getIconUrl(t){return this.cptdCdnStaticDomainUrl+t},getAssetBasicTradeExperienceLink:t=>`https://www.mercadobitcoin.com.br/plataforma/clue/?command=/trade/basic/${(t??"").toLowerCase()}/brl`,async getMostValuedAssets(){try{const t=await fetch("https://store.mercadobitcoin.com.br/api/v1/marketplace/crypto/coin?sort=variation&order=DESC&limit=4");if(t.ok){const{response_data:s}=await t.json();this.mostValuedAssetsList=s?.data??[]}else this.mostValuedAssetsList=[]}catch(t){this.mostValuedAssetsList=[]}},scheduleGetMostValuedAssetsInterval(){this.intervalId=setInterval(this.getMostValuedAssets,this.intervalTimeout)},stopGetMostValuedAssetsInterval(){clearInterval(this.intervalId),this.intervalId=null},handleVisibilityChange(){"hidden"===document.visibilityState?this.stopGetMostValuedAssetsInterval():this.scheduleGetMostValuedAssetsInterval()}}}}})}}