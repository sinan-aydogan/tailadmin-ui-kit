<template>
  <div
    @click="input.focus()"
    class="relative flex flex-grow-0 border border-slate-300 bg-white dark:bg-slate-700 dark:border-transparent dark:bg-slate-900/30 border-slate-300 dark:border-slate-600 overflow-hidden"
    :class="[
      GlobalStyles.radius[radius],
      {
        'focus:ring-rose-500 border-rose-500 focus:border-rose-500':
          messageType,
      },
      { 'focus:ring-indigo-500 focus:border-indigo-500': !messageType },
    ]"
  >
    <!--Prepend-->
    <div class="min-w-[.5rem] flex items-center pointer-events-none">
      <div
        v-if="$slots.prepend || prepend"
        class="px-2 text-gray-500 sm:text-sm"
      >
        <span v-if="prepend" v-text="prepend"></span>
        <slot v-else name="prepend"></slot>
      </div>
    </div>

    <!--Input-->
    <div class="relative flex flex-grow-0">
      <input
        :value="modelValue"
        :type="type"
        :id="id"
        :name="id"
        :disabled="disabled"
        :readonly="readOnly"
        @input="$emit('update:modelValue', $event.target.value)"
        class="h-10 flex flex-grow-0 z-0 my-1 px-2 w-full text-slate-700 dark:text-slate-200 bg-transparent outline-none focus:ring-2"
        ref="input"
      />
      <!--Clear Button-->
      <div
        class="absolute z-10 right-2 top-[.85rem] bg-slate-200 hover:bg-slate-200 dark:bg-slate-700 rounded-full dark:hover:bg-rose-600"
      >
        <CircleXMark
          v-if="modelValue && clearButton"
          @click="$emit('update:modelValue', '')"
          class="w-5 h-5 text-slate-600 hover:text-rose-600 dark:text-slate-200 cursor-pointer"
        />
      </div>
    </div>

    <!--Append-->
    <div class="min-w-[.5rem]">
      <div
        v-if="messageType || $slots.append || append"
        class="flex px-1 text-gray-500 sm:text-sm h-full items-center justify-center pointer-events-none whitespace-nowrap"
      >
        <span v-if="append" v-text="append"></span>
        <slot v-else name="append"></slot>
        <!--Icons-->
        <div class="flex h-full justify-center items-center px-2">
          <!--Message Info-->
          <circle-exclamation-icon
            v-if="messageType"
            class="w-5 h-5 mr-0.5"
            :class="[Style.inputGroup.messageColors[messageType]]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref, watch } from "vue";
import GlobalStyles from "../GlobalStyles.json";
import Style from "./Style.json";
import CircleExclamationIcon from "@/lib-components/Icons/CircleExclamationIcon";
import CircleXMark from "@/lib-components/Icons/CircleXMark";

export default {
  name: "TTextInput",
  components: { CircleExclamationIcon, CircleXMark },
  props: {
    modelValue: {
      type: [String, Date, Number],
      default: "",
    },
    selectValue: {
      type: [String, Date, Number, Object, Array],
      default: null,
    },
    id: {
      type: String,
      default() {
        return "text-input-" + Number(new Date());
      },
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    clearButton: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: String,
      default: "md",
    },
    prepend: {
      type: String,
      default: "",
    },
    append: {
      type: String,
      default: "",
    },
    select: {
      type: Boolean,
      default: false,
    },
    selectOptions: {
      type: [Object, Array],
      default() {
        return [{ key: "", label: "Please add a options source" }];
      },
    },
    selectLabelKey: {
      type: String,
      default: "label",
    },
    selectValueKey: {
      type: String,
      default: "key",
    },
    selectType: {
      type: String,
      default: "outside",
    },
  },

  emits: ["update:modelValue", "update:selectValue"],

  setup() {
    const input = ref();

    const messageType = inject("messageType");

    return {
      GlobalStyles,
      Style,
      messageType,
      input,
    };
  },
};
</script>

<style scoped></style>
