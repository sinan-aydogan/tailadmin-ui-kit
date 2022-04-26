<script>
import { defineComponent, ref } from "vue";
import TInputGroup from "@/lib-components/Input/TInputGroup";

import "@/index.css";
import TTextInput from "@/lib-components/Input/TTextInput";
// Uncomment import and local "components" registration if library is not registered globally.
// import { TailadminUiKitSample } from '@/entry.esm';

export default defineComponent({
  name: "ServeDev",
  components: { TTextInput, TInputGroup },

  setup() {
    const form = ref({
      name: "",
    });

    return { form };
  },
});
</script>

<style>
.container {
  background-color: rgb(229 231 235);
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (prefers-color-scheme: dark) {
  .container {
    background-color: rgb(31 41 55);
  }
}
</style>

<template>
  <div id="app">
    <div class="container">
      <t-input-group sub-label="New" sub-label-color="emerald">
        <t-text-input v-model="form.name" clear-button radius="sm">
          <template #prepend>
            <b style="color: red">Monthly</b>
          </template>
        </t-text-input>

        <template #label>
          <i style="back">Sallary</i>
        </template>
      </t-input-group>
    </div>
  </div>
</template>
