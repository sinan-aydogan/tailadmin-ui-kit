<template>
  <!--Container-->
  <div
    class="relative flex flex-grow bg-white dark:bg-slate-700/10 w-full border dark:border-slate-700"
    :class="[Style[design].container, GlobalStyle.radius[radius]]"
  >
    <!--Image-->

    <img
      v-if="design.includes('banner')"
      :src="imgSrc"
      :alt="imgAltText"
      :class="Style[design].img"
    />

    <div
      class="flex min-w-[10rem] w-full"
      :class="[
        {
          'flex-row': design === 'horizontal',
          'flex-col': design === 'vertical',
        },
      ]"
    >
      <!--Header-->
      <div
        class="flex w-full"
        :class="[
          Style[design].header,
          {
            'mb-2': showContent,
            'items-center text-center': titlePosition === 'center',
            'justify-between': titlePosition !== 'center',
            'flex-col w-1/2': design === 'horizontal',
          },
        ]"
      >
        <!--Titles-->
        <div class="flex flex-col flex-grow">
          <!--Title-->
          <div v-if="title || $slots.hasOwnProperty('title')">
            <h3
              class="font-bold mb-2 text-slate-700 dark:text-slate-200"
              :class="[GlobalStyle.textSize[titleSize]]"
            >
              {{ title }}
            </h3>
          </div>
          <!--Subtitle-->
          <div v-if="subtitle || $slots.hasOwnProperty('sub-title')">
            <p
              class="-mt-1 text-slate-500 dark:text-slate-400 -mt-2"
              :class="[GlobalStyle.textSize[subtitleSize]]"
            >
              {{ subtitle }}
            </p>
          </div>
        </div>
        <!--Top Actions Area-->
        <div
          class="flex items-center space-x-2 text-slate-700 dark:text-slate-200"
        >
          <slot v-if="titlePosition !== 'center'" name="top-actions" />

          <!--Show Hide Trigger-->
          <div
            v-if="collapsible"
            class="bg-slate-200 dark:bg-slate-700 rounded-full p-1 cursor-pointer"
            @click="showContent = !showContent"
            :class="[{ 'absolute right-6': titlePosition === 'center' }]"
          >
            <ChevronDownIcon
              class="w-4 h-4 transition-all"
              :class="[
                {
                  'rotate-90': !showContent,
                },
              ]"
            />
          </div>
        </div>
      </div>

      <!--Content Wrapper-->
      <transition name="content">
        <div v-show="showContent" class="flex flex-col w-full">
          <!--Content-->
          <div
            :class="[Style[design].content]"
            class="h-full w-full text-slate-700 dark:text-slate-200 transition-all duration-500 overflow-hidden"
          >
            <slot></slot>
          </div>

          <!--Footer-->
          <div
            v-if="$slots.hasOwnProperty('footer')"
            class="flex space-x-2 mt-4 transition-all duration-500"
            :class="[
              {
                'justify-end': footerPosition === 'right',
                'justify-start': footerPosition === 'left',
                'justify-center': footerPosition === 'center',
              },
            ]"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
/*Functions*/
import { ref } from "vue";
import { useFullscreen } from "@vueuse/core";

/*Sources*/
import GlobalStyle from "@/lib-components/GlobalStyles.json";
import Style from "./Style.json";
import ChevronDownIcon from "@/lib-components/Icons/ChevronDownIcon";

export default {
  name: "TContentCard",
  components: { ChevronDownIcon },
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    titlePosition: {
      type: String,
      default: "left",
    },
    titleSize: {
      type: String,
      default: "xl",
    },
    subtitleSize: {
      type: String,
      default: "sm",
    },
    design: {
      type: String,
      default: "vertical",
    },
    radius: {
      type: String,
      default: "md",
    },
    imgSrc: {
      type: String,
      default: "",
    },
    imgAltText: {
      type: String,
      default: "",
    },
    collapsible: {
      type: Boolean,
      default: false,
    },
    footerPosition: {
      type: String,
      default: "right",
    },
  },

  setup() {
    /*Show Content*/
    const showContent = ref(true);

    /*Fullscreen*/
    const { isFullscreen, toggle } = useFullscreen();

    return {
      GlobalStyle,
      Style,
      showContent,
      isFullscreen,
      toggle,
    };
  },
};
</script>

<style scoped>
.content-enter-active,
.content-leave-active {
  transition: all 0.3s linear;
}

.content-enter-from,
.content-leave-to {
  opacity: 0;
  max-height: 0;
}

.content-enter-to,
.content-leave-from {
  opacity: 1;
  max-height: 100vh;
}
</style>
