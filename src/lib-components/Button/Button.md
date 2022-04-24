# Button

| Prop         | Type    | Default | Options                                 | Description              |
|--------------|---------|---------|-----------------------------------------|--------------------------|
| title        | String  |         |                                         | Button text              |
| size         | String  | md      | sm, md, lg                              | Inactive yet             |
| design       | String  | filled  | filled, light, outline, link, link-plus | Button style             |
| color        | String  | blue    | All Colors of TailwindCSS V3            | Color schema             |
| radius       | String  | md      | sm, md, lg, xl, 2xl, full               | Radius of the corners    |
| link         | String  |         | What If you want                        | Inactive yet             |
| border       | Boolean | false   | true, false                             |                          |
| disabled     | Boolean | false   | true, false                             |                          |
| loading      | Boolean | false   | true, false                             | Show a loading animation |
| type         | String  | submit  | submit, reset, button                   |                          |
| animation    | Boolean | true    | true, false                             | Scale animation to click |
| iconPosition | String  | left    | left, right                             |                          |
| block        | Boolean | false   |                                         | Full width button        |

| Slot | Description                |
|------|----------------------------|
| icon | Showing icon in the button |