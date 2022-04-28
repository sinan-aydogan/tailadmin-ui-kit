<template>
  <div
    class="relative flex items-center select-none border dark:border-transparent p-2 border rounded-full"
    :class="[
      coloredBg
        ? Style.switchInput.outsideColors[status ? trueColor : falseColor]
        : 'bg-slate-300 dark:bg-slate-700',
      design === 'higher' ? 'h-10 w-16' : 'h-4 w-12 mx-1',
      hasSlot ? 'w-auto' : '',
    ]"
  >
    <!--Button-->
    <div
      class="flex items-center justify-center rounded-full whitespace-nowrap cursor-pointer transform transition-all duration-300"
      :class="[
        !hasSlot
          ? Style.switchInput.buttonColors[status ? trueColor : falseColor]
          : '',
        hasSlot ? 'p-1' : 'w-6 h-6 absolute',
        {
          'left-0': design !== 'higher' && !modelValue,
          'left-2': design === 'higher' && !modelValue,
          'left-6': design !== 'higher' && modelValue,
          'left-8': design === 'higher' && modelValue,
          'pointer-events-none opacity-50': disabled,
          'pointer-events-none': loading,
        },
      ]"
      @click="!disabled && select(id)"
    >
      <!--Loading Icon-->
      <t-circle-loading-animation
        v-if="loading"
        class="w-5 h-5 text-white"
        :class="
          hasSlot
            ? 'absolute bg-slate-500 rounded-full w-7 h-7 ring-4 ring-slate-700/75'
            : ''
        "
      />

      <!--Slot-->
      <div
        v-if="hasSlot"
        class="flex text-slate-700 dark:text-slate-200 -mx-2 space-x-2"
      >
        <template v-for="item in [true, false]">
          <div
            class="py-1 px-2"
            :class="[
              item === status
                ? Style.switchInput.buttonColors[
                    status ? trueColor : falseColor
                  ]
                : '',
              {
                'rounded-l-full': status === item && item === true,
                'rounded-r-full': status === item && item === false,
              },
            ]"
          >
            <slot :name="item"></slot>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Style from "./Style.json";
import TCircleLoadingAnimation from "@/lib-components/LoadingAnimation/TCircleLoadingAnimation";
import { computed, ref, toRefs, watch } from "vue";

export default {
  name: "TSwitchInput",
  components: { TCircleLoadingAnimation },
  props: {
    modelValue: {
      type: [Array, Object, Boolean],
      default: false,
    },
    trueColor: {
      type: String,
      default: "green",
    },
    id: {
      type: String,
      default: "",
    },
    falseColor: {
      type: String,
      default: "red",
    },
    indeterminateColor: {
      type: String,
      default: "slate",
    },
    design: {
      type: String,
      default: "higher",
    },
    coloredBg: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    multi: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:modelValue"],

  setup(props, { emit, slots }) {
    const { modelValue, multi, id } = toRefs(props);
    const status = ref(
      multi.value ? modelValue.value.includes(id.value) : modelValue.value
    );

    const hasSlot = computed(() => {
      if (slots.hasOwnProperty("true") && slots.hasOwnProperty("false")) {
        return true;
      }
      return false;
    });

    /*Multi options*/
    const select = (id) => {
      if (multi.value && typeof modelValue.value === "object") {
        /*Add*/
        if (modelValue.value.includes(id) && status.value) {
          modelValue.value.splice(modelValue.value.indexOf(id), 1);
          status.value = false;
        } else if (modelValue.value.includes(id) === false && !status.value) {
          modelValue.value.push(id);
          status.value = true;
        }
      } else {
        status.value = !status.value;
        emit("update:modelValue", status.value);
      }
    };

    return {
      hasSlot,
      Style,
      select,
      status,
    };
  },
};
</script>

<style scoped></style>
