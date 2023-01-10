# Most Valued Assets Widget

## Technical Details

The widget have it's own styles and it'll fill the whole container width size available.
So, make sure that you use it inside a proper container or you can just overide it :)

## Component Props
| name | type | required | default | description |
| ---- | ---- | -------- | ------- | ----------- |
| language | String | false | pt | Exists only for i18n. |
| intervalTimeout | Number | false | 30000 | The intervalTimeout represents the timeout that'll be used on setInterval, so it must be in **milliseconds** and the default represents 30 seconds. |
| trackingConfig | Object | false | {"ec": "web:platform:home", "en":"click", "lb":"top-gainers-24h:%symbol%" | The tracking config represents the configuration for tracking events in Google Analytics and consists of the category (ec), label (lb) and action (en) of the event passed to the GA.
It is possible to pass the symbol of the asset clicked on the event label, just put %symbol% ​​where you want to pass the value and the widget will replace it with the clicked asset. |


## How to use it
- Import the minified widget JavaScript, available on:
```sh
https://static.mercadobitcoin.com.br/web/widgets/mbwd-most-valued-assets/js/mbwd-most-valued-assets.js
```

- Now you have a **MbwdMostValuedAssets** factory instance available on the window
- So to use it ✨:
```html
<!-- Provide the component tag with an ID-->
<mbwd-most-valued-assets id="mbwd-most-valued-assets" data-track-analytics-enabled="false" />
```

- If you want to track widget interactions, just have a Google Analytics gtag instance in the site window that will consume the widget and pass the properties to it:
```html
<!-- Provide the component tag with an ID, set data-track-analytics-enabled to true and provide a trackingConfig object. Example above with %symbol%.

Obs. use double quotes to wrap the content of data-tracking-config and single quotes to wrap the attributtes -->

<mbwd-most-valued-assets id="mbwd-most-valued-assets" data-track-analytics-enabled="true" data-tracking-config="{'ec': 'web:platform:home', 'en':'click', 'lb':'top-gainers-24h:%symbol%'}" />
```

## Requirements
- Vue 2
- Font Families: `IBM Plex Sans`