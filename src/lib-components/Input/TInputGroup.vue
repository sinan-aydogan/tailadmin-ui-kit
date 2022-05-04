<template>
  <div
    class="flex flex-col mt-1"
    :class="[
      GlobalStyles.grid.gridSm[phoneWidth],
      GlobalStyles.grid.gridMd[tabletWidth],
      GlobalStyles.grid.gridLg[laptopWidth],
      GlobalStyles.grid.gridXl[desktopWidth],
    ]"
  >
    <!--Label-->
    <label
      :for="labelFor"
      class="flex flex-row gap-1 ml-1 mb-2 items-center font-medium text-sm whitespace-normal dark:text-gray-200"
    >
      <!--Label-->
      <span v-if="label" v-text="label"></span>
      <!--Label Prop-->
      <span v-else class="inline-flex items-center">
        <!--Label Slot-->
        <slot name="label" />
      </span>

      <!--Sub Label-->
      <span
        v-if="subLabel"
        :class="[
          'text-xs italic mt-1',
          Style.inputGroup.subLabelColors[subLabelColor],
        ]"
        v-text="subLabel"
      ></span>
    </label>

    <!--Input Content-->
    <slot></slot>

    <!--Message Area-->
    <div v-if="messages.length > 0 || message" class="mt-1 ml-1">
      <!--Message-->
      <p
        v-if="message"
        class="text-xs whitespace-nowrap"
        :class="Style.inputGroup.messageColors[messageType]"
        v-text="message"
      ></p>

      <!--Messages-->
      <template
        v-else-if="messages.length > 0 && !message"
        v-for="msg in messages"
        :key="msg"
      >
        <p
          class="text-xs whitespace-nowrap"
          :class="
            Style.inputGroup.messageColors[
              messageTypeKey
                ? msg[messageTypeKey]
                  ? msg[messageTypeKey]
                  : 'default'
                : messageType
            ]
          "
        >
          <span v-if="messageLabelKey" v-text="msg[messageLabelKey]"></span>
          <span v-else v-text="msg"></span>
        </p>
      </template>

      <!--Message Slot-->
      <slot v-else name="message"></slot>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, provide, toRefs } from "vue";
import Style from "./Style.json";
import GlobalStyles from "../GlobalStyles.json";

export default defineComponent({
  name: "TInputGroup",
  props: {
    label: {
      type: String,
      default: null,
    },
    subLabel: {
      type: String,
      default: null,
    },
    subLabelColor: {
      type: String,
      default: "yellow",
    },
    labelFor: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: "",
    },
    messages: {
      type: [Array, Object],
      default() {
        return [];
      },
    },
    messagesInputAlertType: {
      type: String,
      default: "",
    },
    messageType: {
      type: String,
      default: "default",
    },
    messageLabelKey: {
      type: String,
      default: "",
    },
    messageTypeKey: {
      type: String,
      default: "type",
    },
    phoneWidth: {
      type: Number,
      default: 12,
    },
    tabletWidth: {
      type: Number,
      default: null,
    },
    laptopWidth: {
      type: Number,
      default: 6,
    },
    desktopWidth: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    /*Error Status Provide to Input Component*/
    const { messageType, messagesInputAlertType } = toRefs(props);

    /*Error Management*/
    const gnMessageType = computed(() => {
      /*If there is a message type*/
      if (messageType.value && messageType.value !== "default") {
        return messageType.value;
      } else {
        return messagesInputAlertType.value;
      }
    });

    provide("messageType", gnMessageType);

    return {
      Style,
      GlobalStyles,
    };
  },
});
</script>
