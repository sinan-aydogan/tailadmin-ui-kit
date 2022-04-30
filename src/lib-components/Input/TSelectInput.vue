<template>
  <div class="relative space-y-1 gap-1 min-w-[15rem] text-slate-700 dark:text-slate-200" ref="target">
    <!--Place holder-->
    <div @click="toggle"
         tabindex="0"
         class="flex bg-white dark:bg-slate-800/50 overflow-hidden justify-between items-center space-x-2 min-h-[2.5rem] border p-4 py-2 cursor-pointer select-none outline-none focus:ring-2"
         :class="[
      GlobalStyle.radius[radius],
      messageType
        ? Style.inputGroup.messageColors[messageType] + ' focus:border-none'
        : 'border-slate-300 dark:border-slate-600 focus:ring-indigo-500 focus:border-indigo-500',
        ]"
    >
      <div class="block overflow-hidden whitespace-nowrap text-slate-700 dark:text-slate-200">
        <!--Placeholder-->
        <span v-if="!modelValue || modelValue.length === 0" v-text="placeHolder" class="text-slate-500"></span>
        <!--Selected Item-->
        <div v-if="modelValue && !multi">
          <slot v-if="$slots.hasOwnProperty('label')" name="label" :props="selected"></slot>
          <span v-else>{{ selected[optionLabel] }}</span>
        </div>

        <!-- Count-->
        <div v-if="multi && !multiShowLabels &&selected.length>0" >
          {{selected.length}} {{selected.length>1? multiSelectedTextPlural : multiSelectedTextSingular}} {{multiSelectedTextSelected}}
        </div>

        <!--Labels of the Selected Items-->
        <div v-if="multi && multiShowLabels &&selected.length>0" class="flex flex-wrap">
          <template v-for="option in selected">
            <span @click.stop="select(option[optionKey])"
                  class="inline-flex items-center whitespace-nowrap group text-sm after:content-[',\00a0'] last:after:content-[''] hover:after:content-['']">

              <slot v-if="$slots.hasOwnProperty('label')" name="label" :props="option"></slot>
          <span v-else>{{ option[optionLabel] }}</span>

              <span class="hidden group-hover:block ml-1 mr-2">
                <circle-minus-icon class="w-4 h-4 hover:text-rose-500" />
              </span>
            </span>
          </template>
        </div>
      </div>

      <!--Trigger Icons-->
      <div class="flex items-center space-x-4 -mr-4">
        <!--Clear Button-->
        <div v-if="(!multi && selected && clearButton)|| (multi && selected.length>0 && clearButton)"
             @click.stop="clear"
             class="flex h-full justify-center items-center">
          <div class="bg-slate-200 hover:bg-slate-200 dark:bg-slate-700 rounded-full dark:hover:bg-rose-600">
            <CircleXMark
              @click="$emit('update:modelValue', '')"
              class="w-5 h-5 text-slate-600 hover:text-rose-600 dark:text-slate-200 hover:dark:text-slate-200 cursor-pointer -m-1"
            />
          </div>
        </div>

        <!--Trigger-->
        <chevron-down-icon class="w-5 h-5 transition-all duration-300 text-slate-700 dark:text-slate-200" :class="[
          {'rotate-90': showOptions},
          {'rotate-0': !showOptions},
        ]" />
      </div>
    </div>

    <!--Selected Content-->

    <!--Options-->
    <div v-if="showOptions"
         class="absolute z-50 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border dark:border-slate-500 shadow-lg w-full"
         :class="GlobalStyle.radius[radius]">
      <!--Search-->
      <div v-if="search" class="p-2">
        <t-input-group label-for="search" message="" message-type="">
          <t-text-input v-model="searchText" clear-button :placeholder="searchPlaceHolder"/>
        </t-input-group>
      </div>

      <!--Options-->
      <template v-for="(option,index) in searchedList" :key="option">

        <div v-if="showingMaxOptions> index" @click="select(option[optionKey])"
             class="flex group justify-between items-center border-b dark:border-slate-500 dark:hover:bg-slate-600 last:border-b-0 last:rounded-b first:rounded-t py-1 px-2 hover:bg-slate-100 cursor-pointer">
          <!--Label-->
          <div>
            <slot v-if="$slots.hasOwnProperty('label')" name="label" :props="option"></slot>
            <span v-else v-text="option[optionLabel]"></span>
          </div>

          <!--Selected Indicator-->

          <circle-check-icon v-if="option[optionKey] === modelValue ||(multi &&  modelValue.includes(option[optionKey]))"
                             class="group-hover:hidden w-5 h-5 text-emerald-500" />
          <trash-icon v-if="option[optionKey] === modelValue || (multi && modelValue.includes(option[optionKey]))"
                      class="hidden group-hover:block w-4 h-4 text-rose-500" />
        </div>
      </template>

      <!--No results found-->
      <p v-text="noResultsFoundText" v-if="searchedList.length === 0" class="px-2 mb-1">
      </p>

      <!--Too Many Results Message-->
      <p v-text="tooManyResultsText" v-if="options.length > showingMaxOptions"
         class="flex p-2 text-xs w-full justify-center"></p>
    </div>
  </div>
