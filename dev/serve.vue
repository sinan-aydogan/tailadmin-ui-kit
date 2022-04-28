<script>
import { defineComponent, ref } from "vue";
import "@/index.css";
import TSwitchInput from "@/lib-components/Input/TSwitchInput";
import TInputGroup from "@/lib-components/Input/TInputGroup";
// Uncomment import and local "components" registration if library is not registered globally.
// import { TailadminUiKitSample } from '@/entry.esm';

export default defineComponent({
  name: "ServeDev",
  components: { TInputGroup, TSwitchInput },

  setup() {
    const form = ref({
      status: [],
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
      <div>
        <t-input-group label="Write permission">
          <t-switch-input
            id="write"
            v-model="form.status"
            true-color="emerald"
            false-color="amber"
            multi
            loading
          >
            <template #true> Yes, It can </template>

            <template #false> No, It can not </template>
          </t-switch-input>
        </t-input-group>
      </div>
    </div>
  </div>
</template>
