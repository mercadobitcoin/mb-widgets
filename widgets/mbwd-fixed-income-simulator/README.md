# Most Valued Assets Widget

## Technical Details
The Widget is a [Factory](https://www.dofactory.com/javascript/design-patterns/factory-method) pattern, that provides a **render** method.

The render method expects 2 parameters:
- a Vue 2 instance
- a querySelector String value.

The widget have it's own styles and it'll fill the whole container width size available.
So, make sure that you use it inside a proper container or you can just overide it :)

## Component Props
| name | type | required | default | description |
| ---- | ---- | -------- | ------- | ----------- |
| title | String | false | Mais valorizados | Exists only for i18n. |
| title | String | false | Veja os 4 ativos que mais estão valorizando no Mercado Bitcoin. | Exists only for i18n. |
| badgeLabel | String | false | Nas últimas 24 horas | Exists only for i18n. |
| intervalTimeout | Number | false | 30000 | The intervalTimeout represents the timeout that'll be used on setInterval, so it must be in **milliseconds** and the default represents 30 seconds. |

## How to use it
- Import the minified widget JavaScript, available on:
```sh
/public/mbwd-fixed-income-simulator/js/mbwd-fixed-income-simulator.js
```
- Import the minified widget CSS, available on:
```sh
/public/mbwd-fixed-income-simulator/css/mbwd-fixed-income-simulator.css
```
- Now you have a **MbwdFixedIncomeSimulator** factory instance available on the window
- So to use it ✨:
```html
<!-- Provide the component tag with an ID-->
<mbwd-fixed-income-simulator id="mbwd-fixed-income-simulator" />
```
```javascript
// Create a new widget instance and call the method render
const widget = new MBWD_FIXED_INCOME_SIMULATOR();
widget.render(Vue, '#mbwd-fixed-income-simulator');
```

## Requirements
- Vue 2
- Font Families: `IBM Plex Sans`