</template>

<script>
/*Functions*/
import { computed, ref, toRefs, inject } from "vue";
import { onClickOutside } from "@vueuse/core";

/*Components*/
import ChevronDownIcon from "@/lib-components/Icons/ChevronDownIcon";
import CircleCheckIcon from "@/lib-components/Icons/CircleCheckIcon";
import CircleXMark from "@/lib-components/Icons/CircleXMark";
import TTextInput from "@/lib-components/Input/TTextInput";
import TInputGroup from "@/lib-components/Input/TInputGroup";

/*Sources*/
import GlobalStyle from "@/lib-components/GlobalStyles.json";
import Style from "@/lib-components/Input/Style.json";
import TrashIcon from "@/lib-components/Icons/TrashIcon";
import CircleMinusIcon from "@/lib-components/Icons/CircleMinusIcon";

export default {
  name: "TSelectInput",
  components: { CircleMinusIcon, TrashIcon, CircleXMark, CircleCheckIcon, ChevronDownIcon, TTextInput, TInputGroup },
  props: {
    modelValue: {
      type: [String, Number, Date],
      default: null
    },
    options: {
      type: [String, Date, Number, Object, Array, Boolean],
      default: () => []
    },
    optionKey: {
      type: String,
      default: "id"
    },
    optionLabel: {
      type: String,
      default: "label"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeHolder: {
      type: String,
      default: "Select"
    },
    searchPlaceHolder: {
      type: String,
      default: "Search"
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    clearButton: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    showingMaxOptions: {
      type: Number,
      default: 10
    },
    radius: {
      type: String,
      default: "md"
    },
    multi: {
      type: Boolean,
      default: false
    },
    multiShowLabels: {
      type: Boolean,
      default: false
    },
    multiSelectedTextSingular: {
      type: String,
      default: "item"
    },
    multiSelectedTextPlural: {
      type: String,
      default: "items"
    },
    multiSelectedTextSelected:{
      type: String,
      default: "selected"
    },
    noResultsFoundText: {
      type: String,
      default: "No results found"
    },
    tooManyResultsText: {
      type: String,
      default: "Too many results found, refine search"
    }
  },

  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const { modelValue, disabled, readOnly, options, optionKey, optionLabel, multi } = toRefs(props);

    /*Outside click*/
    const target = ref();
    onClickOutside(target, (event) => showOptions.value = false);

    /*Error Management*/
    const messageType = inject("messageType");

    /*Show Options*/
    const showOptions = ref();
    const toggle = () => {
      if (disabled.value || readOnly.value) {
        showOptions.value = false;
      } else {
        showOptions.value = !showOptions.value;
      }
    };

    /*Select*/
    const select = (value) => {
      if (multi.value) {
        /*Multi*/
        if (modelValue.value.includes(value)) {
          /*Remove*/
          modelValue.value.splice(modelValue.value.indexOf(value), 1);
        } else {
          /*Add*/
          modelValue.value.push(value);
        }

      } else {
        /*Simple*/
        if (value === modelValue.value) {
          emit("update:modelValue", null);
        } else {
          emit("update:modelValue", value);
        }
        showOptions.value = false;
        searchText.value = "";
      }
    };


    /*Add Selected List*/
    const addSelectedList = (value) => {
      if (modelValue.value.includes(value)) {
        modelValue.value.splice(modelValue.value.indexOf(value), 1);
      }
    };

    /*Selected*/
    const selected = computed(() => {

      if (multi.value) {
        /*Multi*/
        if (modelValue.value === [] || modelValue.value === null) {
          /*Multi Null*/
          return [];
        }
        /*Selected Items*/
        let multiSelected = [];
        modelValue.value.forEach(i => {
          multiSelected.push(options.value.find(option => option[optionKey.value] === i));
        });

        return multiSelected;
      } else {
        /*Simple*/
        if (modelValue.value === null || modelValue.value === "" || modelValue.value === undefined) {
          /*Simple Null*/
          return null;
        }
        /*Simple Item*/
        return options.value.find(option => option[optionKey.value] === modelValue.value);
      }
    });

    /*Search*/
    const searchText = ref("");
    const searchedList = computed(() => {
      if (searchText.value === "") {
        return options.value;
      }
      return options.value.filter(option => option[optionLabel.value].toLowerCase().replace(/[^a-zA-Z ]/g, "").includes(searchText.value.toLowerCase().replace(/[^a-zA-Z ]/g, "")));
    });

    /*Clear*/
    const clear = () => {
      showOptions.value = false;
      selected.value = multi.value ? [] : null;
      emit("update:modelValue", multi.value ? [] : null);
    };

    return {
      GlobalStyle,
      Style,
      select,
      searchText,
      searchedList,
      clear,
      toggle,
      selected,
      messageType,
      showOptions,
      target,
      addSelectedList
    };
  }
};
</script>

<style scoped>

</style>
