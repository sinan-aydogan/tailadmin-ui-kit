<script>
import { defineComponent, ref } from "vue";
import "@/index.css";
import TInputGroup from "@/lib-components/Input/TInputGroup";
import TSelectInput from "@/lib-components/Input/TSelectInput";
// import {TInputGroup, TSelectInput} from "tailadmin-ui-kit";


// Uncomment import and local "components" registration if library is not registered globally.
// import { TailadminUiKitSample } from '@/entry.esm';

export default defineComponent({
  name: "ServeDev",
  components: { TSelectInput, TInputGroup },

  setup() {
    const form = ref({
      status: null
    });

    const selectData = [
      {
        id: 1,
        name: "Weber Frank"
      },
      {
        "id": 2,
        "name": "Rosalie Marquez"
      },
      {
        "id": 3,
        "name": "Lesa Wiggins"
      },
      {
        "id": 4,
        "name": "Rae Cardenas"
      },
      {
        "id": 5,
        "name": "Velasquez Stanley"
      },
      {
        "id": 6,
        "name": "Elisabeth Dominguez"
      },
      {
        "id": 7,
        "name": "Kelsey Snow"
      },
      {
        "id": 8,
        "name": "Warner Mendez"
      },
      {
        "id": 9,
        "name": "Estela Joyce"
      },
      {
        "id": 10,
        "name": "Aguirre Tyler"
      },
      {
        "id": 11,
        "name": "Haynes Battle"
      },
      {
        "id": 12,
        "name": "Ines Blevins"
      },
      {
        "id": 13,
        "name": "Frank Mullen"
      },
      {
        "id": 14,
        "name": "Melton Wilcox"
      },
      {
        "id": 15,
        "name": "Melinda Potts"
      },
    ];

    return { form, selectData };
  }
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
      <div style="width: fit-content" class="inline-flex space-x-2">
        <t-input-group label="User">
          <t-select-input
            v-model="form.status"
            :options="selectData"
            option-label="name"
            option-value="id"
            clear-button
            search
          >
            <template #label="{props}">
              <div class="flex space-x-2">
                <img alt="avatar" class="w-6 h-6 rounded-full" :src="'https://i.pravatar.cc/150?img='+props.id"/>
                <span v-text="props.name"></span>
              </div>
            </template>
          </t-select-input>
        </t-input-group>
      </div>
    </div>
  </div>
</template>
