<template>
  <button
    :type="type"
    :disabled="disabled"
    class="t-btn"
    :class="[
      `t-btn-${design} t-btn-${design}-${color} t-radius-${radius}`,
      {
        't-border' : (border || design === 'outline') ,
        't-border-0': design.includes('link') ,
        't-btn-loading': loading || disabled ,
        't-btn-animation': animation,
        't-btn-block': block
        },
      $slots.default || title ? 'px-4' : 'px-2',
      iconPosition === 'right' ? 't-flex-row-reverse' : 't-flex-row',
    ]"
    :aria-label="title"
    @click="onClick($event)"
  >
    <div class="flex flex-grow-0 flex-shrink-0">
      <!--Loading Animation-->
      <t-circle-loading-animation
        v-if="loading"
        class="t-btn-loading-icon"
        :class="!$slots.default && !title ? '' : (iconPosition === 'right' ? 'ml-2' : '-ml-1 mr-2')
        "
      />

      <!--Icon-->
      <span
        v-if="$slots.icon && !loading"
        :class="!$slots.default && !title ? '' : (iconPosition === 'right' ? 'pl-2' : 'pr-2')"
      >
        <slot name="icon"></slot>
      </span>
    </div>

    <!--Content-->
    <div
      v-if="$slots.default || title"
      :class="[
        { 'text-2xl': size === '2xl' },
        { 'text-xl': size === 'xl' },
        { 'text-lg': size === 'lg' },
        { 'text-md': size === 'md' },
        { 'text-xs': size === 'sm' },
      ]"
    >
      <span v-if="title" v-text="title"></span>
      <slot v-else></slot>
    </div>
  </button>
</template>
<script setup>
import TCircleLoadingAnimation from "../LoadingAnimation/TCircleLoadingAnimation.vue";

const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  size: {
    type: String,
    default: "md"
  },
  design: {
    type: String,
    default: "filled",
    validator(design) {
      return ["filled", "light", "outline", "link", "link-plus"].includes(design);
    }
  },
  color: {
    type: String,
    default: "blue"
  },
  radius: {
    type: String,
    default: "md"
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
});

/*Define emits*/
const emit = defineEmits([
  "handleClick"
]);

const onClick = (event) => {
  emit("handleClick", event);
};

</script>
