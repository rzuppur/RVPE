<template lang="pug">

editor()

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Editor from './components/Editor.vue';

export default defineComponent({
  name: 'App',
  components: {
    Editor,
  }
});
</script>

<style lang="stylus">



</style>
