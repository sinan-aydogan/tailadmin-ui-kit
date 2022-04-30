<template>
  <div class="relative" :class="{ 'opacity-50 cursor-not-allowed': disabled }">
    <!--Clear Button-->
    <div
      v-if="modelValue && clearButton && !disabled"
      class="absolute z-10 -top-1 -right-1 bg-slate-200 hover:bg-slate-200 dark:bg-slate-700 rounded-full dark:hover:bg-rose-600"
    >
      <CircleXMark
        @click="
          $emit('update:modelValue', '');
          textLength = 0;
        "
        class="w-5 h-5 text-slate-600 hover:text-rose-600 dark:text-slate-200 hover:dark:text-slate-200 cursor-pointer -m-1"
      />
    </div>

    <!--Icons-->
    <div class="absolute top-2 right-2">
      <!--Message Info-->
      <circle-exclamation-icon
        v-if="messageType"
        class="w-5 h-5 mr-0.5"
        :class="[Style.inputGroup.messageColors[messageType]]"
      />
    </div>

    <!--Input-->
    <textarea
      :class="[
        'border whitespace-normal min-h-[3.565rem] bg-white dark:bg-slate-700 dark:bg-slate-900/30 dark:text-slate-200 p-4 h-auto w-full outline-none focus:ring-2',
        GlobalStyles.radius[radius],
        { 'cursor-not-allowed': disabled || readOnly },
        messageType
          ? Style.inputGroup.messageColors[messageType]
          : 'border-slate-300 dark:border-slate-600 focus:ring-indigo-500 focus:border-indigo-500',
      ]"
      :rows="rows"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      ref="input"
      :disabled="disabled"
      :readonly="readOnly"
    />
    <span
      class="float-right text-xs -mt-0.5 min-w-[1.5rem] text-center text-slate-700 dark:text-slate-200"
      v-show="counter"
    >
      {{ textLength }}
    </span>
  </div>
</template>

<script>
import { toRefs, watch, inject, ref } from "vue";
import Style from "./Style.json";
import GlobalStyles from "../GlobalStyles.json";
import CircleXMark from "@/lib-components/Icons/CircleXMark";
import CircleExclamationIcon from "@/lib-components/Icons/CircleExclamationIcon";

export default {
  name: "TTextAreaInput",
  components: { CircleExclamationIcon, CircleXMark },
  props: {
    modelValue: {
      type: String,
    },
    id: {
      type: String,
    },
    rows: {
      type: Number,
      default: 3,
    },
    placeholder: {
      type: String,
    },
    clearButton: {
      type: Boolean,
      default: false,
    },
    counter: {
      type: Boolean,
      default: false,
    },
    disabled: {
      default: false,
    },
    readOnly: {
      default: false,
    },
    radius: {
      type: String,
      default: "md",
    },
  },
  setup(props) {
    /*Definitions*/
    const { modelValue } = toRefs(props);
    /*Watch Text Length*/
    const textLength = ref();
    watch(modelValue, () => {
      if (modelValue.value) {
        textLength.value = modelValue.value.length;
      }
    });
    /*Get Error Status*/
    const messageType = inject("messageType");
    return { GlobalStyles, Style, messageType, textLength };
  },
};
</script>
