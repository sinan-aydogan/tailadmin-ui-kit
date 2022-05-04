<script>
import { defineComponent, ref } from "vue";
import "@/index.css";

import TContentCard from "@/lib-components/ContentCard/TContentCard";
import TInputGroup from "@/lib-components/Input/TInputGroup";
import TTextInput from "@/lib-components/Input/TTextInput";
import TSelectInput from "@/lib-components/Input/TSelectInput";
import TTextAreaInput from "@/lib-components/Input/TTextAreaInput";
import TButton from "@/lib-components/Button/TButton";
// import {TContentCard} from "tailadmin-ui-kit";

export default defineComponent({
  name: "ServeDev",
  components: {
    TButton,
    TTextAreaInput,
    TSelectInput,
    TTextInput,
    TInputGroup,
    TContentCard,
  },

  setup() {
    const saveForm = () => {
      alert("save form");
    };

    return {
      saveForm,
    };
  },
});
</script>

<style>
#app {
  background-color: rgb(229 231 235);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (prefers-color-scheme: dark) {
  #app {
    background-color: rgb(31 41 55);
  }
}
</style>

<template>
  <div id="app">
    <div
      style="
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: row;
        gap: 10px;
        padding: 50px;
        width: 750px;
      "
    >
      <t-content-card
        radius=""
        img-alt-text="Turning Red"
        design="horizontal-banner"
        title="Turning Red"
        subtitle="Growing up is a beast."
        img-src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg"
      >
        <template #default>
          <div class="h-full flex flex-col justify-between">
            <p>
              Thirteen-year-old Mei is experiencing the awkwardness of being a
              teenager with a twist – when she gets too excited, she transforms
              into a giant red panda.
            </p>

            <div>
              <span>Actors:</span>
              <div class="flex space-x-2">
                <t-button>Rosalie Chiang</t-button>
                <t-button>Jin Park</t-button>
                <t-button>Sandra Oh</t-button>
              </div>
            </div>
          </div>
        </template>
      </t-content-card>
    </div>
  </div>
</template>
