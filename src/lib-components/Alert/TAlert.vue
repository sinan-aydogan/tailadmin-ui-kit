<template>
  <transition name="alert">
    <!--Alert Container-->
    <div
      v-if="showAlertBox"
      class="flex flex-shrink-0 items-center justify-start relative flex-grow-0 overflow-hidden"
      :class="[
        Style[design].base,
        !type
          ? Style[design][color].container
          : Style[design][
              type === 'success'
                ? 'emerald'
                : type === 'warning'
                ? 'amber'
                : type === 'error'
                ? 'rose'
                : type === 'info'
                ? 'sky'
                : 'slate'
            ].container,
        GlobalStyles.radius[radius],
        block ? 'w-full' : 'w-72',
      ]"
    >
      <!--Alert Line-->
      <div
        v-if="design.includes('line')"
        :class="[
          Style[design][color].cdLine,
          {
            'absolute h-[80%] w-1.5 left-2 rounded-full flex-shrink-0':
              design === 'inline',
          },
          {
            'absolute w-1.5 h-full left-0 flex-shrink-0 mr-4':
              design === 'outline',
          },
        ]"
      />

      <!--Alert Icon-->
      <div
        v-if="hasSlot('icon') && design !== 'elegant'"
        class="flex flex-shrink-0 justify-center items-center"
        :class="[
          {
            'mr-2': design.includes('line'),
            'mr-4': !design.includes('line'),
            'absolute h-full px-5 border-r-4 left-0': design === 'block',
          },
          Style[design][color].icon,
        ]"
      >
        <slot name="icon"></slot>
      </div>

      <!--Alert Content-->
      <div
        class="relative flex flex-grow py-2 text-sm"
        :class="[
          [
            design === 'elegant'
              ? 'flex-row justify-start items-center'
              : 'flex-col justify-center items-start',
          ],
          { 'py-3 ml-[5.5rem] pr-4': design === 'block' },
        ]"
      >
        <!--Title-->
        <p
          v-if="$slots.hasOwnProperty('title') || title"
          class="relative font-bold text-lg"
          :class="[
            {
              'rounded-full border mr-4 px-2 py-1 leading-5 text-xs font-normal whitespace-nowrap':
                design === 'elegant',
            },
            [design === 'elegant' ? Style['elegant'][color].container : ''],
          ]"
        >
          <span v-if="title" v-text="title"></span>
          <slot v-else name="title"></slot>
        </p>

        <!--Content-->
        <div v-if="$slots.hasOwnProperty('default') || message">
          <span v-if="message" v-text="message"></span>
          <slot v-else></slot>
        </div>
      </div>

      <!--Close Icon-->
      <div
        v-if="closeable"
        @click="close"
        class="absolute flex z-10 h-full right-6 justify-center items-center"
      >
        <div
          class="bg-slate-200 hover:bg-slate-200 dark:bg-slate-700 rounded-full dark:hover:bg-rose-600"
        >
          <CircleXMark
            @click="$emit('update:modelValue', '')"
            class="w-5 h-5 text-slate-600 hover:text-rose-600 dark:text-slate-200 hover:dark:text-slate-200 cursor-pointer -m-1"
          />
        </div>
      </div>

      <!--Countdown Line-->
      <div
        v-if="timer"
        class="absolute justify-center items-center bottom-0 left-0 h-[.3rem] px-2 w-full"
      >
        <div
          class="h-[.3rem] mx-auto"
          :class="[GlobalStyles.radius[radius], Style[design][color].cdLine]"
          :style="{ width: countDownCounter + '%' }"
        ></div>
      </div>
    </div>
  </transition>
</template>
<script>
/* Main Functions */
import {
  defineComponent,
  inject,
  onBeforeMount,
  ref,
  toRefs,
  watch,
} from "vue";

/*Components*/
import CircleXMark from "@/lib-components/Icons/CircleXMark";

/*Sources*/
import GlobalStyles from "@/lib-components/GlobalStyles.json";
import Style from "./Style.json";

export default defineComponent({
  name: "TAlert",
  components: {
    CircleXMark,
  },
  props: {
    id: {
      type: [Number, String, Array, Object, Date, Boolean],
      default: function () {
        return "alert-" + Number(new Date());
      },
    },
    closeable: {
      type: Boolean,
      default: false,
    },
    timerStatus: {
      type: Boolean,
      default: false,
    },
    timer: {
      type: Number,
      default: null,
    },
    title: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: null,
    },
    radius: {
      type: String,
      default: "md",
    },
    design: {
      type: String,
      default: "filled",
    },
    color: {
      type: String,
      default: "rose",
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["destroy"],
  setup(props, { slots, emit }) {
    /*Definitions*/
    const { design, color, radius, closeable, timerStatus, timer, id } =
      toRefs(props);
    const showAlertBox = ref(true);

    /*Close Function*/
    const close = () => {
      showAlertBox.value = false;
      emit("destroy", id.value);
    };
    /*Timer*/
    const timerCounter = ref(0);
    const countDownCounter = ref(0);
    const timerFN = () => {
      /*Timer Function*/
      setTimeout(() => {
        showAlertBox.value = false;
        emit("destroy", id.value);
      }, timer.value);
      /*Count Down Function*/
      let countDownFn = setInterval(() => {
        if (timer.value >= timerCounter.value) {
          countDownCounter.value =
            100 - (timerCounter.value / timer.value) * 100;
          timerCounter.value += 4;
        } else {
          clearInterval(countDownFn);
        }
      }, 1);
    };

    onBeforeMount(() => {
      if (timerStatus.value) {
        timerFN();
      }
    });

    watch(timerStatus, (newValue, oldValue) => {
      if (timerStatus.value && !oldValue && newValue > 0) {
        timerFN();
      }
    });

    /*Slot Check*/
    const hasSlot = (name) => !!slots[name];
    return {
      GlobalStyles,
      Style,
      showAlertBox,
      countDownCounter,
      timerCounter,
      hasSlot,
      close,
    };
  },
});
</script>

<style scoped>
/* eslint-disable no-alert */
.alert-enter-active,
.alert-leave-active {
  transition: all ease-in-out 1000ms;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
}

.alert-enter-to,
.alert-leave-from {
  opacity: 1;
}

/* eslint-disable no-alert */
</style>
