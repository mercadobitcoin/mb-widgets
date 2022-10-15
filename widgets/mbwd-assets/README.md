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
/public/mbwd-most-valued-assets/js/c-mbwd-most-valued-assets.js
```
- Import the minified widget CSS, available on: 
```sh
/public/mbwd-most-valued-assets/css/c-mbwd-most-valued-assets.css
```
- Now you have a **MbwdMostValuedAssets** factory instance available on the window
- So to use it ✨:
```html
<!-- Provide the component tag with an ID-->
<mbwd-most-valued-assets id="mostValuedAssets" />
```
```javascript
// Create a new widget instance and call the method render
const widget = new MbwdMostValuedAssets();
widget.render(Vue, '#mostValuedAssets');
```

## Requirements
- Vue 2
- Font Families: `IBM Plex Sans`