<script setup>
import { ref, toRefs, computed } from "vue";
import { Link } from "@inertiajs/inertia-vue3";

const props = defineProps({
  label: {
    type: String,
    default: "Button",
  },
  link: String,
  color: {
    type: String,
    default: "blue",
  },
  design: {
    type: String,
    default: "solid",
  },
  radius: {
    type: String,
    default: "sm",
  },
  buttonStyles: Object,
  block: Boolean,
  loading: Boolean,
});

const { color, design, buttonStyles, radius, block, loading } = toRefs(props);

/* Button Style Generator */
const styles = ref({
  button: "",
  label: "",
  loading: "",
  labelContainer: "",
  icon: "",
});
const generatedStyles = computed(() => {
  let i = {};

  if (!buttonStyles.value) {
    i.button = [
      "btn",
      "btn-" + design.value,
      "btn-" + color.value,
      "t-radius-" + radius.value,
      block.value ? "w-full" : "w-fit",
      loading.value ? "pointer-events-none" : "",
    ];
    i.label = ["btn-label"];
    i.labelContainer = ["btn-label-container"];
    i.loading = ["btn-loading"];
    i.icon = ["btn-icon"];
  } else {
    i = styles.value;
  }

  return i;
});
</script>

<template>
  <component
    :is="link ? Link : 'button'"
    :class="generatedStyles.button"
    :disabled="loading"
  >
    <!-- Icon -->
    <div :class="generatedStyles.icon">
      <slot v-if="!loading" name="icon" />
      <!-- Loading Icon -->
      <div v-else :class="generatedStyles.loading" />
    </div>
    <!-- Label -->
    <div v-if="!loading" :class="generatedStyles.labelContainer">
      <slot v-if="$slots.hasOwnProperty('default')" />
      <span v-else v-text="label" :class="generatedStyles.label" />
    </div>
    <!-- Loading -->
    <div v-else>Yükleniyor</div>
  </component>
</template>
