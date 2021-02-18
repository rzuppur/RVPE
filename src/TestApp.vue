<template lang="pug">

button(v-for="button in toolbar" :class="{ active: button.active }" @click="button.command") {{ button.name }}

editor(v-model="json" @toolbar="setToolbar")

//-pre {{ json }}

</template>

<script lang="ts">
import { defineComponent } from "vue";

import { emptyDocument } from "./lib/editor";
import Editor from "./lib/Editor.vue";

export default defineComponent({
  name: "TestApp",
  components: {
    Editor,
  },
  data() {
    return {
      json: emptyDocument,
      toolbar: [],
    };
  },
  computed: {
    text: {
      get() {
        return JSON.stringify(this.json);
      },
      set(val) {
        this.json = JSON.parse(val);
      }
    },
  },
  methods: {
    setToolbar(toolbar: any) {
      this.toolbar = toolbar;
    }
  },
});
</script>

<style lang="stylus">

button.active
  background #ddd
  font-weight 700

</style>
