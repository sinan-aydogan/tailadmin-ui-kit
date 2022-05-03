<script>
import { defineComponent, ref } from "vue";
import "@/index.css";

import TButton from "@/lib-components/Button/TButton";
import TModal from "@/lib-components/Modal/TModal";
// import {TModal, TButton} from "tailadmin-ui-kit";

export default defineComponent({
  name: "ServeDev",
  components: { TModal, TButton },

  setup() {
    const showModal = ref(false);
    const saveForm = () => {
      alert("save form");
    };

    return {
      showModal,
      saveForm,
    };
  },
});
</script>

<style>
#app {
  background-color: rgb(229 231 235);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (prefers-color-scheme: dark) {
  #app {
    background-color: rgb(31 41 55);
  }
}
</style>

<template>
  <div id="app">
    <div style="margin-left: auto; margin-right: auto; display: flex">
      <t-button @click="showModal = true">Add New User</t-button>
      <t-modal
        v-model="showModal"
        @close="showModal = false"
        closeable
        close-button
      >
        <template #header> <b style="color: red">Add New User</b> </template>

        <template #subHeader>
          Please fill in the form below to add a new user.
        </template>

        <template #default>
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div class="grid grid-cols-3 gap-6">
                    <div class="col-span-3 sm:col-span-2">
                      <label
                        for="company-website"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Website
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <span
                          class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                        >
                          http://
                        </span>
                        <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      for="about"
                      class="block text-sm font-medium text-gray-700"
                    >
                      About
                    </label>
                    <div class="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows="3"
                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="you@example.com"
                      />
                    </div>
                    <p class="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Photo
                    </label>
                    <div class="mt-1 flex items-center">
                      <span
                        class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                      >
                        <svg
                          class="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </span>
                      <button
                        type="button"
                        class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Cover photo
                    </label>
                    <div
                      class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                    >
                      <div class="space-y-1 text-center">
                        <svg
                          class="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                          <label
                            for="file-upload"
                            class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              class="sr-only"
                            />
                          </label>
                          <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </template>

        <template #footer>
          <div class="flex justify-between w-full">
            <!--Cancel-->
            <t-button design="light" color="slate" @click="showModal = false"
              >Cancel</t-button
            >

            <!--Actions-->
            <div class="flex space-x-2">
              <t-button color="amber">Reset</t-button>
              <t-button color="green" @click="saveForm">Submit</t-button>
            </div>
          </div>
        </template>
      </t-modal>
    </div>
  </div>
</template>
