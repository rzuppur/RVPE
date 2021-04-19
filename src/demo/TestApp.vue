<template lang="pug">

button(v-for="button in toolbar" :class="{ active: button.active }" @click="button.command") {{ button.name }}

editor(v-model="editorJson" @toolbar="setToolbar")

pre {{ jsonAsString }}

</template>

<script lang="ts">

import { defineComponent } from "vue";
import Editor from "../lib/Editor.vue";
import { emptyDocument } from "../lib/editor";

export default defineComponent({
  name: "TestApp",
  components: {
    Editor,
  },
  data() {
    return {
      editorJson: emptyDocument,
      toolbar: [],
    };
  },
  computed: {
    jsonAsString() {
      return JSON.stringify(this.editorJson, null, 2);
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
