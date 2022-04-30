<script>
import { defineComponent, ref } from "vue";
import "@/index.css";
import TInputGroup from "@/lib-components/Input/TInputGroup";
import TButton from "@/lib-components/Button/TButton";
// Uncomment import and local "components" registration if library is not registered globally.
// import { TailadminUiKitSample } from '@/entry.esm';

export default defineComponent({
  name: "ServeDev",
  components: { TButton, TInputGroup },

  setup() {
    const form = ref({
      status: "",
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
    <div class="container relative">
      <div style="width: fit-content" class="inline-flex space-x-2"></div>
    </div>
  </div>
</template>
