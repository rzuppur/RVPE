<template lang="pug">

editor

</template>

<script lang="ts">
import { defineComponent } from "vue";
import Editor from "./lib/Editor.vue";

export default defineComponent({
  name: "TestApp",
  components: {
    Editor,
  }
});
</script>

<style lang="stylus">

</style>
