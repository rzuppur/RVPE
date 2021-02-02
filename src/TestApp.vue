<template lang="pug">

button(v-for="command in commands" :class="{ active: command.active }" @click="command.action") {{ command.name }}

editor(v-model="json" @commands="setCommands")

pre commands: {{ commands }}

//-textarea(v-model="text")

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
      commands: [],
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
    setCommands(commands) {
      this.commands = commands;
    }
  },
});
</script>

<style lang="stylus">

button.active
  background #ddd
  font-weight 700

</style>
