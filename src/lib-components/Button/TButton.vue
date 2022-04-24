<template>
  <!--Button-->
  <button
      :type="type"
      :disabled="disabled"
      :read-only="loading"
      :class="[
          TStyle.base,
          TStyle[design].base,
          TStyle[design][color],
          TStyle.radius[radius],
          {'border': border || design==='outline'},
          {'border-0' : design.includes('link')},
          {'opacity-75 pointer-events-none' : loading || disabled},
          [$slots.default ? 'px-4' : 'px-2'],
          {'active:scale-90' : animation},
          [iconPosition === 'right' ? 'flex-row-reverse' : 'flex-row'],
          {'w-full justify-center' : block}
          ]"
  >
   <div class="flex flex-grow-0 flex-shrink-0">
     <!--Loading Animation-->
     <component
         :is="loadingComponent"
         v-if="loading"
         class="w-5 h-5"
         :class="$slots.default ? (iconPosition === 'right' ? 'ml-2' : '-ml-2 mr-2') : null"
     />

     <!--Icon-->
     <span v-if="$slots.icon && !loading" :class="$slots.default ? (iconPosition === 'right' ? 'pl-2' : 'pr-2') : null">
      <slot name="icon"></slot>
    </span>
   </div>

    <!--Content-->
    <div v-if="$slots.default || title">
      <span v-if="title" v-text="title"></span>
      <slot v-else></slot>
    </div>


  </button>
  <!--Custom-->
</template>

<script>
import {toRefs, reactive, computed, shallowRef} from 'vue';
import {default as Style} from "./Style.json"
import TCircleLoadingAnimation from "../LoadingAnimation/TCircleLoadingAnimation";

export default {
  name: "TButton",

  props: {
    title: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: "md"
    },
    design: {
      type: String,
      default: "filled"
    },
    color: {
      type: String,
      default: "blue"
    },
    radius: {
      type: String,
      default: 'md'
    },
    link: {
      type: String,
      default: ""
    },
    border: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingDesign: {
      type: String,
      default: "three-bars"
    },
    loadingWithContent: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "submit"
    },
    animation: {
      type: Boolean,
      default: true
    },
    iconPosition: {
      type: String,
      default: "left"
    },
    block: {
      type: Boolean,
      default: false
    }
  },

  components: {
    TCircleLoadingAnimation
  },

  setup(props) {
    const TStyle = Style;
    /*Definitions*/
    const {
      loadingDesign
    } = toRefs(props);

    /*Loading Component*/
    const loadingComponent = shallowRef();
    switch (loadingDesign.value) {
      case "circle":
        loadingComponent.value = "TCircleLoadingAnimation";
        break;
      default:
        loadingComponent.value = "TCircleLoadingAnimation";
    }

    /*Return*/
    return {TStyle, loadingComponent};
  }
}
</script>

<style scoped>
.btn {
  @apply bg-red-500
}

</style>