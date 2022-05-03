# TailAdmin UI Kit

UI componentS library by VueJS and TailwindCSS.

<p align="center">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" />
</p>
<p align="center">

<a href="https://ko-fi.com/sinanaydogan" target="_blank">
    <img src="https://ko-fi.com/img/githubbutton_sm.svg">
</a>

</p>

<p align="center">
<a href="https://www.buymeacoffee.com/sinanaydogan">
    <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=sinanaydogan&button_colour=FFDD00&font_colour=000000&font_family=Lato&outline_colour=000000&coffee_colour=ffffff">
</a>
</p>

<p align="center">
<a href="https://discord.gg/TnjA2GqYmw">
    <img src="https://v2.tailadmin.dev/img/demo/discord.svg" height="40">
</a>
</p>

## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install TailAdmin UI Kit.

## Usage

Please follow my [YouTube channel](https://www.youtube.com/playlist?list=PLbdS49WKsrOXTo_X_Ja6P3zll1yyhoIYN) for usages.

```bash
npm install tailadmin-ui-kit
```

```js
/*Import styles in main.js or app.js*/
import "tailadmin-ui-kit/src/index.css"
```

```javascript
// Import a component if you want to use in script block
import { TSwitchInput } from "tailadmin-ui-kit"
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'Products',
    components: {TSwitchInput},
    setup() {
        const form = ref({
            name: '',
            status: false
        })

        return {
            form
        }
    }
});
```

```html
<!--Use component in template block-->
<t-switch-input v-model="product.status" true-color="emerald" false-color="rose" loading/>

```

## :rocket: Components
- [Alert](https://youtu.be/BoGcU6olNsg)🚀
- [Button](https://youtu.be/A42a0Tcls5s)
- [Modal with Notification feature](https://youtu.be/iCJOApZVwQQ)
- Form & Input Components
  - [Input Group](https://youtu.be/EanH8XQNMU8)
  - [Text Input](https://youtu.be/EanH8XQNMU8)
  - [Text Area Input](https://youtu.be/cCQSoqIfJMM)
  - [Switch Input](https://youtu.be/a5RpQl2cnEs)
  - [Select Input](https://youtu.be/nJ4bQjdvxPM) 

> :telescope: Other components coming soon, please check [Github](https://github.com/sinan-aydogan/tailadmin-ui-kit)

## Help

If you need to help more than this documentation:
- You can join our [Discord Channel](https://discord.gg/TnjA2GqYmw) then ask your questions

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

The TailAdmin is open-sourced software licensed under the [MIT](https://opensource.org/licenses/MIT) license.
