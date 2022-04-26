# TailAdmin UI Kit

UI componentS library by VueJS and TailwindCSS. 
## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install TailAdmin UI Kit.

## Usage

Please follow my [YouTube channel](https://www.youtube.com/playlist?list=PLbdS49WKsrOXTo_X_Ja6P3zll1yyhoIYN) for usages.

```javascript
// Import a component if you want to use in script block
npm install tailadmin-ui-kit

import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Products',
  components: {TButton},
});
```

```html
<!--Use component in template block-->
<t-button color="red" loading>
    <template #icon>
        <!--Svg, vue, png or etc.-->
    </template>
    Add Product
</t-button>
```

## :rocket: Components
- [Button](#Button)
- [Input Group](#InputGroup)
- [Text Input](#TextInput)
 

>:telescope: Other components coming soon, please check [Github](https://github.com/sinan-aydogan/tailadmin-ui-kit)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
The TailAdmin is open-sourced software licensed under the [MIT](https://opensource.org/licenses/MIT) license.
