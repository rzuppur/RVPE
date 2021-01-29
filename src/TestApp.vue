<template lang="pug">

editor(v-model="json")

textarea(v-model="text")

</template>

<script lang="ts">
import { defineComponent } from "vue";

import { emptyDocument } from "./lib/schema";
import Editor from "./lib/Editor.vue";

export default defineComponent({
  name: "TestApp",
  data() {
    return {
      json: emptyDocument,
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
  components: {
    Editor,
  },
});
</script>

<style lang="stylus">

</style>
